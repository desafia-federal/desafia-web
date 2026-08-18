import type { Metadata } from "next";
import Link from "next/link";
import { BenefactorsWall } from "@/components/benefactors-wall";
import { DinnerCheckout } from "@/components/dinner-checkout";
import { PaymentSuccessModal } from "@/components/payment-success-modal";
import { CheckIcon, MapIcon } from "@/components/icons";
import { benefitDinner } from "@/content/event";
import { listBenefactors } from "@/lib/benefactors";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cena a beneficio · Participar",
  description: `Sumate a la primera cena a beneficio de DESAFÍA Federal el ${benefitDinner.dateLabel} en ${benefitDinner.venue}, Córdoba. Reservá tu lugar y ayudá a fundar la asociación.`,
};

const details = [
  { label: "Fecha", value: benefitDinner.dateLabel },
  { label: "Hora", value: benefitDinner.timeLabel },
  // { label: "Lugar", value: `${benefitDinner.venue} · ${benefitDinner.venueDetail}` },
  { label: "Menú", value: benefitDinner.menu },
];

const purposes = [
  "Constituir legalmente la asociación civil en Córdoba.",
  "Convocar y conformar la junta de fundadores.",
  "Sumar a las y los integrantes iniciales de la red federal.",
];

export default async function ParticipatePage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string | string[] }>;
}) {
  const [params, benefactors] = await Promise.all([searchParams, listBenefactors()]);
  const pago = Array.isArray(params.pago) ? params.pago[0] : params.pago;

  return (
    <>
      <PaymentSuccessModal active={pago === "approved"} />
      <section className="dinner-hero">
        <div className="container dinner-hero__grid">
          <div className="dinner-hero__intro">
            <p className="eyebrow">{benefitDinner.tagline}</p>
            <h1>Primera cena a beneficio de DESAFÍA Federal.</h1>
          </div>

          <DinnerCheckout paymentStatus={pago} />

          <div className="dinner-hero__details">
            <p className="dinner-hero__lead">
              El {benefitDinner.dateLabel} a las {benefitDinner.timeLabel} nos encontramos en {benefitDinner.city}, para dar el puntapié inicial de la
              asociación. {benefitDinner.purpose}
            </p>
            <ul className="dinner-hero__facts">
              {details.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container split-intro">
          <div>
            <p className="eyebrow">A dónde va tu aporte</p>
            <h2>Una cena para fundar una red federal.</h2>
          </div>
          <div className="split-intro__copy">
            <ul className="check-list">
              {purposes.map((purpose) => (
                <li key={purpose}>
                  <CheckIcon width={22} height={22} /> {purpose}
                </li>
              ))}
            </ul>
            <p>
              La primera cena reúne a quienes quieren que
              la comunicación deje de ser una barrera. Cada cubierto es un ladrillo de la
              asociación.
            </p>
            <p className="dinner-place">
              <MapIcon width={20} height={20} /> {benefitDinner.venue} — {benefitDinner.venueDetail}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--white" id="benefactores">
        <div className="container">
          <p className="eyebrow">Benefactores iniciales</p>
          <h2 className="benefactors-wall__title">
            Quienes están fundando DESAFÍA Federal.
          </h2>
          <p className="benefactors-wall__intro">
            Cada persona que reserva su lugar queda registrada acá, en agradecimiento por impulsar
            el nacimiento de la asociación.
          </p>
          <BenefactorsWall initial={benefactors} />
        </div>
      </section>

      <section className="section section--cream">
        <div className="container split-intro">
          <div>
            <p className="eyebrow">¿Otra forma de sumarte?</p>
            <h2>No podés venir pero querés participar.</h2>
          </div>
          <div className="split-intro__copy">
            <p>
              Si no podés asistir a la cena pero querés colaborar con la fundación de la asociación,
              escribinos y encontramos juntos la mejor manera.
            </p>
            <Link href="/contacto" className="button button--primary">
              Escribinos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
