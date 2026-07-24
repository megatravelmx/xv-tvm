import { IconFileText } from "@/components/icons";

// Aviso discreto e informativo (no promocional) sobre el trámite oficial del
// INM para menores que viajan sin ambos padres o con un tercero mayor de
// edad. Vive antes del footer en todas las páginas.
export default function SamNotice() {
  return (
    <div className="border-t border-rose-100 bg-blush">
      <div className="container-page flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <IconFileText className="h-4 w-4" />
        </div>
        <div className="text-xs text-navy-900/60 sm:text-sm">
          <p className="font-semibold text-navy-900/80">
            Trámite para menores que viajan sin sus padres o con un tercero mayor de edad
          </p>
          <p className="mt-1">
            ¿Tu hija viaja al extranjero sin ti o en compañía de un tercero mayor de edad?{" "}
            <a
              href="https://www.inm.gob.mx/menores/publico/solicitud.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose-600 underline underline-offset-2 hover:text-rose-700"
            >
              Llena el Formato de Autorización de Salida del Territorio Nacional (SAM) del INM
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
