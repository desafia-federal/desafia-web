"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { provinces } from "@/content/site";

type Status = { type: "idle" | "sending" | "success" | "error"; message: string };

export function ContactForm({ defaultSubject = "Consulta general" }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus({ type: "sending", message: "Enviando…" });

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || "No pudimos enviar el mensaje.");
      form.reset();
      setStatus({
        type: "success",
        message: data.message || "Recibimos tu mensaje. Gracias por sumarte.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "No pudimos enviar el mensaje. Probá nuevamente.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Nombre y apellido</label>
          <input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="province">Provincia</label>
          <select id="province" name="province" defaultValue="">
            <option value="">Seleccioná una opción</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="subject">¿Cómo querés participar?</label>
          <select id="subject" name="subject" defaultValue={defaultSubject} required>
            <option>Consulta general</option>
            <option>Quiero sumarme como persona</option>
            <option>Quiero impulsar un nodo local</option>
            <option>Quiero transformar una institución</option>
            <option>Quiero ofrecer tiempo profesional</option>
            <option>Quiero apoyar económicamente</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Contanos un poco más</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="¿Qué barrera querés transformar?"
        />
      </div>
      <div className="field field--honeypot" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-submit">
        <button className="button button--primary" disabled={status.type === "sending"}>
          {status.type === "sending" ? "Enviando…" : "Enviar mensaje"}
          <ArrowRight width={19} height={19} />
        </button>
        <p className="form-privacy">
          Solo usaremos tus datos para responder este contacto.
        </p>
      </div>
      <div
        className={`form-status ${status.type === "error" ? "form-status--error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status.message}
        {status.type === "error" ? (
          <>
            {" "}
            También podés escribir a{" "}
            <a href="mailto:hola@desafiafederal.org">hola@desafiafederal.org</a>.
          </>
        ) : null}
      </div>
    </form>
  );
}
