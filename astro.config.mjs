// @ts-check
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  /** Canonical y JSON-LD; ajusta si el sitio vive en otro dominio. */
  site: 'https://www.slowork.app',
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  integrations: [sitemap()],
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
