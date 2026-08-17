import type { Metadata } from "next";
import {
  DinnerCheckoutForm,
  InitialBenefactors,
} from "@/components/dinner-participation";
import { DINNER_EVENT } from "@/lib/dinner";

export const metadata: Metadata = {
  title: "Cena fundacional · 27 de agosto de 2026",
  description:
    "Reservá tu lugar en la primera cena a beneficio de DESAFÍA Federal, el 27 de agosto de 2026 a las 21 hs en IT Italy, Córdoba.",
  openGraph: {
    title: "Primera cena a beneficio de DESAFÍA Federal",
    description:
      "27 de agosto de 2026 · 21 hs · IT Italy, Córdoba · Menú fijo · $150.000 ARS.",
  },
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M7 2v3M17 2v3M3.5 9h17M5.5 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default async function ParticipatePage({
  searchParams,
}: {
  searchParams: Promise<{ resultado?: string; payment_id?: string }>;
}) {
  const paymentReturn = await searchParams;

  return (
    <>
      <section className="dinner-hero" aria-labelledby="dinner-title">
        <div className="container dinner-hero__grid">
          <div className="dinner-hero__copy">
            <p className="eyebrow">Primera cena a beneficio · Córdoba</p>
            <h1 id="dinner-title">
              Una cena para dar el <em>primer paso.</em>
            </h1>
            <p className="dinner-hero__lead">
              El 27 de agosto nos sentamos a la mesa para dar el puntapié
              inicial de DESAFÍA Federal: constituir la asociación civil y
              reunir a su primera junta de fundadores.
            </p>
            <div className="dinner-hero__facts" aria-label="Datos principales de la cena">
              <p><CalendarIcon /> <span>{DINNER_EVENT.dateLabel}</span></p>
              <p><ClockIcon /> <span>{DINNER_EVENT.timeLabel}</span></p>
              <p><LocationIcon /> <span>{DINNER_EVENT.venueLabel}</span></p>
            </div>
          </div>
          <DinnerCheckoutForm
            returnResult={paymentReturn.resultado}
            paymentId={paymentReturn.payment_id}
          />
        </div>
        <div className="dinner-hero__ribbon" aria-hidden="true">
          <span>Menú fijo</span><span>Una mesa fundadora</span><span>Córdoba</span>
          <span>27.08.2026</span><span>Menú fijo</span><span>Una mesa fundadora</span>
        </div>
      </section>

      <section className="section dinner-details" aria-labelledby="dinner-details-title">
        <div className="container">
          <div className="dinner-section-heading">
            <div>
              <p className="eyebrow">La invitación</p>
              <h2 id="dinner-details-title">Una noche. Una mesa. Un comienzo.</h2>
            </div>
            <p>
              Cada cubierto financia el trabajo concreto que hace falta para
              pasar de una iniciativa a una organización formal, abierta y
              preparada para actuar desde Córdoba con alcance federal.
            </p>
          </div>

          <div className="dinner-fact-grid">
            <article className="dinner-fact-card dinner-fact-card--date">
              <span className="dinner-fact-card__number">27</span>
              <div><p>Agosto</p><strong>Jueves · 2026</strong></div>
            </article>
            <article className="dinner-fact-card">
              <span className="dinner-fact-card__index">01</span>
              <h3>IT Italy</h3>
              <p>
                En una sucursal de la ciudad de Córdoba. La dirección se
                informará junto con la confirmación de la reserva.
              </p>
            </article>
            <article className="dinner-fact-card dinner-fact-card--purple">
              <span className="dinner-fact-card__index">02</span>
              <h3>21:00 hs</h3>
              <p>Una cena con menú fijo para encontrarnos, conversar y fundar.</p>
            </article>
            <article className="dinner-fact-card dinner-fact-card--orange">
              <span className="dinner-fact-card__index">03</span>
              <h3>{DINNER_EVENT.priceLabel}</h3>
              <p>Valor por persona. La reserva se confirma con el pago aprobado.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section dinner-purpose" aria-labelledby="dinner-purpose-title">
        <div className="container dinner-purpose__grid">
          <div className="dinner-purpose__intro">
            <p className="eyebrow">Destino de los fondos</p>
            <h2 id="dinner-purpose-title">Lo recaudado pone en marcha la asociación.</h2>
            <p>
              Los fondos serán destinados exclusivamente a esta etapa inicial
              de DESAFÍA Federal en Córdoba.
            </p>
          </div>
          <ol className="dinner-purpose__list">
            <li>
              <span>01</span>
              <div>
                <h3>Constitución de la asociación civil</h3>
                <p>
                  Dar forma legal e institucional a la organización para que
                  pueda desarrollar su misión con transparencia.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Junta de fundadores</h3>
                <p>
                  Convocar y reunir a las personas que integrarán la primera
                  conducción y el equipo inicial de la asociación.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section benefactors" id="benefactores" aria-labelledby="benefactors-title">
        <div className="container benefactors__grid">
          <div className="benefactors__heading">
            <p className="eyebrow">Quienes hicieron posible el comienzo</p>
            <h2 id="benefactors-title">Benefactores iniciales</h2>
            <p>
              Esta nómina se actualiza con el nombre autorizado únicamente
              después de que Mercado Pago confirma un pago de la cena.
            </p>
          </div>
          <InitialBenefactors shouldPoll={paymentReturn.resultado === "aprobado"} />
        </div>
      </section>
    </>
  );
}
