"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { DINNER_EVENT, type InitialBenefactor } from "@/lib/dinner";

type CheckoutState =
  | { kind: "idle"; message: "" }
  | { kind: "loading"; message: string }
  | { kind: "error" | "success" | "pending"; message: string };

function getReturnState(result?: string): CheckoutState {
  if (result === "aprobado") {
    return {
      kind: "success",
      message:
        "Mercado Pago informó el pago. Estamos confirmando la acreditación y sumando tu nombre a la nómina.",
    };
  }

  if (result === "pendiente") {
    return {
      kind: "pending",
      message:
        "El pago está pendiente. Publicaremos tu nombre cuando Mercado Pago confirme la acreditación.",
    };
  }

  if (result === "no-aprobado") {
    return {
      kind: "error",
      message:
        "El pago no se completó. Podés volver a intentarlo; no se registró ningún cargo desde este sitio.",
    };
  }

  return { kind: "idle", message: "" };
}

export function DinnerCheckoutForm({
  returnResult,
  paymentId,
}: {
  returnResult?: string;
  paymentId?: string;
}) {
  const [state, setState] = useState<CheckoutState>(() => getReturnState(returnResult));

  useEffect(() => {
    if (returnResult === "aprobado" && paymentId && /^\d+$/.test(paymentId)) {
      void fetch("/api/cena/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      });
    }
  }, [paymentId, returnResult]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ kind: "loading", message: "Preparando el pago seguro…" });

    try {
      const response = await fetch("/api/cena/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicName: formData.get("publicName"),
          email: formData.get("email"),
          publicationConsent: formData.get("publicationConsent") === "on",
        }),
      });
      const payload = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error || "No pudimos iniciar el pago.");
      }

      window.location.assign(payload.checkoutUrl);
    } catch (error) {
      setState({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "No pudimos iniciar el pago. Intentá nuevamente.",
      });
    }
  }

  const isLoading = state.kind === "loading";

  return (
    <aside className="dinner-checkout" aria-labelledby="dinner-checkout-title">
      <div className="dinner-checkout__topline">
        <span>1 lugar</span>
        <strong>{DINNER_EVENT.priceLabel}</strong>
      </div>
      <h2 id="dinner-checkout-title">Reservá tu lugar</h2>
      <p className="dinner-checkout__intro">
        Elegí el nombre que querés publicar. Tu correo se usa para gestionar el
        pago y no se muestra en el sitio.
      </p>

      <form id="dinner-checkout-form" onSubmit={handleSubmit}>
        <div className="dinner-checkout__field">
          <label htmlFor="dinner-public-name">Nombre público</label>
          <input
            id="dinner-public-name"
            name="publicName"
            type="text"
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Ej.: Ana Pérez"
            required
          />
        </div>
        <div className="dinner-checkout__field">
          <label htmlFor="dinner-email">Correo electrónico</label>
          <input
            id="dinner-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            required
          />
        </div>
        <label className="dinner-checkout__consent">
          <input name="publicationConsent" type="checkbox" required />
          <span>
            Autorizo a publicar el nombre elegido en “Benefactores iniciales”
            cuando el pago sea aprobado.
          </span>
        </label>
        <button
          className="button dinner-checkout__button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Conectando…" : "Reservar y pagar con Mercado Pago"}
        </button>
      </form>

      <p className="dinner-checkout__security">
        Pago procesado en Mercado Pago. DESAFÍA Federal no recibe datos de tu tarjeta.
      </p>
      {state.message ? (
        <p
          className={`dinner-checkout__status dinner-checkout__status--${state.kind}`}
          role={state.kind === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <button
        className="dinner-mobile-cta"
        type="submit"
        form="dinner-checkout-form"
        disabled={isLoading}
      >
        {isLoading ? "Conectando…" : `Pagar cena · ${DINNER_EVENT.priceLabel}`}
      </button>
    </aside>
  );
}

export function InitialBenefactors({ shouldPoll = false }: { shouldPoll?: boolean }) {
  const [benefactors, setBenefactors] = useState<InitialBenefactor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadBenefactors = useCallback(async () => {
    try {
      const response = await fetch("/api/cena/benefactores", { cache: "no-store" });
      const payload = (await response.json()) as {
        benefactors?: InitialBenefactor[];
      };

      if (!response.ok) {
        throw new Error("No se pudo actualizar la nómina.");
      }

      setBenefactors(payload.benefactors || []);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void loadBenefactors(), 0);

    if (!shouldPoll) {
      return () => window.clearTimeout(initialLoad);
    }

    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      void loadBenefactors();

      if (attempts >= 12) {
        window.clearInterval(interval);
      }
    }, 5000);

    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
    };
  }, [loadBenefactors, shouldPoll]);

  if (loading) {
    return <p className="benefactors-empty" role="status">Actualizando la nómina…</p>;
  }

  if (error) {
    return (
      <div className="benefactors-empty" role="status">
        <p>No pudimos actualizar la nómina en este momento.</p>
        <button className="text-link" type="button" onClick={() => void loadBenefactors()}>
          Volver a intentar
        </button>
      </div>
    );
  }

  if (benefactors.length === 0) {
    return (
      <p className="benefactors-empty">
        La nómina comienza con la primera reserva acreditada. Tu nombre puede
        ser el que dé el puntapié inicial.
      </p>
    );
  }

  return (
    <ol className="benefactors-list" aria-label="Nómina de benefactores iniciales">
      {benefactors.map((benefactor, index) => (
        <li key={`${benefactor.name}-${benefactor.approvedAt}-${index}`}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <strong>{benefactor.name}</strong>
        </li>
      ))}
    </ol>
  );
}
