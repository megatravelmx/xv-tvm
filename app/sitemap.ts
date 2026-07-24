import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { trips } from "@/data/trips";

// Sitemap dinámico: incluye las páginas fijas del sitio más una entrada por
// cada itinerario en data/trips.ts (se actualiza solo si se agregan viajes).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/viajes`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/comparador`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cotizador`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/planes-de-pago`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/seguridad`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/para-padres`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/para-quinceaneras`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/preguntas-frecuentes`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/terminos-y-condiciones`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/aviso-de-privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const tripRoutes: MetadataRoute.Sitemap = trips.map((t) => ({
    url: `${base}/viajes/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...tripRoutes];
}
