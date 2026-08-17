import crypto from "node:crypto";
import { benefitDinner } from "@/content/event";

const MP_API = "https://api.mercadopago.com";

function accessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    throw new Error("MP_ACCESS_TOKEN no está configurado.");
  }
  return token;
}

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export type PreferenceInput = {
  name: string;
  message?: string;
  reference: string;
};

export type MpPayment = {
  id: number;
  status: string;
  transaction_amount: number;
  currency_id: string;
  external_reference?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Creates a Mercado Pago Checkout Pro preference for a single dinner ticket.
 * The donor name is stored in metadata so the webhook can trust it later.
 */
export async function createPreference({ name, message, reference }: PreferenceInput) {
  const base = siteUrl();
  const body = {
    items: [
      {
        id: "cena-beneficio-2026",
        title: benefitDinner.title,
        description: `${benefitDinner.dateLabel} · ${benefitDinner.venue} · ${benefitDinner.city}`,
        quantity: 1,
        unit_price: benefitDinner.price,
        currency_id: benefitDinner.currency,
      },
    ],
    metadata: { donor_name: name, donor_message: message ?? "" },
    external_reference: reference,
    statement_descriptor: "DESAFIA CENA",
    back_urls: {
      success: `${base}/participar?status=approved`,
      pending: `${base}/participar?status=pending`,
      failure: `${base}/participar?status=failure`,
    },
    auto_return: "approved",
    notification_url: `${base}/api/mercadopago/webhook`,
  };

  const response = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Mercado Pago rechazó la preferencia (${response.status}).`);
  }

  const data = (await response.json()) as { init_point?: string; sandbox_init_point?: string };
  const initPoint = data.init_point ?? data.sandbox_init_point;
  if (!initPoint) {
    throw new Error("Mercado Pago no devolvió un enlace de pago.");
  }
  return { initPoint };
}

export async function getPayment(id: string): Promise<MpPayment> {
  const response = await fetch(`${MP_API}/v1/payments/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${accessToken()}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`No se pudo obtener el pago ${id} (${response.status}).`);
  }
  return (await response.json()) as MpPayment;
}

/**
 * Validates the Mercado Pago `x-signature` header using the webhook secret.
 * Returns true when the HMAC matches the documented manifest template.
 */
export function verifyWebhookSignature(params: {
  signatureHeader: string | null;
  requestId: string | null;
  dataId: string | null;
}): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return false;
  const { signatureHeader, requestId, dataId } = params;
  if (!signatureHeader || !dataId) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((segment) => {
      const [key, value] = segment.split("=");
      return [key?.trim(), value?.trim()];
    }),
  );
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId ?? ""};ts:${ts};`;
  const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(v1);
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export function paymentMatchesDinner(payment: MpPayment): boolean {
  return (
    payment.status === "approved" &&
    payment.currency_id === benefitDinner.currency &&
    Math.round(payment.transaction_amount) === benefitDinner.price
  );
}
