import { NextResponse } from "next/server";
import { addBenefactor, setLastWebhook } from "@/lib/benefactors";
import { getPayment, inspectWebhookSignature, paymentMatchesDinner } from "@/lib/mercadopago";

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
  // MP builds the signature manifest from the `data.id` query param.
  const signatureId = queryDataId ?? body.data?.id ?? queryId;

  const sig = inspectWebhookSignature({
    signatureHeader: request.headers.get("x-signature"),
    requestId: request.headers.get("x-request-id"),
    dataId: signatureId,
  });

  const base = {
    rawQuery: url.search,
    type,
    topic,
    paymentId,
    signatureId,
    requestId: request.headers.get("x-request-id"),
    manifest: sig.manifest,
    computedPrefix: sig.computed.slice(0, 12),
    receivedPrefix: sig.received.slice(0, 12),
    signatureValid: sig.valid,
  };

  // Ignore merchant_order notifications: we only care about payments.
  if (type === "merchant_order" || topic === "merchant_order") {
    await setLastWebhook({ ...base, step: "ignored-merchant-order" });
    return NextResponse.json({ ignored: true });
  }

  if (!paymentId) {
    await setLastWebhook({ ...base, step: "no-payment-id" });
    return NextResponse.json({ message: "Falta el identificador del pago." }, { status: 400 });
  }

  if (!sig.valid) {
    await setLastWebhook({ ...base, step: "invalid-signature" });
    return NextResponse.json({ message: "Firma inválida." }, { status: 401 });
  }

  try {
    const payment = await getPayment(paymentId);
    const matched = paymentMatchesDinner(payment);
    if (!matched) {
      await setLastWebhook({
        ...base,
        step: "not-matched",
        paymentStatus: payment.status,
        amount: payment.transaction_amount,
        currency: payment.currency_id,
      });
      return NextResponse.json({ ignored: true });
    }
    const metadata = payment.metadata ?? {};
    const name = String(metadata.donor_name ?? "").trim();
    const message = String(metadata.donor_message ?? "").trim();
    if (name) {
      await addBenefactor({ paymentId: String(payment.id), name, message: message || undefined });
    }
    await setLastWebhook({ ...base, step: "recorded", paymentStatus: payment.status, recorded: Boolean(name) });
    return NextResponse.json({ recorded: Boolean(name) });
  } catch {
    await setLastWebhook({ ...base, step: "error-fetching-payment" });
    return NextResponse.json({ message: "No pudimos procesar la notificación." }, { status: 502 });
  }
}
