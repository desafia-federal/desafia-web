import { promises as fs } from "node:fs";
import path from "node:path";

export type Benefactor = {
  name: string;
  message?: string;
  createdAt: string;
};

type StoredBenefactor = Benefactor & { paymentId: string; email?: string };

// Accept both the Vercel KV and the native Upstash env var names, so the
// integration works regardless of how the marketplace database is linked.
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KV_KEY = "desafia:benefactors";

const FILE_PATH = path.join(process.cwd(), ".data", "benefactors.json");

const MAX_NAME = 80;
const MAX_MESSAGE = 240;
const MAX_EMAIL = 120;

function sanitize(value: string, max: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function toPublic({ name, message, createdAt }: StoredBenefactor): Benefactor {
  return message ? { name, message, createdAt } : { name, createdAt };
}

const useKv = Boolean(KV_URL && KV_TOKEN);

async function kvCommand<T>(command: unknown[]): Promise<T> {
  const response = await fetch(KV_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`KV request failed with status ${response.status}`);
  }
  const data = (await response.json()) as { result: T };
  return data.result;
}

async function readFileStore(): Promise<StoredBenefactor[]> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(raw) as StoredBenefactor[];
  } catch {
    return [];
  }
}

async function writeFileStore(items: StoredBenefactor[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2), "utf8");
}

async function readAll(): Promise<StoredBenefactor[]> {
  if (useKv) {
    const rows = await kvCommand<string[]>(["LRANGE", KV_KEY, "0", "-1"]);
    return rows.map((row) => JSON.parse(row) as StoredBenefactor);
  }
  return readFileStore();
}

/**
 * Records a confirmed benefactor. Deduplicates by Mercado Pago payment id so
 * repeated webhook deliveries do not create duplicates.
 */
export async function addBenefactor(entry: {
  paymentId: string;
  name: string;
  email?: string;
  message?: string;
}): Promise<void> {
  const name = sanitize(entry.name, MAX_NAME);
  if (!name) return;

  const record: StoredBenefactor = {
    paymentId: entry.paymentId,
    name,
    createdAt: new Date().toISOString(),
  };
  const email = entry.email ? sanitize(entry.email, MAX_EMAIL) : "";
  if (email) record.email = email;
  const message = entry.message ? sanitize(entry.message, MAX_MESSAGE) : "";
  if (message) record.message = message;

  const existing = await readAll();
  if (existing.some((item) => item.paymentId === record.paymentId)) return;

  if (useKv) {
    await kvCommand(["RPUSH", KV_KEY, JSON.stringify(record)]);
    return;
  }
  await writeFileStore([...existing, record]);
}

export async function listBenefactors(): Promise<Benefactor[]> {
  const all = await readAll();
  return all
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(toPublic);
}
