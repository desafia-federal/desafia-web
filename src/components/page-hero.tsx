import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero__grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-hero__copy">{children}</div>
        {aside ? <div className="page-hero__aside">{aside}</div> : null}
      </div>
    </section>
  );
}
