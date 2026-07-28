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

// Datos de la preventa oficial 2027 (fuente: área de producto). Los precios
// que ya están cargados en cada viaje (data/trips.ts) corresponden a esta
// tarifa de preventa; regularPricing es solo para mostrar el "antes/después"
// una vez que expire, el 15 de agosto de 2026.
export const preventa = {
  vigente: true,
  fechaLimite: "15 de agosto de 2026",
  fechaLimiteISO: "2026-08-15",
  regularPricing: {
    "26": { doble: 7199, impuestos: 999, suplemento: 599 },
    "18": { doble: 5699, impuestos: 999, suplemento: 499 },
  },
};

export const parentFaqs = [
  {
    q: "¿Quién acompaña a mi hija durante el viaje?",
    a: "Cada grupo viaja con un guía acompañante profesional de habla hispana durante todo el recorrido. En los circuitos grupales (Quinceañeras a Europa y Quinceañeras a Europa II) se suman 3 chaperonas especializadas en grupos de menores, cada una a cargo de aproximadamente 14 viajeras. En 'Descubre Europa con Mamá', la propia mamá viaja como acompañante y un tour líder coordina la logística del recorrido.",
  },
  {
    q: "¿Qué experiencia tiene la empresa operando grupos de quinceañeras?",
    a: "Travelium tiene años de trayectoria organizando viajes internacionales para grupos de quinceañeras, con coordinación logística propia en cada ciudad y protocolos de seguridad definidos antes, durante y después del viaje.",
  },
  {
    q: "¿Qué incluye exactamente el precio del paquete?",
    a: "Vuelo redondo desde Ciudad de México, hospedaje, media pensión (desayuno y cena), transporte en autocar turístico, seguro de asistencia médica, guía de habla hispana, kit de viaje (backpack, playeras y sudadera de uso obligatorio), eSIM con 12 GB de datos y las entradas/visitas indicadas en cada itinerario. Cada página de viaje detalla el 'incluye' y 'no incluye' completo.",
  },
  {
    q: "¿Cuánto debo pagar para apartar el lugar de mi hija?",
    a: "El apartado es de $600 USD por pasajera(o), no reembolsable en cancelaciones con más de 151 días de anticipación a la salida. 150 días antes de la salida se realiza un segundo pago de $2,000 USD (acumulando $2,600 USD), y 90 días antes se liquida el total del viaje.",
  },
  {
    q: "¿Puedo realizar pagos mensuales?",
    a: "Sí. Puedes abonar a tu ritmo entre el apartado y la fecha del segundo pago (150 días antes de la salida) y entre ese pago y la liquidación total (90 días antes). Un ejecutivo te comparte el calendario específico según el viaje elegido.",
  },
  {
    q: "¿Qué sucede en caso de una emergencia durante el viaje?",
    a: "Todos los paquetes incluyen seguro de asistencia médica con consultas virtuales y una red de hospitales locales en destino, guía acompañante y, en los circuitos grupales, chaperonas con experiencia en el manejo de grupos de menores y contacto directo con la familia a través de nuestro canal de asistencia 24/7.",
  },
  {
    q: "¿Cómo podré comunicarme con mi hija durante el recorrido?",
    a: "El paquete incluye una eSIM con 12 GB de datos (requiere teléfono desbloqueado compatible), que permite comunicarse por WhatsApp durante todo el recorrido — no funciona como línea telefónica tradicional. En los circuitos grupales, además, las familias tienen acceso a un grupo privado de Facebook con fotos y actualizaciones del viaje (este grupo no aplica para 'Descubre Europa con Mamá', ya que mamá viaja con su hija).",
  },
  {
    q: "¿Qué documentos necesita mi hija para viajar?",
    a: "Pasaporte con vigencia mínima de 6 meses respecto a la fecha de regreso y, si la menor no viaja con madre o tutor legal, el Formato SAM del INM y una carta notarial que autorice a las chaperonas a representarla en el extranjero. También se requiere el trámite ETA para entrar a Reino Unido. El día del vuelo tu hija solo necesita presentar su pasaporte: el resto de la documentación la lleva el equipo Travelium.",
  },
  {
    q: "¿Cuánto dinero debe llevar mi hija para gastos personales?",
    a: "Para almuerzos, bebidas y gastos menores recomendamos un presupuesto de 45 a 50 euros por día (aprox. 900 euros para el viaje de 18 días y 1,300 euros para el de 26 días), sin contar compras personales. Sugerimos dividirlo entre efectivo, una tarjeta para uso diario y una segunda tarjeta de respaldo que puede quedar a resguardo de la chaperona.",
  },
  {
    q: "¿Qué equipaje puede llevar mi hija?",
    a: "Una maleta documentada con peso máximo de 23 kg y la backpack de Travelium (máximo 10 kg) como equipaje de mano — no se permite maleta de carry-on adicional, ya que cada viajera es responsable de cargar y cuidar su propio equipaje durante todo el recorrido.",
  },
  {
    q: "¿Qué moneda se usa durante el viaje?",
    a: "La moneda principal es el euro, utilizado en prácticamente todo el recorrido. En Londres se usa la libra esterlina: recomendamos pagar con tarjeta y llevar solo un monto limitado en efectivo, ya que muchos establecimientos ahí solo aceptan tarjeta.",
  },
  {
    q: "¿El viaje es solo para mujeres?",
    a: "Es un programa pensado principalmente para quinceañeras, con un cupo limitado a 4 acompañantes varones por grupo (13 a 15 años). Consulta con tu ejecutivo la disponibilidad vigente para el grupo que te interesa.",
  },
  {
    q: "¿Qué sucede si el viaje se cancela?",
    a: "Aplican cargos por cancelación según la anticipación: sin cargo con más de 151 días antes de la salida (solo para reservas individuales), $600 USD entre 150 y 91 días, $2,600 USD entre 90 y 70 días, y el 100% del valor del viaje dentro de los 69 días previos a la salida.",
  },
  {
    q: "¿Qué ocurre si mi hija no obtiene una visa?",
    a: "Un ejecutivo revisa contigo los requisitos migratorios aplicables antes de confirmar la reservación para anticipar cualquier trámite necesario según nacionalidad y destino.",
  },
];

