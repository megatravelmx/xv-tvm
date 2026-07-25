"use client";

import dynamic from "next/dynamic";
import type { RouteStop } from "./RouteMapInner";

// Leaflet necesita `window`, así que el mapa real se carga solo en el
// navegador (ssr: false). Esto requiere un wrapper cliente separado porque
// Next.js no permite ssr:false dentro de un Server Component.
const RouteMapInner = dynamic(() => import("./RouteMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-3xl border border-rose-100 bg-rose-50 text-sm text-navy-900/50">
      Cargando mapa del recorrido…
    </div>
  ),
});

export default function RouteMap({ stops }: { stops: RouteStop[] }) {
  return <RouteMapInner stops={stops} />;
}
