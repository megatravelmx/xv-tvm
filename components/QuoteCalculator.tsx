"use client";

import { useMemo, useState } from "react";
import { trips, getTripBySlug } from "@/data/trips";
import { buildWhatsAppLink } from "@/data/site";
import type { Pricing } from "@/data/types";

type RoomType = "doble" | "triple" | "sencilla";
type Currency = "USD" | "MXN";

const roomLabels: Record<RoomType, string> = {
  doble: "Doble (2 por habitación)",
  triple: "Triple (3 por habitación)",
  sencilla: "Sencilla (1 por habitación)",
};

export default function QuoteCalculator({
  initialSlug,
  livePricing = {},
  tipoCambio = null,
}: {
  initialSlug?: string;
  /** Precios reales tomados en vivo del programa (por slug), cuando el feed
   * responde correctamente. Si falta un viaje aquí se usa data/trips.ts. */
  livePricing?: Record<string, Pricing>;
  /** Tipo de cambio del día (MXN por 1 USD). Null si el feed no respondió. */
  tipoCambio?: number | null;
}) {
  const [slug, setSlug] = useState(initialSlug && getTripBySlug(initialSlug) ? initialSlug : trips[0].slug);
  const [roomType, setRoomType] = useState<RoomType>("doble");
  const [pax, setPax] = useState(1);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");

  const trip = getTripBySlug(slug) ?? trips[0];
  const pricing = livePricing[trip.slug] ?? trip.pricing;
  const salida = trip.salidas[0];
  const suplemento = pricing.suplementos[0];

  const fx = currency === "MXN" && tipoCambio ? tipoCambio : 1;
  const currencyLabel = currency === "MXN" && tipoCambio ? "MXN" : "USD";
  const convert = (usd: number) => Math.round(usd * fx);

  const pricePerPersonUsd = useMemo(() => {
    const base = pricing[roomType];
    return base + pricing.impuestos + (suplemento?.amount ?? 0);
  }, [pricing, roomType, suplemento]);

  const pricePerPerson = convert(pricePerPersonUsd);
  const total = pricePerPerson * pax;

  const message = [
    "¡Hola! Quiero apartar / cotizar formalmente este viaje con Travelium:",
    `Viaje: ${trip.name} (${trip.code})`,
    `Salida: ${salida}`,
    `Habitación: ${roomLabels[roomType]}`,
    `Pasajeros: ${pax}`,
    `Total estimado: $${total.toLocaleString("en-US")} ${currencyLabel}`,
    nombre ? `Nombre: ${nombre}` : "",
    telefono ? `Teléfono: ${telefono}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = buildWhatsAppLink(message);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
      {/* FORM */}
      <div className="rounded-3xl border border-rose-100 bg-white p-6 sm:p-8">
        <p className="font-display text-lg font-bold text-navy-950">Arma tu cotización</p>

        <div className="mt-6 space-y-5">
          <label className="block text-sm font-semibold text-navy-900">
            Viaje
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-500"
            >
              {trips.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name} — {t.duration.days} días
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold text-navy-900">
            Fecha de salida disponible
            <select
              disabled
              value={salida}
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-navy-900/70 outline-none"
            >
              <option>{salida}</option>
            </select>
            <span className="mt-1 block text-xs text-navy-900/50">
              Fechas 2027 según disponibilidad vigente — tu ejecutivo confirma otras salidas.
            </span>
          </label>

          <div className="block text-sm font-semibold text-navy-900">
            Tipo de habitación
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {(Object.keys(roomLabels) as RoomType[]).map((rt) => (
                <button
                  key={rt}
                  type="button"
                  onClick={() => setRoomType(rt)}
                  className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${
                    roomType === rt
                      ? "border-rose-500 bg-rose-500 text-white"
                      : "border-rose-200 bg-white text-navy-900 hover:border-rose-300"
                  }`}
                >
                  {rt === "doble" ? "Doble" : rt === "triple" ? "Triple" : "Sencilla"}
                </button>
              ))}
            </div>
          </div>

          <label className="block text-sm font-semibold text-navy-900">
            Número de pasajeros
            <input
              type="number"
              min={1}
              max={10}
              value={pax}
              onChange={(e) => setPax(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
              className="mt-1.5 w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
            />
          </label>

          <div className="block text-sm font-semibold text-navy-900">
            Ver monto en
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["USD", "MXN"] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setCurrency(cur)}
                  disabled={cur === "MXN" && !tipoCambio}
                  className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    currency === cur
                      ? "border-rose-500 bg-rose-500 text-white"
                      : "border-rose-200 bg-white text-navy-900 hover:border-rose-300"
                  }`}
                >
                  {cur === "USD" ? "Dólares (USD)" : "Pesos (MXN)"}
                </button>
              ))}
            </div>
            {tipoCambio ? (
              <span className="mt-1 block text-xs font-normal text-navy-900/50">
                Tipo de cambio hoy: 1 USD = ${tipoCambio.toFixed(2)} MXN
              </span>
            ) : (
              <span className="mt-1 block text-xs font-normal text-navy-900/50">
                Tipo de cambio no disponible en este momento — mostrando USD.
              </span>
            )}
          </div>

          <div className="grid gap-4 border-t border-rose-100 pt-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-navy-900">
              Tu nombre (opcional)
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
                placeholder="Para tu cotización"
              />
            </label>
            <label className="block text-sm font-semibold text-navy-900">
              Teléfono (opcional)
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
                placeholder="10 dígitos"
              />
            </label>
          </div>
        </div>
      </div>

      {/* RESUMEN */}
      <div className="h-fit rounded-3xl border-2 border-rose-100 bg-white p-6 shadow-glow sm:p-8">
        <p className="eyebrow">Resumen de tu cotización</p>
        <h3 className="mt-1 font-display text-xl font-bold text-navy-950">{trip.name}</h3>
        <p className="text-sm text-navy-900/60">{trip.code} · Salida {salida}</p>

        <dl className="mt-6 space-y-3 text-sm text-navy-900">
          <div className="flex justify-between">
            <dt className="text-navy-900/60">Tarifa {roomLabels[roomType]}</dt>
            <dd>${convert(pricing[roomType]).toLocaleString("en-US")} {currencyLabel}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-navy-900/60">Impuestos aéreos</dt>
            <dd>${convert(pricing.impuestos).toLocaleString("en-US")} {currencyLabel}</dd>
          </div>
          {suplemento && (
            <div className="flex justify-between">
              <dt className="text-navy-900/60">Suplemento salida</dt>
              <dd>${convert(suplemento.amount).toLocaleString("en-US")} {currencyLabel}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-rose-100 pt-3 font-semibold text-navy-950">
            <dt>Precio por persona</dt>
            <dd>${pricePerPerson.toLocaleString("en-US")} {currencyLabel}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-navy-900/60">Pasajeros</dt>
            <dd>× {pax}</dd>
          </div>
        </dl>

        <div className="mt-5 rounded-2xl bg-brand-gradient p-4 text-white">
          <p className="text-xs uppercase tracking-wide text-white/80">Total estimado</p>
          <p className="font-display text-3xl font-extrabold">
            ${total.toLocaleString("en-US")} <span className="text-base font-semibold">{currencyLabel}</span>
          </p>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1EBE5A] active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.51 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.93-4.36-.15-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36l.56.01c.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.11.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.17.28.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.17-.19.72-.84.91-1.13.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
          </svg>
          Enviar cotización por WhatsApp
        </a>

        <p className="mt-4 text-[11px] leading-relaxed text-navy-900/50">
          Cotización simulada con las tarifas publicadas en el itinerario. El precio final,
          disponibilidad y calendario de abonos se confirman con un ejecutivo antes del apartado —
          este cálculo no representa una reservación ni un cobro.
        </p>
      </div>
    </div>
  );
}
