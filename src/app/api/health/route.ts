import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Diagnóstico temporal: informa SOLO si las variables están presentes.
// Nunca expone los valores de los secretos. Quitar tras verificar el deploy.
export function GET() {
  return NextResponse.json({
    mpAccessToken: Boolean(process.env.MP_ACCESS_TOKEN),
    mpWebhookSecret: Boolean(process.env.MP_WEBHOOK_SECRET),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    kv: Boolean(
      (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
        (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN),
    ),
    vercelEnv: process.env.VERCEL_ENV ?? null,
  });
}
