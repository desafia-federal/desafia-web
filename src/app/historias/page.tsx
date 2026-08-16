import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Historias y noticias",
  description:
    "Historias, ideas y reportes de territorio sobre comunicación, discapacidad e inclusión.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero eyebrow="Historias y noticias" title="Cambiar la realidad también exige cambiar el relato.">
        <p>
          Publicamos experiencias, pensamiento y reportes de campo para hacer
          visibles las barreras que muchas veces quedan fuera de la agenda.
        </p>
      </PageHero>

      <section className="section section--white">
        <div className="container story-list">
          {stories.map((story) => (
            <article className="story-list__item" key={story.slug}>
              <Link href={`/historias/${story.slug}`} className="story-list__image">
                <Image src={story.image} alt="" fill sizes="(max-width: 880px) 100vw, 42vw" />
              </Link>
              <div className="story-list__content">
                <div className="story-list__meta">
                  <span>{story.category}</span>
                  <span>{story.date}</span>
                  <span>{story.readTime}</span>
                </div>
                <h2>
                  <Link href={`/historias/${story.slug}`}>{story.title}</Link>
                </h2>
                <p className="large-copy">{story.excerpt}</p>
                <Link href={`/historias/${story.slug}`} className="text-link">
                  Leer historia <ArrowRight width={18} height={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
