"use client";

import { useEffect, useState } from "react";

type Benefactor = {
  name: string;
  message?: string;
  createdAt: string;
};

export function BenefactorsWall({ initial }: { initial: Benefactor[] }) {
  const [benefactors, setBenefactors] = useState<Benefactor[]>(initial);

  useEffect(() => {
    let active = true;

    async function refresh() {
      try {
        const response = await fetch("/api/benefactores", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { benefactors?: Benefactor[] };
        if (active && Array.isArray(data.benefactors)) {
          setBenefactors(data.benefactors);
        }
      } catch {
        // Silent: the wall keeps showing the last known list.
      }
    }

    refresh();
    const timer = setInterval(refresh, 20000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  if (benefactors.length === 0) {
    return (
      <p className="benefactors-wall__empty">
        Todavía no hay benefactores registrados. Podés ser la primera persona en sumar tu nombre.
      </p>
    );
  }

  return (
    <>
      <p className="benefactors-wall__count">
        {benefactors.length}{" "}
        {benefactors.length === 1 ? "persona ya reservó su lugar" : "personas ya reservaron su lugar"}
      </p>
      <ul className="benefactors-wall__list">
        {benefactors.map((benefactor, index) => (
          <li className="benefactors-wall__item" key={`${benefactor.name}-${index}`}>
            <strong>{benefactor.name}</strong>
            {benefactor.message ? <span>{benefactor.message}</span> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
