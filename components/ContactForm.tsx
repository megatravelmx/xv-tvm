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
  });

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

  return (
    <form
      className="grid gap-4 rounded-3xl border border-rose-100 bg-white p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappHref, "_blank");
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

      <div className="mt-2 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          Enviar por WhatsApp
        </button>
        <a href={mailHref} className="btn-secondary">
          Enviar por correo
        </a>
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
