import { NextRequest } from "next/server";
import { registerApprovedDinnerPayment } from "@/lib/dinner-payment";
import { verifyMercadoPagoWebhookSignature } from "@/lib/mercado-pago";

export const runtime = "nodejs";

type WebhookBody = {
  type?: string;
  data?: {
    id?: string | number;
  };
};

export async function POST(request: NextRequest) {
  if (!verifyMercadoPagoWebhookSignature(request)) {
    return Response.json({ received: false }, { status: 401 });
  }

  let body: WebhookBody;

  try {
    body = (await request.json()) as WebhookBody;
  } catch {
    return Response.json({ received: false }, { status: 400 });
  }

  const notificationType =
    body.type || request.nextUrl.searchParams.get("type") || "";

  if (notificationType !== "payment") {
    return Response.json({ received: true, ignored: true });
  }

  const queryPaymentId = request.nextUrl.searchParams.get("data.id");
  const paymentId = queryPaymentId || String(body.data?.id || "");

  if (!/^\d+$/.test(paymentId)) {
    return Response.json({ received: false }, { status: 400 });
  }

  try {
    const result = await registerApprovedDinnerPayment(paymentId);
    return Response.json({ received: true, recorded: result.approved });
  } catch (error) {
    console.error(
      "No se pudo procesar la notificación de la cena:",
      error instanceof Error ? error.message : "error desconocido",
    );
    return Response.json({ received: false }, { status: 500 });
  }
}
