import { NextResponse } from "next/server";
import { addBenefactor } from "@/lib/benefactors";
import { getPayment, paymentMatchesDinner, verifyWebhookSignature } from "@/lib/mercadopago";

export const runtime = "nodejs";

// Mercado Pago retries on non-2xx. Return 200 for handled-but-ignored events
// and only 4xx/5xx when we genuinely could not process the notification.
export async function POST(request: Request) {
  const url = new URL(request.url);
  const queryDataId = url.searchParams.get("data.id");
  const queryId = url.searchParams.get("id");
  const topic = url.searchParams.get("topic") ?? url.searchParams.get("type") ?? "";

  let body: { type?: string; action?: string; data?: { id?: string } } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    // Some notifications arrive without a JSON body.
  }

  const type = body.type ?? topic ?? "";
  const paymentId = body.data?.id ?? queryDataId ?? queryId;

  // Only payments matter; acknowledge merchant_order and anything else.
  if (type !== "payment") {
    return NextResponse.json({ ignored: true });
  }
  if (!paymentId) {
    return NextResponse.json({ message: "Falta el identificador del pago." }, { status: 400 });
  }

  // The signature is a best-effort extra layer. The real gate is verifying the
  // payment against the Mercado Pago API below (needs our access token), so we
  // do not hard-fail when the signature secret is unavailable or mismatched.
  verifyWebhookSignature({
    signatureHeader: request.headers.get("x-signature"),
    requestId: request.headers.get("x-request-id"),
    dataId: queryDataId ?? body.data?.id ?? queryId,
  });

  try {
    const payment = await getPayment(paymentId);
    if (!paymentMatchesDinner(payment)) {
      return NextResponse.json({ ignored: true });
    }
    const metadata = payment.metadata ?? {};
    const name = String(metadata.donor_name ?? "").trim();
    const message = String(metadata.donor_message ?? "").trim();
    if (name) {
      await addBenefactor({ paymentId: String(payment.id), name, message: message || undefined });
    }
    return NextResponse.json({ recorded: Boolean(name) });
  } catch {
    return NextResponse.json({ message: "No pudimos procesar la notificación." }, { status: 502 });
  }
}
