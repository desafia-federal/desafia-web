import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { getStory, stories } from "@/content/stories";
import styles from "./story.module.css";

const defaultSourceNote =
  "Este texto es una redacción original de DESAFÍA Federal. Sus ideas dialogan con el enfoque de derechos de CommunicationFIRST y con el concepto de accesibilidad comunicacional desarrollado por CDAC.";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: { images: [{ url: story.image, alt: story.imageAlt }] },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return (
    <>
      <article>
        <header className="article-header">
          <div className="container">
            <Link href="/historias" className="text-link">
              ← Todas las historias
            </Link>
            <h1>{story.title}</h1>
            <p className="article-header__excerpt">{story.excerpt}</p>
            <div className="article-meta">
              <span>{story.category}</span>
              <span>{story.date}</span>
              <span>{story.readTime}</span>
            </div>
          </div>
        </header>
        <figure className="article-image">
          <Image src={story.image} alt={story.imageAlt} fill priority sizes="100vw" />
        </figure>
        <div className="article-body">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {story.sourceNote !== false ? (
            <aside className="article-source-note">
              {story.sourceNote ?? defaultSourceNote}
            </aside>
          ) : null}
        </div>

        {story.media?.length ? (
          <section className={styles.mediaSection} aria-labelledby="story-gallery-title">
            <div className={styles.mediaHeading}>
              <p className="eyebrow">La noche en imágenes</p>
              <h2 id="story-gallery-title">Fotos y videos del comienzo</h2>
            </div>
            <div className={styles.mediaGrid}>
              {story.media.map((media) => (
                <figure
                  className={[
                    styles.mediaCard,
                    media.type === "image" && media.wide ? styles.mediaWide : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={media.src}
                >
                  {media.type === "image" ? (
                    <Image
                      className={styles.mediaImage}
                      src={media.src}
                      alt={media.alt}
                      width={media.width}
                      height={media.height}
                      sizes={media.wide ? "(max-width: 900px) 100vw, 1120px" : "(max-width: 900px) 100vw, 540px"}
                    />
                  ) : (
                    <video
                      className={styles.mediaVideo}
                      src={media.src}
                      poster={media.poster}
                      aria-label={media.label}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  )}
                  {media.caption ? <figcaption>{media.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <CtaBand />
    </>
  );
}
