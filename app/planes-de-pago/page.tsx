import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { IconWallet } from "@/components/icons";

const title = "Planes de pago y abonos";
const description = "Conoce las formas de pago, el apartado y los planes de abonos disponibles para el viaje de XV años.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/planes-de-pago" },
  openGraph: { title, description, url: "/planes-de-pago" },
  twitter: { title, description },
};

const steps = [
  {
    title: "Cotiza y elige tu programa",
    desc: "Selecciona itinerario, tipo de habitación y fecha de salida. Recibes el precio total con impuestos y suplementos claramente desglosados.",
  },
  {
    title: "Aparta con $600 USD",
    desc: "El apartado es de $600 USD por pasajera(o). No es reembolsable en cancelaciones con más de 151 días de anticipación a la salida.",
  },
  {
    title: "Segundo pago 150 días antes",
    desc: "Se realiza un pago adicional de $2,000 USD, acumulando $2,600 USD entre apartado y segundo pago. Puedes abonar a tu ritmo entre una fecha y otra.",
  },
  {
    title: "Liquida 90 días antes de la salida",
    desc: "Al completar el pago total se libera la documentación y la información operativa para el viaje.",
  },
];

const cancelacion = [
  { periodo: "Más de 151 días antes", cargo: "Sin cargo*" },
  { periodo: "Entre 150 y 91 días antes", cargo: "$600 USD" },
  { periodo: "Entre 90 y 70 días antes", cargo: "$2,600 USD" },
  { periodo: "69 días o menos antes", cargo: "100% del valor del viaje" },
];

const methods = [
  { title: "Tarjeta de crédito o débito", desc: "Confirmación de pago inmediata." },
  { title: "Transferencia bancaria", desc: "El apartado queda pendiente de validación hasta confirmar la recepción del pago." },
  { title: "Depósito bancario", desc: "Mismo proceso de validación que la transferencia; conserva tu comprobante." },
];

export default function PlanesDePagoPage() {
  return (
    <div className="section-y">
      <div className="container-page">
        <SectionHeading
          level="h1"
          eyebrow="Para las familias"
          title="Planes de pago pensados para ti"
          description="Queremos que el precio nunca sea un obstáculo para vivir esta experiencia. Así funciona el proceso, de la cotización a la liquidación."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-3xl border border-rose-100 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient font-display text-base font-bold text-white">
                {i + 1}
              </div>
              <p className="mt-4 font-display text-lg font-bold text-navy-950">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Formas de pago" title="¿Cómo puedo pagar?" />
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {methods.map((m) => (
              <div key={m.title} className="rounded-2xl border border-rose-100 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <IconWallet className="h-5 w-5" />
                </div>
                <p className="mt-3 font-semibold text-navy-950">{m.title}</p>
                <p className="mt-1 text-sm text-navy-900/70">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Política de cancelación" title="¿Qué pasa si necesito cancelar?" />
          <div className="mt-6 overflow-hidden rounded-3xl border border-rose-100">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-5 py-3 text-left font-semibold">Periodo antes de la salida</th>
                  <th className="px-5 py-3 text-left font-semibold">Cargo por cancelación</th>
                </tr>
              </thead>
              <tbody>
                {cancelacion.map((c, i) => (
                  <tr key={c.periodo} className={i % 2 === 0 ? "bg-white" : "bg-rose-100/40"}>
                    <td className="px-5 py-3 text-navy-900/80">{c.periodo}</td>
                    <td className="px-5 py-3 font-semibold text-navy-950">{c.cargo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-navy-900/50">
            *Solo aplica para expedientes individuales. Reservas de la misma agencia con más de 5 pasajeros a cancelar tienen políticas distintas — consulta con tu ejecutivo.
          </p>
        </div>

        <div className="mt-14 rounded-3xl bg-brand-gradient p-8 text-center text-white sm:p-10">
          <h3 className="font-display text-2xl font-bold">¿Quieres conocer tu plan de pagos exacto?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85">
            Cotiza tu viaje y un ejecutivo te comparte el monto de apartado y el calendario de
            abonos según la fecha de salida elegida.
          </p>
          <Link href="/cotizador" className="btn-light animate-cta-pulse mt-6 inline-flex">
            Cotizar mi viaje
          </Link>
        </div>
      </div>
    </div>
  );
}
