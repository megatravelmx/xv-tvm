# Travelium XV — Sitio de Viajes de Quinceañeras

Sitio de marketing y captación de leads para los viajes de quinceañeras de **Travelium**
(marca B2C, operada por un mayorista turístico — no se menciona públicamente en el sitio,
conforme a la instrucción del proyecto). Construido en **Next.js 14 (App Router) + TypeScript
+ Tailwind CSS**, listo para desplegarse en **Vercel**.

## Qué incluye esta primera versión (alcance elegido: Fase 1 + cotizador simulado)

- Home, catálogo de los 3 viajes, página de detalle por viaje (itinerario día a día, tarifas,
  hoteles, incluye/no incluye), comparador lado a lado.
- **Cotizador interactivo**: calcula un precio estimado con las tarifas reales publicadas en los
  itinerarios (habitación doble/triple/sencilla + impuestos + suplemento de fecha) × número de
  pasajeros. No está conectado a la API de Vendor — el resultado se etiqueta como "estimado" y el
  botón final abre WhatsApp con el resumen para que un ejecutivo confirme precio y disponibilidad
  reales.
- Secciones de confianza: seguridad y acompañamiento, planes de pago, información para padres,
  información para quinceañeras, preguntas frecuentes.
- Formulario de contacto que arma un mensaje de WhatsApp / correo prellenado (captura de lead sin
  backend/CRM todavía).
- Aviso de privacidad y Términos y condiciones — **borradores** marcados para revisión jurídica.
- Producto "Corea · K-pop para Quinceañeras" mostrado como tarjeta **"Próximamente"** en el
  catálogo (solo hay key art de marca, no hay itinerario ni tarifas todavía).

## Lo que NO incluye todavía (ver brief original)

Conforme al brief, la versión completa requiere backend, base de datos e integración con las
APIs de Mega Travel (catálogo) y Vendor (cotización/disponibilidad/pagos en tiempo real). Ese
backend no se construyó aquí porque requiere credenciales/documentación de esas APIs que no
están disponibles en este entorno. La estructura de datos (`data/trips.ts`, `data/types.ts`) está
lista para conectarse a esas fuentes cuando el equipo de tecnología lo indique.

## ⚠️ Importante: build no verificado en este entorno

Este proyecto se generó en un entorno sin acceso al registro de npm (network allowlist
bloqueada), por lo que **no fue posible ejecutar `npm install` ni `npm run build` para
verificarlo automáticamente aquí**. El código se escribió y se revisó cuidadosamente a mano
(balance de llaves/paréntesis/strings verificado con un script, imports y tipos revisados uno por
uno), pero se recomienda como primer paso:

```bash
npm install
npm run build
npm run dev   # para previsualizar en http://localhost:3000
```

o simplemente subir el proyecto a GitHub y conectarlo a Vercel — Vercel instalará dependencias y
compilará con su propio acceso a internet.

## Placeholders que debes sustituir antes de publicar

### Imágenes
Los **2 key art oficiales de Travelium** (Europa y Corea) sí están integrados en
`public/images/brand/`. Para todo lo demás (fotos de cada destino, galería de cada viaje,
fotos "para quinceañeras", avatares de testimonios) se usaron **fotografías de stock temporales**
(servicio Lorem Picsum) con una etiqueta visible tipo *"📷 Imagen temporal — sustituir por: ..."*
superpuesta, tal como se acordó. Búscalas por el componente `<PlaceholderImage />` — cada una
indica exactamente qué foto real debe ir ahí. **No se usaron las fotos de los PDFs de itinerario
porque son material de Mega Travel, no de Travelium.**

### Datos de contacto (`data/site.ts`)
- `whatsappNumber` — número real en formato `521XXXXXXXXXX`
- `contactEmail`, `phone`, `officeHours`
- `instagram`, `tiktok`

### Testimonios (`data/site.ts` → `testimonialsPlaceholder`)
Son ejemplos marcados claramente como placeholder. Sustituir por comentarios reales de familias
con su autorización de uso.

### Legal
`app/aviso-de-privacidad` y `app/terminos-y-condiciones` son borradores de referencia — deben
revisarse con el área jurídica antes de publicarse (política de cancelación, razón social,
domicilio fiscal, etc.).

## Estructura del proyecto

```
app/                    Rutas (App Router)
  page.tsx               Home
  viajes/                Catálogo + detalle por viaje ([slug])
  comparador/             Comparador de los 3 viajes
  cotizador/               Cotizador interactivo
  planes-de-pago/          Planes de pago
  seguridad/                Seguridad y acompañamiento
  para-padres/                Info para padres + FAQ
  para-quinceaneras/           Info para quinceañeras
  preguntas-frecuentes/          FAQ completo
  contacto/                       Formulario de contacto
  aviso-de-privacidad/             Legal (borrador)
  terminos-y-condiciones/           Legal (borrador)
components/             Componentes de UI reutilizables
data/                   Contenido: itinerarios, precios, FAQ, config del sitio
public/images/brand/    Key art oficial de Travelium (Europa, Corea)
```

## Próximos pasos sugeridos

1. `npm install && npm run build` para confirmar que compila en tu máquina/CI.
2. Sustituir placeholders de imágenes, contacto y testimonios listados arriba.
3. Revisión jurídica de aviso de privacidad y términos y condiciones.
4. Conectar el formulario de contacto y el cotizador a un CRM/backend real (o Fase 2 con API de
   Vendor) en lugar de solo abrir WhatsApp/correo.
5. Definir contenido para el producto "Corea" cuando exista itinerario y tarifas.
