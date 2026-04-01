// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  /** Canonical y JSON-LD; ajusta si el sitio vive en otro dominio. */
  site: 'https://www.slowork.app',
  trailingSlash: 'always',
  /** La home estática emite HTML de redirección; en muchos hosts también puedes duplicar la regla. */
  redirects: {
    '/': '/es/creators/',
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@tailwindcss/vite'],
    },
  },
});
