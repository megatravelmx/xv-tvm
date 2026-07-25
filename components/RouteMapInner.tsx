"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { flagFromIso2 } from "@/lib/countryFlags";

export type RouteStop = {
  name: string;
  lat: number;
  lng: number;
  iso2: string;
};

// Marcador circular numerado hecho con un divIcon (HTML + Tailwind), en vez
// de los iconos default de Leaflet, para poder usar los colores y la
// tipografía de la marca sin pelear con el empaquetado de imágenes de
// Leaflet en Next.js.
function stopIcon(label: string, variant: "start" | "end" | "mid") {
  const bg =
    variant === "start"
      ? "background:#10B981;"
      : variant === "end"
        ? "background:#E2377C;"
        : "background:linear-gradient(135deg,#0C5CFF,#7749BD);";
  const html = `
    <div style="${bg} width:28px;height:28px;border-radius:9999px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:sans-serif;font-weight:700;font-size:11px;box-shadow:0 2px 8px rgba(6,11,36,0.35);border:2px solid #fff;">
      ${label}
    </div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

// Helpers cross-browser mínimos para la Fullscreen API (Safari viejo todavía
// usa los métodos con prefijo webkit).
type FullscreenDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
};
type FullscreenEl = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
};

function getFullscreenElement(): Element | null {
  const d = document as FullscreenDoc;
  return document.fullscreenElement ?? d.webkitFullscreenElement ?? null;
}

function requestFullscreen(el: HTMLElement) {
  const e = el as FullscreenEl;
  if (el.requestFullscreen) return el.requestFullscreen();
  if (e.webkitRequestFullscreen) return e.webkitRequestFullscreen();
}

function exitFullscreen() {
  const d = document as FullscreenDoc;
  if (document.exitFullscreen) return document.exitFullscreen();
  if (d.webkitExitFullscreen) return d.webkitExitFullscreen();
}

export default function RouteMapInner({ stops }: { stops: RouteStop[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const active = getFullscreenElement() === wrapperRef.current;
      setIsFullscreen(active);
      // Leaflet necesita recalcular tamaño cuando el contenedor cambia de
      // dimensiones fuera de su propio control de resize.
      window.setTimeout(() => mapRef.current?.invalidateSize(), 150);
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  if (stops.length === 0) return null;

  const points: [number, number][] = stops.map((s) => [s.lat, s.lng]);
  const bounds = L.latLngBounds(points);

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (getFullscreenElement()) {
      exitFullscreen();
    } else {
      requestFullscreen(wrapperRef.current);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={
        isFullscreen
          ? "fixed inset-0 z-[9999] h-screen w-screen overflow-hidden bg-white"
          : "relative overflow-hidden rounded-3xl border border-rose-100 shadow-sm"
      }
    >
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? "Salir de pantalla completa" : "Ver mapa en pantalla completa"}
        title={isFullscreen ? "Salir de pantalla completa" : "Ver mapa en pantalla completa"}
        className="absolute right-3 top-3 z-[1000] flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy-950 shadow-md transition hover:bg-rose-100"
      >
        {isFullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
          </svg>
        )}
      </button>
      <MapContainer
        ref={mapRef}
        bounds={bounds}
        boundsOptions={{ padding: [32, 32] }}
        scrollWheelZoom={false}
        style={{ height: isFullscreen ? "100%" : "420px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Polyline positions={points} pathOptions={{ color: "#0C5CFF", weight: 3, opacity: 0.85 }} />
        {stops.map((s, i) => (
          <Marker
            key={`${s.name}-${i}`}
            position={[s.lat, s.lng]}
            icon={stopIcon(String(i + 1), i === 0 ? "start" : i === stops.length - 1 ? "end" : "mid")}
          >
            <Popup>
              <span className="font-semibold">
                {flagFromIso2(s.iso2)} {s.name}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
