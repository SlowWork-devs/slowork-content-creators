# SloWork Content Creators — Landing

Sitio estático **bilingüe (ES/EN)** para el programa de creadores de contenido de SloWork. Está pensado como landing de conversión con copy en Markdown, SEO (meta, Open Graph, JSON-LD), accesibilidad y un stack moderno centrado en poco JavaScript en cliente.

## Stack

| Área | Tecnología |
|------|------------|
| Framework | [Astro](https://astro.build/) 6 |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) 4 + [DaisyUI](https://daisyui.com/) 5 |
| Contenido | Astro Content Layer (`src/content.config.ts`, colección `creators`) |
| Validación de frontmatter | Esquemas Zod en `src/models/` |

Salida de build: **HTML estático** en `dist/` (ideal para CDN o hosting estático).

## Requisitos

- **Node.js** ≥ 22.12.0 (ver `package.json` → `engines`)

## Puesta en marcha

```bash
npm install
npm run dev
```

Por defecto el servidor de desarrollo suele estar en `http://localhost:4321`. Las rutas públicas de la landing son:

- `/es/creators/` — español (por defecto tras redirección desde `/`)
- `/en/creators/` — inglés

La raíz `/` redirige a `/es/creators/` (configuración en `astro.config.mjs` y `src/pages/index.astro`).

## Scripts

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el sitio en `./dist/` |
| `npm run preview` | Previsualiza el build localmente |

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
- **`PUBLIC_CREATORS_HERO_VIDEO`** (opcional): ruta **pública** del MP4 del hero (p. ej. `/videos/creators-hero.mp4`). Si no se define, se usa por defecto `/videos/creators-hero.mp4`. El hero usa `<video>` nativo con fachada (no se descarga el vídeo hasta que el usuario pulse play). Coloca el fichero bajo `public/` y convierte el master a **MP4 H.264 + AAC**; ver `public/videos/README.md`.
- **`PUBLIC_CREATORS_HERO_VIDEO_WEBM`** (opcional): WebM VP9 del **mismo** vídeo (p. ej. `/videos/creators-hero.webm`). Navegadores compatibles suelen preferirlo al MP4; Safari sigue usando el MP4.

## Despliegue

Tras `npm run build`, publicar el contenido de **`dist/`** en tu hosting estático o CDN. Asegura que las reglas de redirección del host sean coherentes con la redirección de `/` si aplica.

## Documentación adicional

- [Astro — Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
