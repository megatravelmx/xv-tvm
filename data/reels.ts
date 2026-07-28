// Reels/videos alojados en el mismo directorio plano de BunnyCDN que las
// imágenes (https://travelium.b-cdn.net/xv/). Se usan en la sección de
// "Stories" del home (círculos que abren el video en pantalla completa).
export type Reel = {
  id: string;
  title: string;
  /** Nombre de archivo tal cual está subido en Bunny (sin ruta). */
  file: string;
};

export const reels: Reel[] = [
  {
    id: "preventa",
    title: "Preventa 2027",
    file: "Preventa quinceañeras - programas en general - 2027.mp4",
  },
  {
    id: "eurotrip",
    title: "Así es el viaje",
    file: "info-eurotrip-quinceañeras.mp4",
  },
  {
    id: "qa",
    title: "Preguntas y respuestas",
    file: "Q&A Quinceañeras.mp4",
  },
];
