// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  /** Canonical y JSON-LD; ajusta si el sitio vive en otro dominio. */
  site: 'https://www.slowork.app',
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  integrations: [sitemap(), icon()],
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
