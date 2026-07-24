import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import { parentFaqs } from "@/data/site";

const title = "Preguntas frecuentes";
const description = "Respuestas a las dudas más comunes de los padres sobre los viajes de quinceañeras Travelium XV: seguridad, pagos y documentos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: { title, description, url: "/preguntas-frecuentes" },
  twitter: { title, description },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: parentFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <div className="section-y">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-page">
        <SectionHeading
          level="h1"
          eyebrow="Ayuda"
          title="Preguntas frecuentes"
          description="Si tu pregunta no está aquí, escríbenos por WhatsApp o desde la página de contacto."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={parentFaqs} />
        </div>
      </div>
    </div>
  );
}
