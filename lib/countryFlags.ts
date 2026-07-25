// Bandera emoji por país. Se resuelve primero por código ISO2 (viene del
// JSON en vivo de Mega Travel: array_countries[].code_iata / array_cities[].
// country_code_iata) y, si no hay código disponible (datos estáticos de
// respaldo en data/trips.ts), por nombre en español.

export function flagFromIso2(iso2: string): string {
  const code = iso2.trim().toUpperCase();
  if (code.length !== 2) return "";
  const codePoints = [...code].map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...codePoints);
}

// Nombres tal como aparecen en los itinerarios (español, con y sin acentos)
// de los circuitos europeos que vende Travelium XV.
const COUNTRY_NAME_TO_ISO2: Record<string, string> = {
  "inglaterra": "gb",
  "reino unido": "gb",
  "escocia": "gb",
  "gales": "gb",
  "irlanda": "ie",
  "francia": "fr",
  "bélgica": "be",
  "belgica": "be",
  "holanda": "nl",
  "países bajos": "nl",
  "paises bajos": "nl",
  "luxemburgo": "lu",
  "alemania": "de",
  "suiza": "ch",
  "liechtenstein": "li",
  "austria": "at",
  "italia": "it",
  "vaticano": "va",
  "españa": "es",
  "espana": "es",
  "portugal": "pt",
  "hungría": "hu",
  "hungria": "hu",
  "república checa": "cz",
  "republica checa": "cz",
  "chequia": "cz",
  "eslovaquia": "sk",
  "eslovenia": "si",
  "croacia": "hr",
  "polonia": "pl",
  "dinamarca": "dk",
  "suecia": "se",
  "noruega": "no",
  "finlandia": "fi",
  "grecia": "gr",
  "turquía": "tr",
  "turquia": "tr",
  "mónaco": "mc",
  "monaco": "mc",
  "andorra": "ad",
  "mexico": "mx",
  "méxico": "mx",
};

export function flagFromCountryName(name: string): string {
  const key = name.trim().toLowerCase();
  const iso2 = COUNTRY_NAME_TO_ISO2[key];
  return iso2 ? flagFromIso2(iso2) : "";
}

/** Devuelve "🇫🇷 Francia" (o solo el nombre si no se reconoce el país). */
export function countryWithFlag(name: string, iso2?: string): string {
  const flag = iso2 ? flagFromIso2(iso2) : flagFromCountryName(name);
  return flag ? `${flag} ${name}` : name;
}
