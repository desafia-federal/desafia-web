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
  const message = String(body.message || "").replace(/\s+/g, " ").trim();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json(
      { message: "Ingresá tu nombre para reservar tu lugar." },
      { status: 400 },
    );
  }

  try {
    const { initPoint } = await createPreference({
      name,
      message: message.slice(0, 240) || undefined,
      reference: crypto.randomUUID(),
    });
    return NextResponse.json({ initPoint });
  } catch {
    return NextResponse.json(
      { message: "No pudimos iniciar el pago en este momento. Probá nuevamente." },
      { status: 502 },
    );
  }
}
