import { NextRequest } from "next/server";
import { benefactorStoreIsConfigured } from "@/lib/benefactors";
import {
  dinnerSalesAreOpen,
  isValidEmail,
  sanitizePublicName,
} from "@/lib/dinner";
import {
  createDinnerPreference,
  mercadoPagoIsConfigured,
  mercadoPagoWebhookIsConfigured,
} from "@/lib/mercado-pago";

export const runtime = "nodejs";

function getSiteOrigin(request: NextRequest) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const candidate = configuredUrl || request.nextUrl.origin;
  const url = new URL(candidate);

  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("La URL pública debe usar HTTPS.");
  }

  return url.origin;
}

export async function POST(request: NextRequest) {
  if (
    !mercadoPagoIsConfigured() ||
    !mercadoPagoWebhookIsConfigured() ||
    !benefactorStoreIsConfigured()
  ) {
    return Response.json(
      { error: "El pago todavía no está habilitado. Intentá nuevamente más tarde." },
      { status: 503 },
    );
  }

  if (!dinnerSalesAreOpen()) {
    return Response.json(
      { error: "La venta de lugares para esta cena ya finalizó." },
      { status: 410 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "La solicitud no es válida." }, { status: 400 });
  }

  const data = body as {
    publicName?: unknown;
    email?: unknown;
    publicationConsent?: unknown;
  };
  const publicName = sanitizePublicName(data.publicName);
  const email = typeof data.email === "string" ? data.email.trim() : "";

  if (!publicName) {
    return Response.json(
      { error: "Ingresá un nombre público de entre 2 y 80 caracteres." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { error: "Ingresá una dirección de correo válida." },
      { status: 400 },
    );
  }

  if (data.publicationConsent !== true) {
    return Response.json(
      { error: "Necesitamos tu autorización para publicar el nombre elegido." },
      { status: 400 },
    );
  }

  try {
    const preference = await createDinnerPreference({
      publicName,
      email,
      siteOrigin: getSiteOrigin(request),
    });

    return Response.json(
      { checkoutUrl: preference.init_point },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error(
      "No se pudo crear la preferencia de la cena:",
      error instanceof Error ? error.message : "error desconocido",
    );
    return Response.json(
      { error: "No pudimos iniciar el pago. Intentá nuevamente en unos minutos." },
      { status: 502 },
    );
  }
}
