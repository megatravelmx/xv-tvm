import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { trips } from "@/data/trips";
import SectionHeading from "@/components/SectionHeading";

const title = "Comparador de viajes de quinceañeras";
const description = "Compara duración, países, precio y acompañamiento de los 3 itinerarios de quinceañeras Travelium XV, lado a lado.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/comparador" },
  openGraph: { title, description, url: "/comparador" },
  twitter: { title, description },
};

const rows: { label: string; render: (t: (typeof trips)[number]) => ReactNode }[] = [
  { label: "Código", render: (t) => t.code },
  { label: "Duración", render: (t) => `${t.duration.days} días / ${t.duration.nights} noches` },
  { label: "Salida 2027", render: (t) => t.salidas.join(", ") },
  { label: "Acompañamiento", render: (t) => t.audience },
  { label: "Países", render: (t) => t.countries.length },
  { label: "Ciudades", render: (t) => t.cities.length },
  { label: "Desde (doble)", render: (t) => `$${t.pricing.doble.toLocaleString("en-US")} USD` },
  { label: "Sencilla", render: (t) => `$${t.pricing.sencilla.toLocaleString("en-US")} USD` },
  { label: "Impuestos", render: (t) => `$${t.pricing.impuestos} USD` },
  { label: "Chaperonas incluidas", render: (t) => (t.includes.some((i) => i.toLowerCase().includes("chaperona")) ? "Sí" : "Viaja con mamá") },
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
          description="Todos comparten el estándar Travelium XV: guía de habla hispana, seguro de asistencia y celebración de gala. Elige según duración, acompañamiento y presupuesto."
        />

        <div className="mt-10 overflow-x-auto rounded-3xl border border-rose-100">
          <table className="w-full min-w-[720px] border-collapse text-sm">
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
      </div>
    </div>
  );
}
