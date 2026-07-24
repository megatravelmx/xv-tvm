export default function LegalDraftNotice() {
  return (
    <div className="mb-10 rounded-2xl border-2 border-dashed border-gold-500 bg-gold-300/20 p-5 text-sm text-navy-900">
      <p className="font-bold">⚠ Documento borrador — pendiente de revisión jurídica</p>
      <p className="mt-1 text-navy-900/80">
        Este texto es una plantilla de referencia generada a partir del brief del proyecto. Antes
        de publicar el sitio debe ser revisado y validado por el área jurídica de Travelium,
        conforme a la legislación aplicable (LFPDPPP y demás normativa vigente en México,
        especialmente por tratarse de datos de menores de edad).
      </p>
    </div>
  );
}
