import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { buildWhatsAppLink, siteConfig } from "@/data/site";
import { IconInstagram, IconTikTok, IconFacebook } from "@/components/icons";

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
            <p>
              <span className="font-semibold text-navy-950">Teléfono:</span>{" "}
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="text-rose-600 hover:underline">
                {siteConfig.phone}
              </a>
              {" · "}
              <a
                href={buildWhatsAppLink("¡Hola! Quiero información sobre un viaje de quinceañeras Travelium.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 hover:underline"
              >
                Escribir por WhatsApp
              </a>
            </p>
            <p>
              <span className="font-semibold text-navy-950">Correo:</span>{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-rose-600 hover:underline">
                {siteConfig.contactEmail}
              </a>
            </p>
            <p><span className="font-semibold text-navy-950">Horario:</span> {siteConfig.officeHours}</p>
            <p>
              <span className="font-semibold text-navy-950">Oficinas:</span> {siteConfig.address.line},{" "}
              {siteConfig.address.city}, {siteConfig.address.region}
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Travelium"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-500 hover:text-white"
            >
              <IconInstagram className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Travelium"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-500 hover:text-white"
            >
              <IconTikTok className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Travelium"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-500 hover:text-white"
            >
              <IconFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <ContactForm />
      </div>

      {/* MAPA DE LA OFICINA */}
      <div className="container-page mt-14">
        <SectionHeading
          eyebrow="Nuestras oficinas"
          title="Así nos encuentras"
          description={`${siteConfig.address.line}, ${siteConfig.address.city}, ${siteConfig.address.region}.`}
        />
        <div className="mt-6 overflow-hidden rounded-3xl border border-rose-100 shadow-sm">
          <iframe
            title="Ubicación de las oficinas de Travelium"
            src={`https://www.google.com/maps?q=${siteConfig.address.lat},${siteConfig.address.lng}&z=16&output=embed`}
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={siteConfig.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-4 inline-flex"
        >
          Ver en Google Maps / Cómo llegar
        </a>
      </div>
    </div>
  );
}
