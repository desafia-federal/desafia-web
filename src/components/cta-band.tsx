import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export function CtaBand({
  eyebrow = "Hagámoslo juntos",
  title = "La inclusión no llega sola. Hay que organizarla.",
  text = "Sumate desde tu provincia y ayudanos a convertir experiencias aisladas en una fuerza federal.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{text}</p>
          <div className="button-row">
            <Link href="/participar" className="button button--dark">
              Quiero participar <ArrowRight width={19} height={19} />
            </Link>
            <Link href="/contacto" className="text-link text-link--dark">
              Hablemos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
