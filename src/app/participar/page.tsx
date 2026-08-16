import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { involvementOptions } from "@/content/site";

export const metadata: Metadata = {
  title: "Participar",
  description:
    "Sumate a DESAFÍA Federal como persona, nodo local, profesional u organización aliada.",
};

export default function ParticipatePage() {
  return (
    <>
      <PageHero eyebrow="Participar" title="Una red federal se construye desde cada lugar.">
        <p>
          No importa si llegás con una historia, una profesión, una organización
          o simplemente con ganas de ayudar. Contanos desde dónde querés
          transformar barreras.
        </p>
      </PageHero>

      <section className="section section--cream">
        <div className="container cards-grid">
          {involvementOptions.map((option, index) => (
            <article
              className={`info-card ${index === 1 ? "info-card--accent" : ""}`}
              key={option.title}
            >
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h2>{option.title}</h2>
              <p>{option.text}</p>
            </article>
          ))}
          <article className="info-card">
            <p className="eyebrow">04</p>
            <h2>Aportá conocimiento</h2>
            <p>
              Buscamos profesionales de derechos, comunicación, diseño,
              accesibilidad, contabilidad, salud, educación y tecnología que
              quieran ofrecer tiempo concreto.
            </p>
          </article>
        </div>
      </section>

      <section className="section section--white" id="formulario">
        <div className="container contact-layout">
          <aside className="contact-sidebar">
            <p className="eyebrow">Contanos sobre vos</p>
            <h2>Queremos escucharte.</h2>
            <div className="contact-sidebar__card">
              <h3>Tu forma de comunicarte</h3>
              <p>
                Podés escribirnos con texto, audio, video o mediante una persona
                de apoyo. No exigimos un único formato.
              </p>
            </div>
            <div className="contact-sidebar__card">
              <h3>Tus tiempos</h3>
              <p>
                No medimos interés por velocidad. Si necesitás más tiempo para
                responder o participar, lo respetamos.
              </p>
            </div>
          </aside>
          <ContactForm defaultSubject="Quiero sumarme como persona" />
        </div>
      </section>
    </>
  );
}
