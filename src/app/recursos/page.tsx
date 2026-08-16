import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { resources } from "@/content/site";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Guías y herramientas abiertas sobre derechos y accesibilidad comunicacional en Argentina.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Recursos abiertos" title="Herramientas para que la accesibilidad suceda.">
        <p>
          Estamos preparando materiales gratuitos para personas con
          discapacidad, familias, organizaciones, profesionales e instituciones
          de todo el país.
        </p>
      </PageHero>

      <section className="section section--white">
        <div className="container notice-box notice-box--yellow">
          <strong>Biblioteca en construcción.</strong> Preferimos publicar menos
          materiales y probarlos con personas con discapacidad antes que llenar
          una sección con documentos que no resuelven problemas reales.
        </div>
        <div className="container resource-grid" style={{ marginTop: 40 }}>
          {resources.map((resource) => (
            <article className="resource-card" key={resource.title}>
              <span className="resource-card__tag">{resource.tag}</span>
              <h2>{resource.title}</h2>
              <p>{resource.text}</p>
              <div className="resource-card__footer">{resource.status}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--cream">
        <div className="container content-grid">
          <div className="content-grid__label">
            <p className="eyebrow">Cómo los construiremos</p>
          </div>
          <div className="content-grid__body">
            <h2>Accesibles desde el proceso, no solamente al final.</h2>
            <p className="large-copy">
              Cada recurso deberá ser revisado por personas que utilicen
              distintas formas de comunicación y probado en contextos reales.
            </p>
            <p>
              Publicaremos versiones en lenguaje claro, formatos descargables
              y licencias que permitan adaptar los materiales a cada provincia.
              También indicaremos las fuentes y la fecha de actualización.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Construcción colaborativa"
        title="¿Conocés una barrera que necesita una guía concreta?"
        text="Contanos qué sucede en tu escuela, hospital, municipio o comunidad. Las herramientas deben empezar por los problemas reales."
      />
    </>
  );
}
