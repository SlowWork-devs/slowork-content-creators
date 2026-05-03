# Engram / contexto técnico: `slowork-content-creators`

Última actualización: decisiones de producto e implementación acordadas en el repo.

## Stack y runtime

- **Astro 6**, **Tailwind 4**, **DaisyUI 5**, tema `slowork-creators` en `src/styles/global.css`.
- **Node.js ≥ 22.12.0** (`package.json` → `engines`).
- Sitio estático: rutas `/es/creators/`, `/en/creators/`; `/` → redirect a `/es/creators/` (`astro.config.mjs` + `index.astro`).

## Contenido (Content Layer)

- Colección `creators`: Markdown en `src/content/creators/{en,es}.md`, esquema en `src/content.config.ts`, modelos Zod en `src/models/`.
- Consumo solo con `getCollection` / `render` desde `astro:content`. **No** `Astro.glob()` para esos MD.

## Hero vídeo (decisión principal)

- **Solo vídeo autohospedado**: componente `VideoFacade.astro` ya **no** usa YouTube ni iframe de terceros.
- **Ruta MP4 por defecto**: `/videos/creators-hero.mp4` (constante en `src/constants/site.ts` si `PUBLIC_CREATORS_HERO_VIDEO` no está definida).
- **Override**: variable `PUBLIC_CREATORS_HERO_VIDEO` (ruta pública bajo `public/`).
- **WebM opcional**: `PUBLIC_CREATORS_HERO_VIDEO_WEBM` (VP9); el `<video>` monta `<source>` WebM antes que MP4; Safari sigue con MP4.
- **Fachada**: poster + play hasta el clic; **sin descarga** del vídeo antes de la interacción.
- **Poster por defecto**: `src/assets/creators-hero-poster.png` (antes `slowork-manifesto-video-poster.png`, renombrado).
- **Encuadre vídeo/poster**: `object-contain` para no recortar si la proporción no es 16:9.
- **Marco UI**: bisel + sombras en capas en `VideoFacade` (sin doble wrapper de sombra en la página).
- **Binarios grandes**: `public/videos/*.mp4` y `*.webm` en **`.gitignore`**; en deploy hay que subir esos ficheros al hosting/CDN o generarlos en CI. Guía: `public/videos/README.md`.

## Constantes sitio

- `MAIN_SLOWORK_ORIGIN` = `https://www.slowork.app` (legal, CTA, canonical).
- `creatorsHeroVideoSrc`, `creatorsHeroVideoWebmSrc` en `src/constants/site.ts`.

## Sección PROCESS (08)

- Conectores entre pasos: **flechas** Lucide (`ArrowDown` móvil, `ArrowRight` desktop), no líneas animadas con scroll.
- Eliminadas clases `.timeline-scroll-x/y` y keyframes asociados en `global.css`.

## Ritmo vertical

- Secciones: padding vertical pasó de `py-32` a **`py-20`** y **`md:py-24`**; hero interno `pt-16` / `md:pt-20`; grid “What is Slowork” con `gap` algo menor.

## Copy y tono

- Eliminada la **raya larga (—)** en copy visible, README y docs internos; sustituida por comas, dos puntos o frases partidas.
- Menciones de **YouTube** retiradas del embed y del copy de plataformas: formulación tipo “Instagram, TikTok u otras redes / video-first platforms”.
- Marca en prosa: **Slowork** (README alineado).

## Accesibilidad / UI strings

- `Header.astro`: `aria-label` / `alt` del logo sin rayas; formato “Slowork, …” / “Slowork: …”.
- `VideoFacade`: prop `videoTitle` (antes enfoque iframe); `playLabel` corto tipo “Tap to play…”.

## Commits recientes (referencia)

1. `chore(css): remove unused timeline scroll keyframes`
2. `feat(creators-landing): self-hosted hero video and page refinements`
3. `docs: hero video setup, encoding guide, and ignore local encodes`
4. `style(copy): replace em dashes with natural punctuation`

---

## Sincronización con Engram (CLI, desde la raíz del repo)

1. Guardar este documento como memoria del proyecto (evita problemas de comillas multilínea):

   ```bash
   python3 -c "import subprocess, pathlib; r=pathlib.Path('docs/engram-context.md').read_text(encoding='utf-8'); subprocess.run(['engram','save','slowork-content-creators: canonical technical context (repo SSOT)', r,'--project','slowork-content-creators'], check=True)"
   ```

2. Opcional: exportar chunk bajo `.engram/` para versionar o compartir: `engram sync --project slowork-content-creators` (revisar si el equipo quiere commitear `.engram/`).

*Este fichero es el SSOT en git; Engram guarda la misma información como memoria local del proyecto `slowork-content-creators`.*
