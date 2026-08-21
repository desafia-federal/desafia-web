"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, HeartIcon, LockIcon } from "@/components/icons";
import { priceLabel } from "@/content/event";

type Status = "idle" | "loading" | "error";

const paymentNotices: Record<string, { tone: "success" | "info" | "error"; text: string }> = {
  pending: {
    tone: "info",
    text: "Tu pago quedó pendiente de acreditación. Cuando se confirme, tu lugar y tu nombre quedarán registrados.",
  },
  failure: {
    tone: "error",
    text: "El pago no pudo completarse. Podés intentarlo nuevamente cuando quieras.",
  },
};

export function DinnerCheckout({ paymentStatus }: { paymentStatus?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const notice = paymentStatus ? paymentNotices[paymentStatus] : undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      });
      const payload = (await response.json()) as { initPoint?: string; message?: string };
      if (!response.ok || !payload.initPoint) {
        throw new Error(payload.message || "No pudimos iniciar el pago.");
      }
      window.location.assign(payload.initPoint);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "No pudimos iniciar el pago.");
    }
  }

  return (
    <div className="dinner-checkout" id="reservar">
      <div className="dinner-checkout__price">
        <span className="eyebrow">Valor por cubierto</span>
        <strong>{priceLabel}</strong>
        <span className="dinner-checkout__price-note">Menú fijo · una persona</span>
      </div>

      {notice ? (
        <p className={`dinner-checkout__notice dinner-checkout__notice--${notice.tone}`} role="status">
          {notice.text}
        </p>
      ) : null}

      <form className="dinner-checkout__form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="donor-name">Nombre para los benefactores</label>
          <input
            id="donor-name"
            name="name"
            autoComplete="name"
            maxLength={80}
            required
            placeholder="Cómo querés figurar"
          />
        </div>
        <div className="field">
          <label htmlFor="donor-email">Email</label>
          <input
            id="donor-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            required
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
        <div className="field">
          <label htmlFor="donor-message">Mensaje (opcional)</label>
          <input
            id="donor-message"
            name="message"
            maxLength={240}
            placeholder="Un deseo para la asociación"
          />
        </div>
        <button className="button button--primary dinner-checkout__submit" disabled={status === "loading"}>
          {status === "loading" ? "Redirigiendo…" : `Reservar mi lugar · ${priceLabel}`}
          {status === "loading" ? null : <ArrowRight width={19} height={19} />}
        </button>
      </form>

      {error ? (
        <p className="dinner-checkout__notice dinner-checkout__notice--error" role="alert">
          {error}
        </p>
      ) : null}

      <p className="dinner-checkout__security">
        <LockIcon width={18} height={18} /> El pago se procesa de forma segura con Mercado Pago.
        DESAFÍA Federal nunca almacena datos de tarjetas.
      </p>
      <p className="dinner-checkout__thanks">
        <HeartIcon width={18} height={18} /> Cada aporte queda registrado entre los benefactores
        iniciales de la asociación.
      </p>
    </div>
  );
}
