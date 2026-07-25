"use client";

import { useState } from "react";

/** Botones de utilidad para la página de detalle de viaje: descargar en PDF,
 * imprimir y compartir. "Descargar PDF" e "Imprimir" abren el diálogo nativo
 * de impresión del navegador (con estilos @media print ya ajustados para
 * ocultar header/footer/CTAs) — desde ahí el usuario elige "Guardar como
 * PDF" como destino, sin depender de generar el PDF en el servidor. */
export default function TripActions({ title }: { title: string }) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // el usuario canceló el share sheet, no hacer nada
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setFeedback("¡Link copiado!");
      setTimeout(() => setFeedback(null), 2500);
    } catch {
      setFeedback(url);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 print:hidden">
      <button
        type="button"
        onClick={handlePrint}
        title="Se abre el diálogo de impresión: elige 'Guardar como PDF' como destino"
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-navy-900 transition hover:border-rose-400 hover:text-rose-600"
      >
        ⬇️ Descargar PDF
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-navy-900 transition hover:border-rose-400 hover:text-rose-600"
      >
        🖨️ Imprimir
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-navy-900 transition hover:border-rose-400 hover:text-rose-600"
      >
        {feedback ?? "🔗 Compartir"}
      </button>
    </div>
  );
}
