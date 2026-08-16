import type { Metadata } from "next";
import { ImpactDashboard } from "@/components/impact-dashboard";
import { PageHero } from "@/components/page-hero";
import { publicDocuments } from "@/content/site";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Estado institucional, documentos, finanzas y métricas verificables de DESAFÍA Federal.",
};

export default function TransparencyPage() {
  return (
    <>
      <PageHero eyebrow="Transparencia" title="La confianza empieza antes de recibir el primer peso.">
        <p>
          No vamos a esperar a crecer para rendir cuentas. Publicamos qué está
          listo, qué falta y qué resultados todavía no existen.
        </p>
      </PageHero>

      <section className="section section--yellow">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Impacto</p>
            <h2>Nuestro punto de partida.</h2>
          </div>
          <ImpactDashboard />
        </div>
      </section>

      <section className="section section--white">
        <div className="container content-grid">
          <div className="content-grid__label">
            <p className="eyebrow">Documentos públicos</p>
          </div>
          <div className="documents-grid">
            {publicDocuments.map((document) => (
              <article className="document-card" key={document.title}>
                <span className="document-card__status">{document.status}</span>
                <h2>{document.title}</h2>
                <p>{document.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container content-grid">
          <div className="content-grid__label">
            <p className="eyebrow">Reglas que asumimos</p>
          </div>
          <div className="content-grid__body">
            <h2>Cómo vamos a medir y contar nuestro trabajo.</h2>
            <div className="principles-grid">
              <article className="principle-card">
                <h3>Separar trayectoria de impacto</h3>
                <p>
                  La experiencia previa de integrantes y aliados no se presentará
                  como resultado de la asociación.
                </p>
              </article>
              <article className="principle-card">
                <h3>Publicar evidencia</h3>
                <p>
                  Toda cifra tendrá período, definición y fuente. Corregiremos
                  públicamente cualquier dato equivocado.
                </p>
              </article>
              <article className="principle-card">
                <h3>Mostrar también los límites</h3>
                <p>
                  Los reportes incluirán aprendizajes, actividades incompletas y
                  objetivos que no se alcanzaron.
                </p>
              </article>
              <article className="principle-card">
                <h3>Cuidar a las personas</h3>
                <p>
                  Ninguna historia, imagen o dato personal se publicará sin un
                  consentimiento comprensible y revocable.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
