import { registerApprovedDinnerPayment } from "@/lib/dinner-payment";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let paymentId = "";

  try {
    const body = (await request.json()) as { paymentId?: unknown };
    paymentId = typeof body.paymentId === "string" ? body.paymentId : "";
  } catch {
    return Response.json({ confirmed: false }, { status: 400 });
  }

  if (!/^\d+$/.test(paymentId)) {
    return Response.json({ confirmed: false }, { status: 400 });
  }

  try {
    const result = await registerApprovedDinnerPayment(paymentId);
    return Response.json({ confirmed: result.approved });
  } catch (error) {
    console.error(
      "No se pudo reconciliar el pago de la cena:",
      error instanceof Error ? error.message : "error desconocido",
    );
    return Response.json({ confirmed: false }, { status: 502 });
  }
}
