"use client";

import { useState } from "react";
import { trips } from "@/data/trips";
import { buildWhatsAppLink, siteConfig } from "@/data/site";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    viaje: trips[0].slug,
    mensaje: "",
    // honeypot: campo invisible para personas reales. Los bots que rellenan
    // formularios automáticamente suelen llenar también los campos ocultos,
    // así que si viene lleno lo tratamos como spam sin pedirle nada al
    // usuario real (cero fricción, a diferencia de un captcha visible).
    sitioWeb: "",
  });
  const [securityError, setSecurityError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const trip = trips.find((t) => t.slug === form.viaje);

  const message = [
    "¡Hola! Quiero información sobre un viaje de quinceañeras Travelium.",
    `Nombre: ${form.nombre || "(pendiente)"}`,
    `Teléfono: ${form.telefono || "(pendiente)"}`,
    `Viaje de interés: ${trip?.name ?? ""}`,
    form.mensaje ? `Mensaje: ${form.mensaje}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = buildWhatsAppLink(message);
  const mailHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    `Solicitud de información — ${trip?.name ?? ""}`
  )}&body=${encodeURIComponent(message)}`;

  /** Verificación anti-spam invisible: solo honeypot, sin pedirle nada al
   * usuario real. No depende de una API key externa. Si en el futuro llega
   * a haber spam real (este formulario no tiene backend, solo abre
   * WhatsApp/correo, así que el riesgo es bajo), se puede agregar Google
   * reCAPTCHA v3 (invisible, sin fricción) con un site key propio. */
  function passesSecurityCheck() {
    return form.sitioWeb.trim() === ""; // honeypot lleno = bot
  }

  function handleSubmit(action: "whatsapp" | "email") {
    if (!passesSecurityCheck()) {
      setSecurityError("No pudimos validar el formulario. Intenta de nuevo o escríbenos directo por WhatsApp.");
      return;
    }
    setSecurityError(null);
    window.open(action === "whatsapp" ? whatsappHref : mailHref, "_blank");
  }

  return (
    <form
      className="relative grid gap-4 rounded-3xl border border-rose-100 bg-white p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit("whatsapp");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-navy-900">
          Nombre completo
          <input
            required
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
            placeholder="Tu nombre"
          />
        </label>
        <label className="text-sm font-semibold text-navy-900">
          Teléfono / WhatsApp
          <input
            required
            value={form.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
            placeholder="10 dígitos"
          />
        </label>
      </div>

      <label className="text-sm font-semibold text-navy-900">
        Correo electrónico
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
          placeholder="tu@correo.com"
        />
      </label>

      <label className="text-sm font-semibold text-navy-900">
        Viaje de interés
        <select
          value={form.viaje}
          onChange={(e) => update("viaje", e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-500"
        >
          {trips.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name} — {t.code}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-semibold text-navy-900">
        Cuéntanos más (opcional)
        <textarea
          value={form.mensaje}
          onChange={(e) => update("mensaje", e.target.value)}
          rows={3}
          className="mt-1.5 w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
          placeholder="Fecha aproximada, número de pasajeros, dudas puntuales..."
        />
      </label>

      {/* Honeypot: invisible para personas, los bots de spam sí lo llenan. */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          No llenar este campo
          <input
            type="text"
            name="sitioWeb"
            tabIndex={-1}
            autoComplete="off"
            value={form.sitioWeb}
            onChange={(e) => update("sitioWeb", e.target.value)}
          />
        </label>
      </div>

      {securityError && (
        <p className="text-xs font-semibold text-rose-600" role="alert">
          {securityError}
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          Enviar por WhatsApp
        </button>
        <button type="button" onClick={() => handleSubmit("email")} className="btn-secondary">
          Enviar por correo
        </button>
      </div>

      <p className="text-xs text-navy-900/50">
        Al enviar aceptas nuestro{" "}
        <a href="/aviso-de-privacidad" className="underline">
          aviso de privacidad
        </a>
        . Este formulario abre WhatsApp/correo con tus datos prellenados; no se almacena
        automáticamente en un CRM en esta primera versión del sitio.
      </p>
    </form>
  );
}
