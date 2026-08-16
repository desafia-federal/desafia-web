import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { principles } from "@/content/site";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "La misión, la visión y los principios de DESAFÍA Federal, una asociación civil en formación desde Córdoba.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Quiénes somos" title="Una organización nacida desde la experiencia.">
        <p>
          DESAFÍA Federal se está construyendo desde Córdoba para reducir la
          exclusión que viven las personas con discapacidad, con foco especial
          en las barreras que impiden comunicarse y participar.
        </p>
      </PageHero>

      <section className="section section--white" id="mision">
        <div className="container content-grid">
          <div className="content-grid__label">
            <p className="eyebrow">Nuestra misión</p>
          </div>
          <div className="content-grid__body">
            <h2>Afrontar la exclusión. Transformar sus causas.</h2>
            <p className="large-copy">
              Defendemos el derecho de cada persona a expresarse, ser
              comprendida, tomar decisiones y participar plenamente, sin que su
              forma de comunicación determine cuánto vale su voz.
            </p>
            <p>
              Trabajaremos mediante incidencia pública, formación, recursos
              abiertos, acompañamiento institucional y una red federal de
              personas y organizaciones. No buscamos reemplazar el trabajo que
              ya existe, sino conectarlo, amplificarlo y llevar la accesibilidad
              comunicacional a lugares donde todavía no llega.
            </p>
          </div>
        </div>
      </section>

      <figure className="photo-band">
        <Image
          src="/images/experiencia-cboard-comunidad.webp"
          alt="Personas conversando alrededor de una demostración de comunicación aumentativa"
          fill
          sizes="100vw"
        />
        <figcaption className="photo-band__caption">
          Esta imagen pertenece a la experiencia previa de c board. La usamos
          porque DESAFÍA nace de ese recorrido, no para atribuir a la asociación
          un trabajo que todavía no realizó.
        </figcaption>
      </figure>

      <section className="section section--cream" id="derechos">
        <div className="container content-grid">
          <div className="content-grid__label">
            <p className="eyebrow">Nuestra visión</p>
          </div>
          <div className="content-grid__body">
            <h2>Un país donde nadie tenga que demostrar que merece ser escuchado.</h2>
            <p className="large-copy">
              Imaginamos instituciones capaces de comprender y ser comprendidas
              por personas que hablan, escriben, señalan, gesticulan, miran o
              usan tecnologías de apoyo.
            </p>
            <p>
              La comunicación es una práctica compartida. Cuando una persona no
              puede participar, la pregunta no debería ser qué le falta a ella,
              sino qué debe cambiar en el entorno.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section-heading section-heading--light">
            <p className="eyebrow">Principios</p>
            <h2>Cómo queremos construir.</h2>
          </div>
          <div className="principles-grid">
            {principles.map((principle) => (
              <article className="principle-card" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container content-grid">
          <div className="content-grid__label">
            <p className="eyebrow">Por qué federal</p>
          </div>
          <div className="content-grid__body">
            <h2>Córdoba es el punto de partida, no el centro.</h2>
            <p className="large-copy">
              En el interior, las distancias, los recursos y las redes de apoyo
              son diferentes. Una solución diseñada lejos del territorio puede
              convertirse en otra barrera.
            </p>
            <p>
              Queremos que los futuros nodos provinciales participen de la
              agenda, la conducción y la evaluación de la asociación. Ser
              federal no es extender una sede central: es distribuir capacidad
              de decisión.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
