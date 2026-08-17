import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { DINNER_EVENT } from "@/lib/dinner";

const MERCADO_PAGO_API = "https://api.mercadopago.com";

export type MercadoPagoPayment = {
  id: number;
  status: string;
  currency_id: string;
  transaction_amount: number;
  external_reference?: string | null;
  date_approved?: string | null;
  metadata?: {
    benefactor_name?: string;
  };
};

function getAccessToken() {
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Mercado Pago no está configurado.");
  }

  return token;
}

async function mercadoPagoFetch<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${MERCADO_PAGO_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Mercado Pago respondió con estado ${response.status}.`);
  }

  return (await response.json()) as T;
}

export function mercadoPagoIsConfigured() {
  return Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN);
}

export function mercadoPagoWebhookIsConfigured() {
  return Boolean(process.env.MERCADO_PAGO_WEBHOOK_SECRET);
}

export async function createDinnerPreference({
  publicName,
  email,
  siteOrigin,
}: {
  publicName: string;
  email: string;
  siteOrigin: string;
}) {
  const preference = await mercadoPagoFetch<{
    id: string;
    init_point: string;
  }>("/checkout/preferences", {
    method: "POST",
    headers: {
      "X-Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      items: [
        {
          id: DINNER_EVENT.externalReference,
          title: DINNER_EVENT.title,
          description: "Menú fijo · 27 de agosto de 2026 · 21:00 hs · Córdoba",
          quantity: 1,
          currency_id: DINNER_EVENT.currency,
          unit_price: DINNER_EVENT.price,
        },
      ],
      payer: { email },
      metadata: {
        benefactor_name: publicName,
        event: DINNER_EVENT.externalReference,
      },
      external_reference: DINNER_EVENT.externalReference,
      statement_descriptor: "DESAFIA FEDERAL",
      back_urls: {
        success: `${siteOrigin}/participar?resultado=aprobado`,
        pending: `${siteOrigin}/participar?resultado=pendiente`,
        failure: `${siteOrigin}/participar?resultado=no-aprobado`,
      },
      notification_url: `${siteOrigin}/api/mercado-pago/webhook`,
      auto_return: "approved",
      expires: true,
      expiration_date_to: DINNER_EVENT.startsAt,
    }),
  });

  return preference;
}

export function getMercadoPagoPayment(paymentId: string) {
  if (!/^\d+$/.test(paymentId)) {
    throw new Error("El identificador de pago no es válido.");
  }

  return mercadoPagoFetch<MercadoPagoPayment>(`/v1/payments/${paymentId}`);
}

export function verifyMercadoPagoWebhookSignature(request: NextRequest) {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  const signatureHeader = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");

  if (!secret || !signatureHeader || !requestId) {
    return false;
  }

  const signatureParts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, ...value] = part.trim().split("=");
      return [key, value.join("=")];
    }),
  );
  const timestamp = signatureParts.ts;
  const receivedSignature = signatureParts.v1;

  if (!timestamp || !receivedSignature || !/^[a-f\d]{64}$/i.test(receivedSignature)) {
    return false;
  }

  const dataId = request.nextUrl.searchParams.get("data.id")?.toLowerCase();
  const manifest = [
    dataId ? `id:${dataId};` : "",
    `request-id:${requestId};`,
    `ts:${timestamp};`,
  ].join("");
  const expectedSignature = createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");
  const expected = Buffer.from(expectedSignature, "hex");
  const received = Buffer.from(receivedSignature, "hex");

  return expected.length === received.length && timingSafeEqual(expected, received);
}
