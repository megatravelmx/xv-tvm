import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/site";

const title = "Contacto";
const description = "Escríbenos por WhatsApp, correo o agenda una llamada con un ejecutivo para cotizar el viaje de XV años.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contacto" },
  openGraph: { title, description, url: "/contacto" },
  twitter: { title, description },
};

export default function ContactoPage() {
  return (
    <div className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr,1.1fr]">
        <div>
          <SectionHeading
            level="h1"
            eyebrow="Estamos para ayudarte"
            title="Hablemos de tu viaje de XV años"
            description="Cuéntanos qué itinerario te interesa y un ejecutivo te contacta con disponibilidad, precio exacto y plan de pagos."
          />

          <div className="mt-8 space-y-4 text-sm text-navy-900/80">
            <p><span className="font-semibold text-navy-950">Teléfono / WhatsApp:</span> {siteConfig.phone}</p>
            <p><span className="font-semibold text-navy-950">Correo:</span> {siteConfig.contactEmail}</p>
            <p><span className="font-semibold text-navy-950">Horario:</span> {siteConfig.officeHours}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-rose-300 bg-rose-100/40 p-5 text-xs text-navy-900/60">
            Datos de contacto en placeholder — sustituir número de WhatsApp, correo y horario reales
            en <code>data/site.ts</code> antes de publicar.
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
