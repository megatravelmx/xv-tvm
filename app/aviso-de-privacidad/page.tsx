import type { Metadata } from "next";
import LegalDraftNotice from "@/components/LegalDraftNotice";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad de Travelium XV: qué datos personales recabamos, con qué fines, cómo ejercer tus derechos ARCO y el tratamiento de datos de menores.",
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: false, follow: true },
};

export default function AvisoPrivacidadPage() {
  return (
    <div className="section-y">
      <div className="container-page max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-navy-950">Aviso de privacidad</h1>
        <LegalDraftNotice />

        <div className="prose prose-sm max-w-none text-navy-900/80">
          <p>
            Travelium (en adelante, &quot;Travelium&quot;), con domicilio para efectos de este
            aviso en México, es responsable del tratamiento de los datos personales que nos
            proporciones a través de este sitio web, conforme a la Ley Federal de Protección de
            Datos Personales en Posesión de los Particulares.
          </p>

          <h2>1. Datos personales que recabamos</h2>
          <p>
            Nombre, teléfono, correo electrónico, ciudad de origen y, en su caso, datos de la
            pasajera menor de edad (nombre, fecha de nacimiento) que sean estrictamente necesarios
            para cotizar y operar el viaje contratado.
          </p>

          <h2>2. Datos de menores de edad</h2>
          <p>
            Cuando el servicio contratado involucre a una persona menor de edad, los datos de la
            menor solo serán recabados con el consentimiento expreso de la madre, padre o tutor
            legal, y se utilizarán exclusivamente para fines de organización, seguridad y
            documentación del viaje.
          </p>

          <h2>3. Finalidades del tratamiento</h2>
          <ul>
            <li>Elaborar cotizaciones y dar seguimiento comercial.</li>
            <li>Procesar apartados, pagos y confirmaciones de reservación.</li>
            <li>Comunicar información operativa antes, durante y después del viaje.</li>
            <li>Cumplir obligaciones legales y contractuales.</li>
            <li>Enviar comunicación comercial, cuando exista consentimiento para ello.</li>
          </ul>

          <h2>4. Derechos ARCO</h2>
          <p>
            Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales
            (derechos ARCO) enviando tu solicitud a{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>

          <h2>5. Transferencia de datos</h2>
          <p>
            Tus datos podrán compartirse con aerolíneas, hoteles y demás proveedores de servicios
            turísticos, proveedores de pago y, en su caso, autoridades migratorias, únicamente para
            los fines señalados en este aviso.
          </p>

          <h2>6. Cambios al aviso de privacidad</h2>
          <p>
            Cualquier modificación a este aviso será publicada en esta misma página con su fecha de
            actualización correspondiente.
          </p>

          <p className="mt-8 text-xs text-navy-900/50">
            [PENDIENTE] Completar con razón social exacta, domicilio fiscal, mecanismos formales de
            solicitud ARCO y demás elementos que determine el área jurídica.
          </p>
        </div>
      </div>
    </div>
  );
}
