import type { Metadata } from "next";
import LegalDraftNotice from "@/components/LegalDraftNotice";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de cotización, apartado, planes de pago, cancelación y requisitos migratorios para los viajes de quinceañeras Travelium XV.",
  alternates: { canonical: "/terminos-y-condiciones" },
  robots: { index: false, follow: true },
};

export default function TerminosPage() {
  return (
    <div className="section-y">
      <div className="container-page max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-navy-950">Términos y condiciones</h1>
        <LegalDraftNotice />

        <div className="prose prose-sm max-w-none text-navy-900/80">
          <h2>1. Objeto</h2>
          <p>
            Estos términos regulan la contratación de los viajes de quinceañeras organizados por
            Travelium a través de este sitio web.
          </p>

          <h2>2. Cotización y vigencia de precios</h2>
          <p>
            Los precios mostrados están sujetos a cambio y disponibilidad. Toda cotización tiene
            una vigencia limitada y debe revalidarse antes de confirmar el apartado. El precio
            definitivo es el que se confirma al momento de la reservación.
          </p>

          <h2>3. Apartado y forma de pago</h2>
          <p>
            El apartado del lugar requiere un pago inicial cuyo monto se informa al cotizar. Se
            aceptan pagos con tarjeta, transferencia o depósito bancario. Los pagos por
            transferencia o depósito quedan sujetos a validación antes de confirmar el apartado.
          </p>

          <h2>4. Calendario de abonos y liquidación</h2>
          <p>
            El calendario de abonos y la fecha límite de liquidación se comparten con cada familia
            de acuerdo con el itinerario y fecha de salida contratados.
          </p>

          <h2>5. Política de cancelación</h2>
          <p>
            [PENDIENTE] Detallar penalizaciones por cancelación, tiempos de anticipación y montos
            no reembolsables (confirmar con el área operativa).
          </p>

          <h2>6. Documentación y requisitos migratorios</h2>
          <p>
            Es responsabilidad de la familia contar con pasaporte vigente y cumplir los requisitos
            migratorios de cada destino. Cuando la menor no viaje con madre, padre o tutor legal,
            deberá tramitarse el Formato SAM ante el Instituto Nacional de Migración. Travelium
            informa los requisitos conocidos al momento de la cotización, pero no garantiza la
            emisión de visas o permisos de entrada.
          </p>

          <h2>7. Menores de edad</h2>
          <p>
            La contratación del viaje para una persona menor de edad requiere el consentimiento
            expreso de la madre, padre o tutor legal, quien acepta estos términos en representación
            de la menor.
          </p>

          <h2>8. Responsabilidad</h2>
          <p>
            Los servicios de transporte aéreo, hospedaje y visitas son prestados por aerolíneas,
            hoteles y proveedores turísticos aliados. Travelium organiza y coordina cada itinerario
            de principio a fin, y da seguimiento ante cualquier incidencia durante el viaje.
          </p>

          <h2>9. Modificaciones</h2>
          <p>
            Travelium podrá actualizar estos términos y condiciones. La versión vigente al momento
            de la contratación es la aplicable a cada operación.
          </p>

          <p className="mt-8 text-xs text-navy-900/50">
            [PENDIENTE] Este documento debe completarse y validarse con el área jurídica antes de
            publicarse como versión definitiva.
          </p>
        </div>
      </div>
    </div>
  );
}
