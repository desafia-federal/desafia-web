import "server-only";

import { saveInitialBenefactor } from "@/lib/benefactors";
import { DINNER_EVENT, sanitizePublicName } from "@/lib/dinner";
import { getMercadoPagoPayment } from "@/lib/mercado-pago";

export async function registerApprovedDinnerPayment(paymentId: string) {
  const payment = await getMercadoPagoPayment(paymentId);

  if (payment.status !== "approved") {
    return { approved: false } as const;
  }

  const validPayment =
    payment.external_reference === DINNER_EVENT.externalReference &&
    payment.currency_id === DINNER_EVENT.currency &&
    Number(payment.transaction_amount) === DINNER_EVENT.price;
  const publicName = sanitizePublicName(payment.metadata?.benefactor_name);

  if (!validPayment || !publicName) {
    throw new Error("El pago aprobado no coincide con la cena fundacional.");
  }

  await saveInitialBenefactor({
    paymentId: String(payment.id),
    name: publicName,
    approvedAt: payment.date_approved || new Date().toISOString(),
  });

  return { approved: true } as const;
}
