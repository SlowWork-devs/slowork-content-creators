# Vídeo hero (creators)

1. Exporta o copia el master (p. ej. `.mov` desde DaVinci / Premiere).
2. Genera un **MP4** optimizado para web (H.264 + AAC, `faststart` para streaming progresivo):

   ```bash
   ffmpeg -i "Content Creators Video.mov" \
     -c:v libx264 -profile:v high -pix_fmt yuv420p \
     -crf 23 -preset slow \
     -c:a aac -b:a 160k -movflags +faststart \
     creators-hero.mp4
   ```

   Ajusta `crf` (18–28): menos valor = más calidad y más peso.

3. Coloca `creators-hero.mp4` en esta carpeta (`public/videos/`).
4. En `.env` o variables del host:

   ```bash
   PUBLIC_CREATORS_HERO_VIDEO=/videos/creators-hero.mp4
   ```

### WebM opcional (mismo vídeo, desde tu MP4 o MOV)

Muchos navegadores (Chrome, Firefox, Edge…) pueden servir un **WebM VP9** más ligero que el MP4; **Safari / iOS** siguen necesitando el MP4, así que genera **los dos** y déjalos en esta carpeta.

```bash
ffmpeg -i creators-hero.mp4 \
  -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 \
  -c:a libopus -b:a 128k \
  creators-hero.webm
```

Sube `crf` (p. ej. 28–36) si quieres menos peso (menos calidad). Ajusta `-crf` a ojo comparando con el MP4.

En `.env`:

```bash
PUBLIC_CREATORS_HERO_VIDEO=/videos/creators-hero.mp4
PUBLIC_CREATORS_HERO_VIDEO_WEBM=/videos/creators-hero.webm
```

**Poster:** el hero usa por defecto `src/assets/creators-hero-poster.png`; sustitúyelo por un fotograma representativo de tu vídeo para mantener LCP y la estética de la fachada.
