// Decodificador mínimo de entidades HTML (sin dependencias nuevas) para el
// contenido que llega de la API de Mega Travel (itinerario, incluye/no
// incluye, etc.), que viene con acentos en español codificados como
// entidades nombradas (&Iacute;, &oacute;, &ntilde;...).

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  iexcl: "¡",
  iquest: "¿",
  laquo: "«",
  raquo: "»",
  Aacute: "Á",
  aacute: "á",
  Eacute: "É",
  eacute: "é",
  Iacute: "Í",
  iacute: "í",
  Oacute: "Ó",
  oacute: "ó",
  Uacute: "Ú",
  uacute: "ú",
  Ntilde: "Ñ",
  ntilde: "ñ",
  Uuml: "Ü",
  uuml: "ü",
  Auml: "Ä",
  auml: "ä",
  Ouml: "Ö",
  ouml: "ö",
  szlig: "ß",
  ccedil: "ç",
  Ccedil: "Ç",
  agrave: "à",
  egrave: "è",
  ograve: "ò",
  ugrave: "ù",
};

export function decodeHtmlEntities(input: string): string {
  if (!input) return "";
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (match, name) => NAMED_ENTITIES[name] ?? match);
}

export function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function cleanText(input: string): string {
  return decodeHtmlEntities(stripTags(input))
    .replace(/\s+/g, " ")
    .trim();
}
