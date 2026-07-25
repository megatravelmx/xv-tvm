import { decodeHtmlEntities, cleanText } from "./htmlEntities";
import type { ItineraryDay, HotelRow, Pricing, Suplemento } from "@/data/types";

// ---------------------------------------------------------------------------
// Fuente de datos "siempre actualizada" que provee la operación (Mega Travel)
// vía JSON público. Importante: esto es una integración de datos por detrás
// — nunca se debe exponer/enlazar la marca Mega Travel en el sitio público.
// Por eso aquí solo se leen campos de contenido (itinerario, incluye, hoteles,
// precios, ciudades) y se descartan explícitamente los campos que mencionan
// o enlazan a Mega Travel (canonical, operator, contratos, formas de pago,
// payment_bank, etc.) — ver `PICK_FIELDS` más abajo.
// ---------------------------------------------------------------------------

const TC_URL = "https://mt-data.b-cdn.net/json/tc/tc.json";
const PROGRAM_URL = (mt: string) => `https://mt-data.b-cdn.net/json/mts/${mt}.json`;

// slug interno del sitio -> ID de programa (MT) en la API de Mega Travel.
export const MT_ID_BY_SLUG: Record<string, string> = {
  "descubre-europa-con-mama": "12518",
  "quinceaneras-a-europa": "12115",
  "quinceaneras-a-europa-2": "12118",
};

export type TipoCambio = {
  tc: number;
  info: string;
  generatedAt: string;
};

type MtCityGeo = {
  name: string;
  // OJO: en el feed de Mega Travel estas dos llaves vienen invertidas
  // (el valor de "longitude" es en realidad la latitud y viceversa). Se
  // corrige en mapCitiesGeo(). Si Mega Travel corrige el feed algún día,
  // ajustar ahí.
  longitude: string;
  latitude: string;
  country_code_iata: string;
};

type MtRoomRate = {
  code: string;
  name: string;
  price: number;
  taxes?: { air?: { adt?: string; inf?: string; mnr?: string } };
};

type MtPriceJson = {
  days: number;
  rate: {
    rooms: { dbl?: MtRoomRate; tpl?: MtRoomRate; sgl?: MtRoomRate };
    suplements: { name: string; price: string }[];
  };
  departured_at: string;
  returned_at: string;
};

type MtHotelJson = {
  city: string;
  name: string;
  type: string;
  stars?: number;
  address?: string;
  country: string;
};

type MtCountry = {
  name_country: string;
  code_iata: string;
};

type MtAirline = {
  name: string;
  code: string;
  img?: string;
};

type MtDeparture = {
  date: string;
};

export type MtProgram = {
  mt: string;
  name: string;
  days: number;
  nights: number;
  price_from: number;
  taxes: number;
  currency: string;
  generated_at: string;
  countries: string[];
  cities: string[];
  array_countries: MtCountry[];
  array_cities: MtCityGeo[];
  airlines: MtAirline[];
  departures: MtDeparture[];
  itinerary: string;
  include: string;
  not_include: string;
  hotels_json: MtHotelJson[];
  price_json: MtPriceJson[];
};

async function safeFetchJson<T>(url: string, revalidateSeconds: number): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: revalidateSeconds } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchTipoCambio(): Promise<TipoCambio | null> {
  const data = await safeFetchJson<{ tc: string; info: string; generated_at: string }>(TC_URL, 3600);
  if (!data?.tc) return null;
  const tc = Number(data.tc);
  if (!Number.isFinite(tc) || tc <= 0) return null;
  return { tc, info: data.info, generatedAt: data.generated_at };
}

export async function fetchProgram(mt: string): Promise<MtProgram | null> {
  const data = await safeFetchJson<{ collectionTravel: MtProgram }>(PROGRAM_URL(mt), 3600);
  return data?.collectionTravel ?? null;
}

/** Corrige el swap de lat/lng del feed y agrega la bandera-friendly ISO2. */
export function mapCitiesGeo(cities: MtCityGeo[]): { name: string; lat: number; lng: number; iso2: string }[] {
  return cities
    .map((c) => ({
      name: c.name,
      lat: Number(c.longitude),
      lng: Number(c.latitude),
      iso2: c.country_code_iata,
    }))
    .filter((c) => Number.isFinite(c.lat) && Number.isFinite(c.lng));
}

// Solo se ancla al marcador "<strong>DÍA N | título</strong>", no a que cada
// día empiece en su propio <p> — el HTML de Mega Travel a veces mete el
// marcador del día siguiente dentro del mismo <p> del día anterior (falta
// un </p><p> entre ellos), así que anclarse al <p> pierde días completos.
const DAY_MARKER_RE = /<strong>\s*D[ÍI]A\s*(\d+)\s*\|([\s\S]*?)<\/strong>/gi;

/** Convierte el bloque HTML plano de itinerario en los días estructurados
 * que usa <ItineraryTimeline>. Si el patrón no matchea (formato distinto),
 * regresa un arreglo vacío para que el caller haga fallback a datos estáticos. */
export function parseItineraryDays(html: string): ItineraryDay[] {
  const decoded = decodeHtmlEntities(html);
  const markers: { num: string; title: string; start: number; end: number }[] = [];
  let match: RegExpExecArray | null;
  DAY_MARKER_RE.lastIndex = 0;
  while ((match = DAY_MARKER_RE.exec(decoded)) !== null) {
    markers.push({
      num: match[1],
      title: cleanText(match[2]),
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return markers.map((m, i) => {
    const next = markers[i + 1];
    const rawDescription = decoded
      .slice(m.end, next ? next.start : undefined)
      .replace(/<\/?p>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ");
    return {
      day: `Día ${m.num}`,
      title: m.title,
      description: cleanText(rawDescription),
    };
  });
}

/** Extrae los <li> de un <ul> de incluye/no incluye en texto plano. */
export function parseListItems(html: string): string[] {
  const decoded = decodeHtmlEntities(html);
  const items: string[] = [];
  const re = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(decoded)) !== null) {
    const text = cleanText(match[1]);
    if (text) items.push(text);
  }
  return items;
}

export function mapHotels(hotels: MtHotelJson[]): HotelRow[] {
  return hotels.map((h) => ({
    country: h.country,
    city: cleanText(h.city),
    hotel: cleanText(h.name),
    type: h.type,
  }));
}

export function mapPricing(priceEntry: MtPriceJson | undefined, taxes: number): Pricing | null {
  if (!priceEntry) return null;
  const { dbl, tpl, sgl } = priceEntry.rate.rooms;
  if (!dbl || !tpl || !sgl) return null;
  const suplementos: Suplemento[] = (priceEntry.rate.suplements ?? []).map((s) => ({
    label: s.name.replace(/^SUP\s*/i, "Suplemento "),
    amount: Number(s.price) || 0,
  }));
  return {
    doble: dbl.price,
    triple: tpl.price,
    sencilla: sgl.price,
    impuestos: taxes,
    suplementos,
    moneda: "USD",
  };
}
