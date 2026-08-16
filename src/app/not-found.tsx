import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1>Esta página quedó afuera.</h1>
        <p className="large-copy">
          El enlace puede haber cambiado, pero podemos volver a empezar.
        </p>
        <Link href="/" className="button button--dark">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
