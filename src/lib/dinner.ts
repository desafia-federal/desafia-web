export const DINNER_EVENT = {
  title: "Primera cena a beneficio de DESAFÍA Federal",
  dateLabel: "Jueves 27 de agosto de 2026",
  timeLabel: "21:00 hs",
  venueLabel: "IT Italy · ciudad de Córdoba",
  price: 150_000,
  priceLabel: "$150.000 ARS",
  currency: "ARS",
  externalReference: "desafia-cena-2026-08-27",
  startsAt: "2026-08-27T21:00:00-03:00",
} as const;

export type InitialBenefactor = {
  name: string;
  approvedAt: string;
};

export function sanitizePublicName(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const sanitized = value
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (
    sanitized.length < 2 ||
    sanitized.length > 80 ||
    !/[\p{L}\p{N}]/u.test(sanitized)
  ) {
    return null;
  }

  return sanitized;
}

export function isValidEmail(value: unknown) {
  if (typeof value !== "string" || value.length > 254) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function dinnerSalesAreOpen(now = new Date()) {
  return now.getTime() < new Date(DINNER_EVENT.startsAt).getTime();
}
