/** Origen del sitio principal Slowork (legal, CTA, canonical de producción). */
export const MAIN_SLOWORK_ORIGIN = 'https://www.slowork.app';

/** Tras enviar la solicitud de creador, redirección al login del portal Slowork. */
export const CREATORS_PORTAL_LOGIN_URL = 'https://portal.slowork.app/login';

/**
 * YouTube video ID del hero de la landing creators.
 * Sobreescríbelo con `PUBLIC_CREATORS_HERO_YOUTUBE_ID` en las env vars del proyecto.
 */
export const CREATORS_HERO_YOUTUBE_ID = (() => {
  const raw =
    typeof import.meta.env.PUBLIC_CREATORS_HERO_YOUTUBE_ID === 'string'
      ? import.meta.env.PUBLIC_CREATORS_HERO_YOUTUBE_ID.trim()
      : '';
  return raw.length > 0 ? raw : 'myR9xwywQDs';
})();
