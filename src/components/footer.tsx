import Link from "next/link";
import { navigation } from "@/content/site";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo footer />
          <p>
            Afrontar y transformar la exclusión desde Córdoba hacia todo el
            país.
          </p>
        </div>
        <div>
          <h2 className="site-footer__title">Explorá</h2>
          <ul className="site-footer__links">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/participar">Participar</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="site-footer__title">Información</h2>
          <ul className="site-footer__links">
            <li>
              <Link href="/accesibilidad">Accesibilidad</Link>
            </li>
            <li>
              <Link href="/transparencia">Transparencia</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="site-footer__title">Contacto</h2>
          <p>Córdoba, Argentina</p>
          <a href="mailto:hola@desafiafederal.org">
            hola@desafiafederal.org
          </a>
          <p className="site-footer__stage">Asociación civil en formación</p>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} DESAFÍA Federal.</p>
        <p>El código de este portal es abierto bajo licencia MIT.</p>
      </div>
    </footer>
  );
}
