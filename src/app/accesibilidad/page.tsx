import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Accesibilidad",
  description:
    "Compromiso de accesibilidad y canales para informar barreras en el portal de DESAFÍA Federal.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Accesibilidad" title="Este portal también tiene que saber escuchar.">
        <p>
          Diseñamos el sitio con accesibilidad desde el inicio, pero sabemos que
          ninguna revisión reemplaza la experiencia de quienes lo usan.
        </p>
      </PageHero>

      <section className="section section--white">
        <div className="container content-grid">
          <div className="content-grid__label">
            <p className="eyebrow">Nuestro objetivo</p>
          </div>
          <div className="content-grid__body">
            <h2>Apuntamos a cumplir WCAG 2.2 nivel AA.</h2>
            <p className="large-copy">
              Priorizamos estructura semántica, navegación por teclado, foco
              visible, contraste, objetivos táctiles amplios y respeto por la
              preferencia de movimiento reducido.
            </p>
            <p>
              No afirmamos una certificación que todavía no existe. Antes del
              lanzamiento definitivo realizaremos pruebas con tecnologías de
              apoyo y con personas que utilizan distintas formas de acceso y
              comunicación.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container content-grid">
          <div className="content-grid__label">
            <p className="eyebrow">Encontraste una barrera</p>
          </div>
          <div className="content-grid__body">
            <h2>Queremos conocerla.</h2>
            <p>
              Indicá la página, qué intentabas hacer, el dispositivo o tecnología
              de apoyo que utilizabas y, si podés, qué cambio facilitaría la
              tarea. Aceptamos mensajes escritos, audios y videos.
            </p>
            <div className="button-row">
              <Link href="/contacto" className="button button--primary">
                Informar una barrera
              </Link>
              <a href="mailto:accesibilidad@desafiafederal.org" className="text-link">
                accesibilidad@desafiafederal.org
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
