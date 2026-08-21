import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createPreference } from "@/lib/mercadopago";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.MP_ACCESS_TOKEN) {
    return NextResponse.json(
      { message: "Los pagos todavía no están habilitados. Escribinos a hola@desafiafederal.org." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "La solicitud no es válida." }, { status: 400 });
  }

  const name = String(body.name || "").replace(/\s+/g, " ").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").replace(/\s+/g, " ").trim();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json(
      { message: "Ingresá tu nombre para reservar tu lugar." },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email) || email.length > 120) {
    return NextResponse.json(
      { message: "Ingresá un email válido para enviarte la confirmación." },
      { status: 400 },
    );
  }

  try {
    const forwardedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
    const baseUrl = forwardedHost ? `${forwardedProto}://${forwardedHost}` : undefined;

    const { initPoint } = await createPreference({
      name,
      email,
      message: message.slice(0, 240) || undefined,
      reference: crypto.randomUUID(),
      baseUrl,
    });
    return NextResponse.json({ initPoint });
  } catch {
    return NextResponse.json(
      { message: "No pudimos iniciar el pago en este momento. Probá nuevamente." },
      { status: 502 },
    );
  }
}
