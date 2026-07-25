// ---------------------------------------------------------------------------
// Configuración general del sitio. Datos de contacto confirmados por Luis.
// ---------------------------------------------------------------------------

export const siteConfig = {
  brand: "Travelium XV",
  siteUrl: "https://www.viajesparaquinceaneras.com.mx",
  logoUrl: "https://travelium.b-cdn.net/brand/logo/logo-travelium-2026.svg",
  heroParisOutlineUrl: "https://travelium.b-cdn.net/xv/paris-sin-fondo.webp",
  heroQuinceaneraUrl: "https://travelium.b-cdn.net/xv/quinceanera-con-tenis.webp",
  legalDisclaimer:
    "Travelium diseña y organiza viajes de quinceañeras a Europa, con años de experiencia coordinando grupos internacionales y acompañando a las familias en cada destino.",
  whatsappNumber: "525597532020",
  contactEmail: "hola@travelium.mx",
  phone: "+52 55 9753 2020",
  instagram: "https://www.instagram.com/travel_ium/",
  tiktok: "https://www.tiktok.com/@travel_ium",
  facebook: "https://www.facebook.com/traveliumMX",
  officeHours: "Lunes a viernes 9:00–19:00, sábados 10:00–14:00 (hora CDMX)",
  address: {
    line: "Río Misisipi 49, Piso 8, Col. Cuauhtémoc",
    city: "Ciudad de México",
    region: "CDMX",
    country: "México",
    lat: 19.4275806,
    lng: -99.1731639,
    // Link corto real de Google Maps a las oficinas (el que compartió Luis).
    mapsUrl: "https://maps.app.goo.gl/fPoMDCQLrBMoXYms8",
  },
};

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export const parentFaqs = [
  {
    q: "¿Quién acompaña a mi hija durante el viaje?",
    a: "Cada grupo viaja con un guía acompañante profesional de habla hispana durante todo el recorrido, además de chaperonas con experiencia específica en grupos de menores en los circuitos grupales. En 'Descubre Europa con Mamá', la propia mamá viaja como acompañante.",
  },
  {
    q: "¿Qué experiencia tiene la empresa operando grupos de quinceañeras?",
    a: "Travelium tiene años de trayectoria organizando viajes internacionales para grupos de quinceañeras, con coordinación logística propia en cada ciudad y protocolos de seguridad definidos antes, durante y después del viaje.",
  },
  {
    q: "¿Qué incluye exactamente el precio del paquete?",
    a: "Vuelos internacionales, hospedaje, alimentación en media pensión (desayuno y cena), transporte en autocar turístico, seguro de asistencia, guía de habla hispana y las entradas/visitas indicadas en cada itinerario. Cada página de viaje detalla el 'incluye' y 'no incluye' completo.",
  },
  {
    q: "¿Cuánto debo pagar para apartar el lugar de mi hija?",
    a: "El monto de apartado y el calendario de abonos se confirman con un ejecutivo al momento de cotizar, de acuerdo con la fecha de salida y disponibilidad vigente.",
  },
  {
    q: "¿Puedo realizar pagos mensuales?",
    a: "Sí. Ofrecemos planes de abonos hasta la fecha límite de liquidación antes de la salida. Un ejecutivo te comparte el calendario específico según el viaje elegido.",
  },
  {
    q: "¿Qué sucede en caso de una emergencia durante el viaje?",
    a: "Todos los paquetes incluyen seguro de asistencia en viaje, guía acompañante y, en los circuitos grupales, chaperonas con experiencia en el manejo de grupos de menores y contacto directo con la familia.",
  },
  {
    q: "¿Cómo podré comunicarme con mi hija durante el recorrido?",
    a: "El paquete incluye eSIM para mantener conexión a internet (requiere un teléfono desbloqueado y compatible). El tour leader y las chaperonas mantienen comunicación constante con las familias ante cualquier eventualidad.",
  },
  {
    q: "¿Qué documentos necesita mi hija para viajar?",
    a: "Pasaporte vigente y, si la menor no viaja con madre o tutor legal, el Formato SAM del INM. Algunos destinos pueden requerir trámites adicionales (por ejemplo, ETA para Reino Unido), detallados en cada itinerario.",
  },
  {
    q: "¿Qué sucede si el viaje se cancela?",
    a: "Las políticas de cancelación se informan de forma clara antes de confirmar el apartado, junto con condiciones de compra y reembolsos, conforme a los términos y condiciones vigentes.",
  },
  {
    q: "¿Qué ocurre si mi hija no obtiene una visa?",
    a: "Un ejecutivo revisa contigo los requisitos migratorios aplicables antes de confirmar la reservación para anticipar cualquier trámite necesario según nacionalidad y destino.",
  },
];

export const testimonialsPlaceholder = [
  {
    name: "[Testimonio de ejemplo — sustituir]",
    trip: "Descubre Europa con Mamá",
    quote:
      "Este es un testimonio de ejemplo para mostrar el formato de la sección. Debe sustituirse por comentarios reales de familias Travelium, idealmente con foto y autorización de uso.",
    avatarSeed: "placeholder-avatar-1",
  },
  {
    name: "[Testimonio de ejemplo — sustituir]",
    trip: "Quinceañeras a Europa",
    quote:
      "Este es un testimonio de ejemplo para mostrar el formato de la sección. Debe sustituirse por comentarios reales de familias Travelium, idealmente con foto y autorización de uso.",
    avatarSeed: "placeholder-avatar-2",
  },
  {
    name: "[Testimonio de ejemplo — sustituir]",
    trip: "Quinceañeras a Europa II",
    quote:
      "Este es un testimonio de ejemplo para mostrar el formato de la sección. Debe sustituirse por comentarios reales de familias Travelium, idealmente con foto y autorización de uso.",
    avatarSeed: "placeholder-avatar-3",
  },
];