// NOTA INTERNA (no visible en el sitio): estos 3 testimonios son copy
// ilustrativo escrito por el equipo mientras llegan los comentarios reales
// de familias Travelium. Nombres abreviados a propósito (sin apellido) para
// no aparentar identificar a una persona real. Sustituir por testimonios
// verificados en cuanto estén disponibles — avisar a Luis cuando se reemplacen.
export const testimonialsPlaceholder = [
  {
    name: "Karla M., mamá de Regina",
    trip: "Descubre Europa con Mamá",
    quote:
      "Viajar solas mi hija y yo por sus XV fue el mejor regalo que nos pudimos dar. Cada ciudad, cada cena, cada risa juntas... vivimos algo que no se nos va a olvidar nunca. Travelium se encargó de todo, nosotras solo disfrutamos.",
    avatarImage: "testimonio-01.jpg",
  },
  {
    name: "Fernanda L., quinceañera",
    trip: "Quinceañeras a Europa",
    quote:
      "26 días, 12 países y la mejor compañía. Desde los canales de Ámsterdam hasta Barcelona todo fue increíble, y la noche de gala en el palacio en Florencia se sintió como salir de un cuento. Lo recomiendo con los ojos cerrados.",
    avatarImage: "testimonio-02.jpg",
  },
  {
    name: "Valeria S., mamá de Camila",
    trip: "Quinceañeras a Europa II",
    quote:
      "Mi hija viajó con sus amigas y yo estuve tranquila todo el tiempo: las chaperonas estuvieron al pendiente en cada momento. Fue la manera perfecta de celebrar sus XV sin que ella dejara de sentirse libre con su grupo.",
    avatarImage: "testimonio-03.jpg",
  },
];
