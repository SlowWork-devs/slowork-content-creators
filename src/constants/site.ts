/** Origen del sitio principal Slowork (legal, CTA, canonical de producción). */
export const MAIN_SLOWORK_ORIGIN = 'https://www.slowork.app';

/** ID del vídeo «Manifiesto Slowork» (variable `PUBLIC_MANIFIESTO_YOUTUBE_ID` en despliegue). */
export const manifestoYoutubeId =
  typeof import.meta.env.PUBLIC_MANIFIESTO_YOUTUBE_ID === 'string' &&
  import.meta.env.PUBLIC_MANIFIESTO_YOUTUBE_ID.length > 0
    ? import.meta.env.PUBLIC_MANIFIESTO_YOUTUBE_ID
    : 'M7lc1UVf-VE';
