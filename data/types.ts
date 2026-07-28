export type ItineraryDay = {
  day: string;
  title: string;
  description: string;
};

export type HotelRow = {
  country: string;
  city: string;
  hotel: string;
  type: string;
};

export type Suplemento = {
  label: string;
  amount: number;
};

export type Pricing = {
  doble: number;
  triple: number;
  sencilla: number;
  impuestos: number;
  suplementos: Suplemento[];
  moneda: "USD";
};

export type Trip = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  audience: "Con mamá" | "Grupo con chaperonas" | "Gran tour";
  duration: { days: number; nights: number };
  salidas: string[];
  countries: string[];
  cities: string[];
  /** Nombre de archivo (sin ruta) tal como está subido en el CDN de Bunny. */
  heroImage: string;
  /** Nombres de archivo de la galería, en el CDN de Bunny. */
  galleryImages: string[];
  summary: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  pricing: Pricing;
  hotels: HotelRow[];
  includes: string[];
  excludes: string[];
};
