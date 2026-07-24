import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import { parentFaqs } from "@/data/site";
import { IconShieldCheck, IconWallet, IconCompareArrows } from "@/components/icons";

const title = "Información para padres";
const description = "Todo lo que necesitas saber antes de reservar el viaje de XV años de tu hija: seguridad, pagos, documentos y acompañamiento.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/para-padres" },
  openGraph: { title, description, url: "/para-padres" },
  twitter: { title, description },
};

export default function ParaPadresPage() {
  return (
    <div className="section-y">
      <div className="container-page">
        <SectionHeading
          level="h1"
          eyebrow="Para padres y madres"
          title="Todo lo que necesitas saber antes de reservar"
          description="Sabemos que decidir el viaje de XV años de tu hija implica evaluar seguridad, reputación, precio y condiciones. Aquí está todo, sin letras chiquitas."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Link href="/seguridad" className="rounded-3xl border border-rose-100 bg-white p-6 hover:shadow-glow">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <IconShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-lg font-bold text-navy-950">Seguridad y acompañamiento</p>
            <p className="mt-2 text-sm text-navy-900/70">Guía, chaperonas, seguro de asistencia y protocolos ante emergencias.</p>
          </Link>
          <Link href="/planes-de-pago" className="rounded-3xl border border-rose-100 bg-white p-6 hover:shadow-glow">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <IconWallet className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-lg font-bold text-navy-950">Planes de pago</p>
            <p className="mt-2 text-sm text-navy-900/70">Apartado, abonos y liquidación explicados paso a paso.</p>
          </Link>
          <Link href="/comparador" className="rounded-3xl border border-rose-100 bg-white p-6 hover:shadow-glow">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <IconCompareArrows className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-lg font-bold text-navy-950">Comparador de viajes</p>
            <p className="mt-2 text-sm text-navy-900/70">Duración, países y precio de los 3 itinerarios, lado a lado.</p>
          </Link>
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Resolvemos tus dudas" title="Preguntas frecuentes" />
          <div className="mt-6">
            <FAQAccordion items={parentFaqs} />
          </div>
        </div>

        <div className="mt-14 rounded-3xl bg-brand-gradient p-8 text-center text-white sm:p-10">
          <h3 className="font-display text-2xl font-bold">¿Tienes una pregunta que no está aquí?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85">
            Escríbenos por WhatsApp o agenda una llamada con un ejecutivo Travelium.
          </p>
          <Link href="/contacto" className="btn-light mt-6 inline-flex">
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
