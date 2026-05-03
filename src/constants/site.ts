/** Origen del sitio principal Slowork (legal, CTA, canonical de producción). */
export const MAIN_SLOWORK_ORIGIN = 'https://www.slowork.app';

const defaultHeroVideoPath = '/videos/creators-hero.mp4';

/**
 * Ruta pública del MP4 del hero (fichero bajo `public/`, p. ej. `public/videos/creators-hero.mp4`).
 * `PUBLIC_CREATORS_HERO_VIDEO` sobreescribe; si no está definida, se usa la ruta por defecto del repo.
 */
export const creatorsHeroVideoSrc = (() => {
  const raw =
    typeof import.meta.env.PUBLIC_CREATORS_HERO_VIDEO === 'string'
      ? import.meta.env.PUBLIC_CREATORS_HERO_VIDEO.trim()
      : '';
  return raw.length > 0 ? raw : defaultHeroVideoPath;
})();

/**
 * WebM opcional (VP9) para el mismo hero; el navegador elige frente al MP4.
 * El MP4 (`creatorsHeroVideoSrc`) sigue siendo la base para Safari / iOS.
 */
export const creatorsHeroVideoWebmSrc =
  typeof import.meta.env.PUBLIC_CREATORS_HERO_VIDEO_WEBM === 'string' &&
  import.meta.env.PUBLIC_CREATORS_HERO_VIDEO_WEBM.trim().length > 0
    ? import.meta.env.PUBLIC_CREATORS_HERO_VIDEO_WEBM.trim()
    : null;
