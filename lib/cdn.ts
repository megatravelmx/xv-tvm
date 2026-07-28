// Helper para construir URLs de imágenes servidas desde el Pull Zone de
// BunnyCDN (https://travelium.b-cdn.net/xv/). En el CDN todas las imágenes
// viven en un único directorio plano (sin subcarpetas), a diferencia de la
// carpeta local "images-sitio-web" que sí las organiza en subcarpetas.
//
// Además de armar la URL, se apoya en Bunny Optimizer (parámetros de query)
// para pedir la versión ya redimensionada, comprimida y en formato moderno
// (WebP) más conveniente para cada uso — así el navegador nunca descarga la
// foto a full resolución cuando solo necesita, por ejemplo, un thumbnail.
//
// Nota: `format=webp` solo generará WebP si el Pull Zone tiene "WebP"
// habilitado en Optimizer → Settings. Si no está activado, Bunny sirve el
// formato original ignorando el parámetro (no rompe nada).
// Docs: https://docs.bunny.net/optimizer/dynamic-images/overview

const CDN_BASE = "https://travelium.b-cdn.net/xv/";

export type CdnImageOptions = {
  /** Ancho objetivo en px (mantiene aspect ratio si no se define height). */
  width?: number;
  /** Alto objetivo en px. */
  height?: number;
  /** Calidad de compresión 0–100. Default 80: buen balance peso/nitidez. */
  quality?: number;
  /** Formato de salida. Default "webp" (25–35% más liviano que JPEG). */
  format?: "webp" | "jpeg" | "png" | "avif";
};

/**
 * Construye la URL final de una imagen en el CDN de Travelium a partir del
 * nombre de archivo (tal cual está subido en Bunny, sin subcarpetas).
 */
export function cdnImage(filename: string, options: CdnImageOptions = {}): string {
  const { width, height, quality = 80, format = "webp" } = options;
  const params = new URLSearchParams();
  if (width) params.set("width", String(width));
  if (height) params.set("height", String(height));
  params.set("quality", String(quality));
  params.set("format", format);

  // Los archivos en Bunny se subieron desde macOS Finder, que normaliza los
  // nombres con acentos/ñ a Unicode NFD (p. ej. "á" = "a" + acento
  // combinante, en vez del único carácter "á" en NFC). Si el nombre llega
  // aquí en NFC (p. ej. tecleado directo en el código), la URL generada no
  // coincide byte a byte con el archivo real y Bunny responde 404. Normalizar
  // siempre a NFD antes de codificar evita ese desajuste sin depender de
  // cómo se haya escrito el string en el código fuente.
  const normalized = filename.normalize("NFD");

  return `${CDN_BASE}${encodeURIComponent(normalized)}?${params.toString()}`;
}
