import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "La solicitud no es válida." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ message: "Recibimos tu mensaje. Gracias." });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (name.length < 2 || !emailPattern.test(email) || message.length < 10) {
    return NextResponse.json(
      { message: "Revisá tu nombre, correo y mensaje antes de enviar." },
      { status: 400 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      {
        message:
          "El formulario todavía no está habilitado porque la asociación está en formación.",
      },
      { status: 503 },
    );
  }

  const payload = {
    name,
    email,
    province: String(body.province || ""),
    subject: String(body.subject || "Consulta general"),
    message,
    source: "desafia-federal-portal",
    receivedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Webhook rejected request");
  } catch {
    return NextResponse.json(
      { message: "No pudimos enviar el mensaje en este momento." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Recibimos tu mensaje. Gracias por sumarte." });
}
