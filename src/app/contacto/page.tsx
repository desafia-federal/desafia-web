import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactá a DESAFÍA Federal desde cualquier provincia.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contacto" title="Cada transformación empieza por una conversación.">
        <p>
          Escribinos para compartir una barrera, acercar una propuesta o conocer
          más sobre la asociación.
        </p>
      </PageHero>
      <section className="section section--white">
        <div className="container contact-layout">
          <aside className="contact-sidebar">
            <p className="eyebrow">DESAFÍA Federal</p>
            <h2>Córdoba, Argentina.</h2>
            <div className="contact-sidebar__card">
              <h3>Correo</h3>
              <a href="mailto:hola@desafiafederal.org">hola@desafiafederal.org</a>
            </div>
            <div className="contact-sidebar__card">
              <h3>Estado institucional</h3>
              <p>Asociación civil en formación.</p>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
