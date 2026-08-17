"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CloseIcon } from "@/components/icons";

export function PaymentSuccessModal({ active }: { active: boolean }) {
  const [open, setOpen] = useState(active);
  const primaryRef = useRef<HTMLButtonElement>(null);

  // On an approved return, reveal the benefactors list behind the modal and
  // clean the URL so a refresh does not reopen the popup.
  useEffect(() => {
    if (!active) return;
    window.history.replaceState(null, "", window.location.pathname);
    const timer = window.setTimeout(() => {
      document.getElementById("benefactores")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
    return () => window.clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!open) return;
    primaryRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  function goToBenefactors() {
    setOpen(false);
    document.getElementById("benefactores")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="payment-modal" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="payment-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="payment-modal__close"
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
        >
          <CloseIcon width={22} height={22} />
        </button>
        <span className="payment-modal__icon" aria-hidden="true">
          <CheckIcon width={34} height={34} />
        </span>
        <h2 id="payment-modal-title">¡Gracias por tu aporte!</h2>
        <p>
          Tu pago fue aprobado y tu lugar en la cena quedó reservado. Tu nombre se sumará a los
          benefactores iniciales en unos minutos.
        </p>
        <button
          ref={primaryRef}
          type="button"
          className="button button--primary payment-modal__cta"
          onClick={goToBenefactors}
        >
          Ver benefactores iniciales
        </button>
      </div>
    </div>
  );
}
