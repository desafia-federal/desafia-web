import type { Metadata } from "next";
import Link from "next/link";
import { DonationPanel } from "@/components/donation-panel";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Donar",
  description:
    "Apoyá el trabajo federal de DESAFÍA por la comunicación, la inclusión y la autonomía.",
};

export default function DonatePage() {
  const links = {
    ARS_once: process.env.DONATION_URL_ARS_ONCE,
    ARS_monthly: process.env.DONATION_URL_ARS_MONTHLY,
    USD_once: process.env.DONATION_URL_USD_ONCE,
    USD_monthly: process.env.DONATION_URL_USD_MONTHLY,
  };

  return (
    <>
      <PageHero eyebrow="Donar" title="Tu aporte puede convertir una barrera en participación.">
        <p>
          Estamos preparando un sistema seguro y transparente de donaciones.
          No recibiremos fondos hasta completar la constitución legal y
          verificar las cuentas institucionales.
        </p>
      </PageHero>

      <section className="section section--cream">
        <div className="container donation-layout">
          <div>
            <p className="eyebrow">En qué se invertirá</p>
            <h2>Trabajo concreto, rendición pública.</h2>
            <div className="contact-sidebar__card">
              <h3>Recursos abiertos</h3>
              <p>
                Guías prácticas, formatos accesibles y herramientas que puedan
                usarse gratuitamente en cualquier provincia.
              </p>
            </div>
            <div className="contact-sidebar__card">
              <h3>Formación territorial</h3>
              <p>
                Capacitaciones y acompañamiento para instituciones y referentes
                locales.
              </p>
            </div>
            <div className="contact-sidebar__card">
              <h3>Incidencia y defensa de derechos</h3>
              <p>
                Investigación de barreras, propuestas de política pública y
                participación de personas con discapacidad.
              </p>
            </div>
            <Link href="/transparencia" className="text-link">
              Ver compromiso de transparencia →
            </Link>
          </div>
          <DonationPanel links={links} />
        </div>
      </section>
    </>
  );
}
