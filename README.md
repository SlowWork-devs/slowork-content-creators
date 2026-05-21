# Slowork Content Creators (landing)

Sitio estático **bilingüe (ES/EN)** para el programa de creadores de contenido de Slowork. Está pensado como landing de conversión con copy en Markdown, SEO (meta, Open Graph, JSON-LD), accesibilidad y un stack moderno centrado en poco JavaScript en cliente.

## Stack

| Área | Tecnología |
|------|------------|
| Framework | [Astro](https://astro.build/) 6 |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) 4 + [DaisyUI](https://daisyui.com/) 5 |
| Contenido | Astro Content Layer (`src/content.config.ts`, colección `creators`) |
| Validación de frontmatter | Esquemas Zod en `src/models/` |

Salida de build: páginas de la landing **pre-renderizadas** + ruta serverless **`POST /api/creator-applications/`** (adapter Vercel, `output: 'server'`).

## Requisitos

- **Node.js** ≥ 22.12.0 (ver `package.json` → `engines`)

## Puesta en marcha

```bash
npm install && npm run dev
# o: corepack enable && pnpm install && pnpm dev
```

Por defecto el servidor de desarrollo suele estar en `http://localhost:4321`. Las rutas públicas de la landing son:

- `/es/creators/`: español (por defecto tras redirección desde `/`)
- `/en/creators/`: inglés

La raíz `/` redirige a `/es/creators/` (configuración en `astro.config.mjs` y `src/pages/index.astro`).

## Scripts

| Comando | Descripción |
|--------|-------------|
| `npm run dev` / `pnpm dev` | Servidor de desarrollo |
| `npm run build` / `pnpm build` | Genera el sitio en `./dist/` |
| `npm run preview` / `pnpm preview` | Previsualiza el build localmente |

## Estructura relevante

```text
slowork-content-creators/
├── public/                 # Fuentes, favicon, robots, imágenes OG estáticas…
├── src/
│   ├── content/
│   │   └── creators/       # Copy: en.md y es.md (frontmatter tipado)
│   ├── content.config.ts   # Definición de la colección + esquema
│   ├── models/             # Esquemas Zod (créditos, bloques, FAQ…)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro     # Redirección raíz
│   │   └── [lang]/
│   │       └── creators.astro
│   ├── components/         # Header, VideoFacade, FAQ, tabla de créditos, etc.
│   ├── constants/
│   └── styles/
│       └── global.css      # Tema DaisyUI + utilidades Tailwind
├── astro.config.mjs
└── package.json
```

Para editar textos y bloques de la página, el **origen de verdad** son los ficheros Markdown bajo `src/content/creators/`. La narrativa de producto puede documentarse aparte (p. ej. especificación v2 en `docs/` si existe en el repo).

**Importante:** el contenido de la colección debe cargarse con `getCollection` / `render` desde `astro:content`, no con `Astro.glob()` sobre esos MD (ver reglas del proyecto en `.cursor/rules/`).

## Configuración y entorno

- **`astro.config.mjs`**: `site` canónico (`https://www.slowork.app`), `trailingSlash: 'always'`, redirección `'/' → '/es/creators/'`, integración de sitemap.
- **`PUBLIC_OG_IMAGE`** (opcional): URL absoluta de imagen Open Graph. Si no se define, se usa la ruta por defecto configurada en el layout (p. ej. imagen bajo `public/images/`).
- **`PUBLIC_CREATORS_HERO_YOUTUBE_ID`** (opcional): ID del vídeo de YouTube para el hero (p. ej. `dQw4w9WgXcQ`). Se incrusta vía `youtube-nocookie.com` al pulsar play sobre el poster. Si no se define, el fallback está configurado en `src/constants/site.ts`.
- **`SLOWORK_API_URL`** (servidor, obligatoria en producción): URL base de `sloWorkApi` sin `/graphql`. El BFF reenvía las solicitudes de creadores a `${SLOWORK_API_URL}/api/creator-applications`.

## Despliegue

Despliega en **Vercel** (o compatible con `@astrojs/vercel`). Configura `SLOWORK_API_URL` en el proyecto. Ejecuta el SQL de `sloWorkApi/DBLanding/sql/creator_applications.sql` en la base de datos landing antes de recibir solicitudes.

## Documentación adicional

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
