import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { trips } from "@/data/trips";
import { preventa } from "@/data/site";
import SectionHeading from "@/components/SectionHeading";
import { IconCheck } from "@/components/icons";

const title = "Comparador de viajes de quinceañeras";
const description = "Compara duración, países, precio, actividades y acompañamiento de los 3 itinerarios de quinceañeras Travelium XV, lado a lado.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/comparador" },
  openGraph: { title, description, url: "/comparador" },
  twitter: { title, description },
};

function regularTotal(days: number) {
  const key = days >= 26 ? "26" : "18";
  const p = preventa.regularPricing[key];
  return p.doble + p.impuestos + p.suplemento;
}

function preventaTotal(t: (typeof trips)[number]) {
  return t.pricing.doble + t.pricing.impuestos + (t.pricing.suplementos[0]?.amount ?? 0);
}

const rows: { label: string; render: (t: (typeof trips)[number]) => ReactNode }[] = [
  { label: "Código", render: (t) => t.code },
  { label: "Acompañamiento", render: (t) => t.audience },
  { label: "Duración", render: (t) => `${t.duration.days} días / ${t.duration.nights} noches` },
  {
    label: "Salida 2027",
    render: (t) => (
      <span>
        {t.salidas.join(", ")}
        <span className="mt-0.5 block text-[11px] font-normal text-navy-900/45">
          Fecha estimada, se confirma con el calendario escolar (oct–nov 2026)
        </span>
      </span>
    ),
  },
  { label: "Países", render: (t) => t.countries.length },
  { label: "Ciudades", render: (t) => t.cities.length },
  {
    label: "Precio preventa (doble)",
    render: (t) => (
      <span>
        <span className="font-bold text-navy-950">${t.pricing.doble.toLocaleString("en-US")} USD</span>
        <span className="block text-[11px] text-navy-900/50">+ ${t.pricing.impuestos} imp. + ${t.pricing.suplementos[0]?.amount ?? 0} spl.</span>
      </span>
    ),
  },
  {
    label: "Total aprox. (doble, preventa)",
    render: (t) => `$${preventaTotal(t).toLocaleString("en-US")} USD`,
  },
  {
    label: `Precio regular (después del ${preventa.fechaLimite})`,
    render: (t) => `$${regularTotal(t.duration.days).toLocaleString("en-US")} USD`,
  },
  { label: "Sencilla (solo por solicitud)", render: (t) => `$${t.pricing.sencilla.toLocaleString("en-US")} USD` },
  {
    label: "Acompañamiento en destino",
    render: (t) =>
      t.includes.some((i) => i.toLowerCase().includes("chaperona"))
        ? "Guía + 3 chaperonas especializadas"
        : "Guía + tour líder (viaja con mamá)",
  },
  { label: "Grupo privado de Facebook", render: (t) => (t.includes.some((i) => i.toLowerCase().includes("chaperona")) ? "Sí" : "No aplica (mamá viaja contigo)") },
  { label: "eSIM incluida", render: () => "12 GB" },
  { label: "Categoría de hotel", render: () => "Turista, doble (twin)" },
  { label: "Disneyland París", render: () => "Sí" },
  { label: "Cena de gala Palazzo Borghese", render: () => "Sí" },
];

export default function ComparadorPage() {
  return (
    <div className="section-y">
      <div className="container-page">
        <SectionHeading
          level="h1"
          eyebrow="Decide con calma"
          title="Compara los 3 itinerarios lado a lado"
          description="Todos comparten el estándar Travelium XV: guía de habla hispana, seguro de asistencia médica y celebración de gala. Elige según duración, acompañamiento y presupuesto."
        />

        <div className="mt-10 overflow-x-auto rounded-3xl border border-rose-100">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 bg-blue-500 px-5 py-4 text-left text-xs uppercase tracking-wide text-white">
                  &nbsp;
                </th>
                {trips.map((t) => (
                  <th key={t.slug} className="bg-blue-500 px-5 py-4 text-left text-white">
                    <p className="font-display text-base font-bold">{t.name}</p>
                    <Link href={`/viajes/${t.slug}`} className="mt-1 inline-block text-xs font-semibold text-rose-300 hover:text-white">
                      Ver detalle →
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-rose-100/40"}>
                  <td className="sticky left-0 border-r border-rose-100 bg-inherit px-5 py-3 font-semibold text-navy-900">
                    {row.label}
                  </td>
                  {trips.map((t) => (
                    <td key={t.slug} className="px-5 py-3 text-navy-900/80">
                      {row.render(t)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-white">
                <td className="sticky left-0 border-r border-rose-100 bg-inherit px-5 py-4" />
                {trips.map((t) => (
                  <td key={t.slug} className="px-5 py-4">
                    <Link href={`/cotizador?viaje=${t.slug}`} className="btn-primary !px-4 !py-2 text-xs">
                      Cotizar
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-navy-900/50">
          Precios en USD por persona en habitación doble. La preventa está vigente hasta el {preventa.fechaLimite}; después de esa fecha aplica el precio regular 2027.
        </p>

        {/* ACTIVIDADES DESTACADAS POR VIAJE */}
        <div className="mt-16">
          <SectionHeading eyebrow="Lo más top de cada viaje" title="Actividades destacadas" />
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {trips.map((t) => (
              <div key={t.slug} className="rounded-3xl border border-rose-100 bg-white p-6">
                <p className="eyebrow">{t.audience}</p>
                <p className="mt-1 font-display text-lg font-bold text-navy-950">{t.name}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-navy-900/75">
                  {t.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* QUÉ INCLUYEN TODOS */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-rose-100 bg-white p-6 sm:p-8">
            <p className="font-display text-lg font-bold text-navy-950">Los 3 itinerarios incluyen</p>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-900/75">
              {[
                "Vuelo redondo desde Ciudad de México",
                "Hospedaje en categoría turista, media pensión (desayuno y cena)",
                "Transporte en autocar turístico y guía de habla hispana",
                "Seguro de asistencia médica",
                "Kit de viaje: backpack, playeras y sudadera",
                "eSIM con 12 GB de datos",
                "Todas las entradas y visitas del itinerario",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <IconCheck className="mt-0.5 h-4 w-4 flex-none text-rose-500" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-rose-100 bg-white p-6 sm:p-8">
            <p className="font-display text-lg font-bold text-navy-950">Ningún itinerario incluye</p>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-900/75">
              {[
                "Almuerzos ni bebidas durante las cenas",
                "Propinas para guías locales y choferes (se pagan en destino)",
                "Gastos personales y souvenirs",
                "Trámite ETA para entrar a Reino Unido",
                "Formato SAM y carta notarial (solo aplica si la menor no viaja con mamá)",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 text-navy-900/40">–</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-3xl bg-brand-gradient p-8 text-center text-white sm:p-10">
          <h3 className="font-display text-2xl font-bold">¿Aún no decides cuál viaje elegir?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85">
            Cotiza los 3 y compara precio final con impuestos y suplementos, o escríbenos y te ayudamos a elegir.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/cotizador" className="btn-light animate-cta-pulse">
              Cotizar mi viaje
            </Link>
            <Link href="/contacto" className="rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-navy-950">
              Hablar con un ejecutivo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
