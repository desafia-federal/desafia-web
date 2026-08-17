import "server-only";

import type { InitialBenefactor } from "@/lib/dinner";
import { sanitizePublicName } from "@/lib/dinner";

const BENEFACTOR_LIST_KEY = "desafia:cena-2026-08-27:benefactores";
const BENEFACTOR_PAYMENT_PREFIX = "desafia:cena-2026-08-27:pago:";

type RedisResponse<T> = {
  result?: T;
  error?: string;
};

function getRedisConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), token };
}

async function redisCommand<T>(command: (string | number)[]) {
  const config = getRedisConfig();

  if (!config) {
    throw new Error("El registro de benefactores no está configurado.");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  const payload = (await response.json()) as RedisResponse<T>;

  if (!response.ok || payload.error) {
    throw new Error("No se pudo acceder al registro de benefactores.");
  }

  return payload.result;
}

export function benefactorStoreIsConfigured() {
  return Boolean(getRedisConfig());
}

export async function saveInitialBenefactor({
  paymentId,
  name,
  approvedAt,
}: {
  paymentId: string;
  name: string;
  approvedAt: string;
}) {
  const publicName = sanitizePublicName(name);

  if (!publicName || !/^\d+$/.test(paymentId)) {
    throw new Error("Los datos del benefactor no son válidos.");
  }

  const paymentKey = `${BENEFACTOR_PAYMENT_PREFIX}${paymentId}`;
  const score = Number.isFinite(Date.parse(approvedAt))
    ? Date.parse(approvedAt)
    : Date.now();
  const script = [
    "if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end",
    "redis.call('HSET', KEYS[1], 'name', ARGV[1], 'approvedAt', ARGV[2])",
    "redis.call('ZADD', KEYS[2], ARGV[3], ARGV[4])",
    "return 1",
  ].join(" ");

  await redisCommand<number>([
    "EVAL",
    script,
    2,
    paymentKey,
    BENEFACTOR_LIST_KEY,
    publicName,
    approvedAt,
    score,
    paymentId,
  ]);
}

export async function listInitialBenefactors(): Promise<InitialBenefactor[]> {
  if (!benefactorStoreIsConfigured()) {
    return [];
  }

  const paymentIds =
    (await redisCommand<string[]>(["ZRANGE", BENEFACTOR_LIST_KEY, 0, -1])) || [];

  if (paymentIds.length === 0) {
    return [];
  }

  const entries = await Promise.all(
    paymentIds.map(async (paymentId) => {
      const fields =
        (await redisCommand<string[]>([
          "HGETALL",
          `${BENEFACTOR_PAYMENT_PREFIX}${paymentId}`,
        ])) || [];
      const record = Object.fromEntries(
        Array.from({ length: Math.floor(fields.length / 2) }, (_, index) => [
          fields[index * 2],
          fields[index * 2 + 1],
        ]),
      );
      const name = sanitizePublicName(record.name);

      if (!name) {
        return null;
      }

      return {
        name,
        approvedAt: record.approvedAt || "",
      };
    }),
  );

  return entries.filter((entry): entry is InitialBenefactor => entry !== null);
}
