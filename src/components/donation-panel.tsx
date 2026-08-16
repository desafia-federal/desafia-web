"use client";

import { useMemo, useState } from "react";
import { HeartIcon, LockIcon } from "@/components/icons";

type Currency = "ARS" | "USD";
type Frequency = "once" | "monthly";
type DonationLinks = Partial<Record<`${Currency}_${Frequency}`, string>>;

export function DonationPanel({ links }: { links: DonationLinks }) {
  const [currency, setCurrency] = useState<Currency>("ARS");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [amount, setAmount] = useState("5000");
  const checkout = links[`${currency}_${frequency}`];
  const amounts = currency === "ARS" ? [5000, 10000, 20000] : [10, 25, 50];

  const formatted = useMemo(
    () =>
      new Intl.NumberFormat(currency === "ARS" ? "es-AR" : "en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(Number(amount) || 0),
    [amount, currency],
  );

  function chooseCurrency(next: Currency) {
    setCurrency(next);
    setAmount(next === "ARS" ? "5000" : "10");
  }

  return (
    <div className="donation-panel">
      {!checkout ? (
        <div className="donation-panel__notice" role="status">
          <strong>Donaciones todavía no habilitadas.</strong>
          <span>
            Activaremos esta función cuando finalice la constitución legal y
            esté verificada la cuenta institucional.
          </span>
        </div>
      ) : null}

      <fieldset>
        <legend>Frecuencia</legend>
        <div className="segmented-control">
          <label>
            <input
              type="radio"
              name="frequency"
              value="once"
              checked={frequency === "once"}
              onChange={() => setFrequency("once")}
            />
            <span>Una vez</span>
          </label>
          <label>
            <input
              type="radio"
              name="frequency"
              value="monthly"
              checked={frequency === "monthly"}
              onChange={() => setFrequency("monthly")}
            />
            <span>Todos los meses</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Moneda</legend>
        <div className="segmented-control">
          <label>
            <input
              type="radio"
              name="currency"
              value="ARS"
              checked={currency === "ARS"}
              onChange={() => chooseCurrency("ARS")}
            />
            <span>Pesos argentinos</span>
          </label>
          <label>
            <input
              type="radio"
              name="currency"
              value="USD"
              checked={currency === "USD"}
              onChange={() => chooseCurrency("USD")}
            />
            <span>Dólares</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Monto</legend>
        <div className="amount-grid">
          {amounts.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="amount"
                value={option}
                checked={amount === String(option)}
                onChange={() => setAmount(String(option))}
              />
              <span>
                {new Intl.NumberFormat(currency === "ARS" ? "es-AR" : "en-US", {
                  style: "currency",
                  currency,
                  maximumFractionDigits: 0,
                }).format(option)}
              </span>
            </label>
          ))}
        </div>
        <div className="field donation-panel__custom">
          <label htmlFor="custom-amount">Otro monto</label>
          <input
            id="custom-amount"
            inputMode="numeric"
            min="1"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
      </fieldset>

      {checkout ? (
        <a
          className="button button--primary donation-panel__submit"
          href={checkout}
          rel="noopener noreferrer"
        >
          <HeartIcon width={19} height={19} /> Donar {formatted}
        </a>
      ) : (
        <button
          className="button button--primary donation-panel__submit"
          type="button"
          disabled
        >
          <HeartIcon width={19} height={19} /> Donar {formatted}
        </button>
      )}
      <p className="donation-panel__security">
        <LockIcon width={18} height={18} /> DESAFÍA Federal nunca almacenará
        datos de tarjetas. El pago será procesado por una plataforma externa
        verificada.
      </p>
    </div>
  );
}
