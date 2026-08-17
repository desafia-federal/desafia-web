import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapIcon, SpeechIcon } from "@/components/icons";
import { ImpactDashboard } from "@/components/impact-dashboard";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { contexts, pillars } from "@/content/site";
import { stories } from "@/content/stories";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__content">
            <p className="eyebrow">Desde el interior. Para todo el país.</p>
            <h1>
              Comunicarse es un derecho. <em className="home-hero__title-em">Quedar afuera no.</em>
            </h1>
            <p className="home-hero__lead">
              Somos una asociación civil en formación para afrontar y
              transformar la exclusión que viven las personas con discapacidad
              comunicacional.
            </p>
            <div className="button-row">
              <Link href="/participar" className="button button--primary">
                Sumate a DESAFÍA <ArrowRight width={19} height={19} />
              </Link>
              <Link href="/nosotros" className="text-link">
                Conocé nuestra misión
              </Link>
            </div>
            <p className="home-hero__acronym">
              <strong>DESAFÍA:</strong> Derecho a la Expresión Sin barreras:
              Asociación Federal por la Inclusión y la Autonomía.
            </p>
          </div>

          <figure className="hero-photo">
            <Image
              src="/images/experiencia-cboard-presentacion.webp"
              alt="Martín Bedouret presentando tecnología de comunicación aumentativa ante una audiencia"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <figcaption>
              <span>Experiencia que nos trae hasta acá</span>
              <strong>La tecnología sirve cuando convierte una voz en participación.</strong>
            </figcaption>
          </figure>
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <span>Comunicación</span>
          <span>Autonomía</span>
          <span>Derechos</span>
          <span>Federalismo</span>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container split-intro">
          <SectionHeading
            eyebrow="El problema"
            title="La accesibilidad no termina en una rampa."
          />
          <div className="split-intro__copy">
            <p className="large-copy">
              Una persona también queda afuera cuando un médico no espera su
              respuesta, una escuela no acepta su comunicador o un trámite
              exige hablar por teléfono.
            </p>
            <p>
              Las barreras comunicacionales atraviesan toda la vida. Queremos
              hacerlas visibles, medirlas y trabajar con las instituciones para
              eliminarlas.
            </p>
          </div>
        </div>
        <div className="container contexts-grid" aria-label="Ámbitos de trabajo">
          {contexts.map((context, index) => (
            <div className="context-pill" key={context}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {context}
            </div>
          ))}
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHeading
            eyebrow="Nuestra respuesta"
            title="No venimos a adaptar a las personas. Venimos a transformar las barreras."
            light
          >
            <p>
              Combinamos incidencia, formación, herramientas abiertas y una
              red territorial liderada por quienes conocen la exclusión en
              primera persona.
            </p>
          </SectionHeading>
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.number}>
                <span className="pillar-card__number">{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
                <Link href={pillar.link} aria-label={`Conocer más sobre ${pillar.title}`}>
                  <ArrowUpRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--yellow" id="impacto">
        <div className="container">
          <SectionHeading
            eyebrow="Impacto transparente"
            title="Primero la verdad. Después los números."
          >
            <p>
              Una organización nueva empieza en cero. Publicaremos nuestros
              avances, documentos y aprendizajes sin inflar resultados ni
              atribuirnos el trabajo de otros.
            </p>
          </SectionHeading>
          <ImpactDashboard />
          <div className="section-link-row">
            <Link href="/transparencia" className="text-link text-link--dark">
              Ver nuestro compromiso de transparencia <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container experience-grid">
          <figure className="experience-photo">
            <Image
              src="/images/experiencia-cboard-equipo.webp"
              alt="Equipo de c board en un encuentro internacional de tecnología asistiva"
              fill
              sizes="(max-width: 900px) 100vw, 47vw"
            />
          </figure>
          <div className="experience-copy">
            <p className="eyebrow">La experiencia importa</p>
            <h2>DESAFÍA no empieza de la nada.</h2>
            <p className="large-copy">
              Nace de años de vivir la discapacidad, construir tecnología de
              comunicación y trabajar con comunidades e instituciones dentro y
              fuera de Argentina.
            </p>
            <div className="experience-note">
              <SpeechIcon />
              <p>
                La trayectoria de c board nos enseñó algo simple: entregar una
                herramienta no alcanza si el entorno todavía no está preparado
                para escuchar.
              </p>
            </div>
            <div className="experience-note">
              <MapIcon />
              <p>
                Por eso la asociación tendrá una mirada más amplia: derechos,
                políticas públicas, servicios accesibles y organización federal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container stories-header">
          <SectionHeading eyebrow="Historias y pensamiento" title="Ideas para cambiar la conversación." />
          <Link href="/historias" className="text-link">
            Ver todas las historias <ArrowRight width={18} height={18} />
          </Link>
        </div>
        <div className="container story-grid">
          {stories.map((story) => (
            <article className="story-card" key={story.slug}>
              <Link href={`/historias/${story.slug}`} className="story-card__image">
                <Image src={story.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" />
              </Link>
              <div className="story-card__meta">
                <span>{story.category}</span>
                <span>{story.readTime}</span>
              </div>
              <h3>
                <Link href={`/historias/${story.slug}`}>{story.title}</Link>
              </h3>
              <p>{story.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
