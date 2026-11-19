# Portafolio · Zannián Mantilla Celis

Portafolio de una sola página: Vite + React 19 + TypeScript + Tailwind CSS 4 + GSAP/ScrollTrigger + Lenis.
Bilingüe (ES/EN), tema oscuro con acentos morados y fucsia, HTML prerenderizado en el build para SEO y velocidad.

## Comandos

| Comando            | Qué hace                                                                   |
| ------------------ | -------------------------------------------------------------------------- |
| `npm install`      | Instala dependencias (Node 20+).                                           |
| `npm run dev`      | Servidor de desarrollo en http://localhost:5173                            |
| `npm run build`    | Imágenes → typecheck → build → prerender. Resultado en `dist/`.            |
| `npm run serve`    | Sirve `dist/` con compresión, como en producción (http://localhost:4174). |
| `npm run lighthouse` | Lighthouse móvil contra `npm run serve` (necesita Chrome).               |
| `npm run lint` / `npm run format` | ESLint / Prettier.                                          |
| `npm run images`   | Regenera la foto y los recortes del avatar (`--force` rehace también íconos y OG). |

## Editar contenido

**Todo el texto está en [`src/data/content.ts`](src/data/content.ts).** No hace falta tocar componentes.

- Cada texto traducible es `{ es: '...', en: '...' }`, con los dos idiomas lado a lado.
- `profile`: correo, WhatsApp, GitHub, LinkedIn y año de inicio para el contador de experiencia.
- `projects.items`: cada proyecto acepta `stack`, `role`, `demoUrl`, `repoUrl` e `image`.
  - Los campos vacíos no se muestran.
  - Mientras no haya `image`, se muestra un mockup ilustrativo dibujado en CSS, con la etiqueta "Vista ilustrativa".
- `journey`: experiencia, educación, cursos e idiomas.
- Busca `TODO` en ese archivo para ver lo que falta.

### Foto

1. Reemplaza `public/assets/foto.jpg` por tu foto. Funciona mejor vertical (4:5) y de al menos 960 × 1200 px.
2. Ejecuta `npm run images` (también corre solo en cada `npm run build`). El script genera las versiones AVIF/WebP de 320, 640 y 960 px y recorta centrando la cara.

### Avatar

Las ilustraciones del personaje están en `AVATAR/`. `npm run images` les quita el fondo y genera versiones WebP/AVIF transparentes (360 y 720 px) en `public/assets/generated/avatar-*`.

| Archivo                 | Sección                                |
| ----------------------- | -------------------------------------- |
| `introduccion.png`      | Hero (dentro de la órbita, solo escritorio) |
| `checklist.png`         | Servicios                              |
| `proyectos.png`         | Proyectos                              |
| `pulgar arriba.png`     | Trayectoria                            |
| `contacto.png`          | Contacto (asomado sobre el formulario) |

Para cambiar una ilustración, reemplaza el PNG con el mismo nombre y corre `npm run images`. Funciona con fondo blanco o negro liso. La asignación está en `scripts/avatars.mjs` y en la prop `avatar` de cada `SectionHeading`.

### Capturas de proyectos

Guarda la imagen en `public/assets/projects/` y agrégala al proyecto:

```ts
image: { src: '/assets/projects/maxtriage.webp', width: 1200, height: 900 },
```

## Formulario de contacto

1. Crea un formulario gratis en [Formspree](https://formspree.io) y copia su URL (`https://formspree.io/f/xxxx`).
2. Ponla en la variable `VITE_FORM_ENDPOINT`: en `.env` para local, o en el panel de Vercel/Netlify.

- Sirve cualquier endpoint que acepte `POST` con JSON y responda 2xx.
- **Sin endpoint**, el botón abre el cliente de correo del visitante con el mensaje ya escrito, así que nunca se pierde un contacto.
- Anti-spam: honeypot (`_gotcha`, el campo que reconoce Formspree) y descarte de envíos hechos en menos de 3 s.

## Variables de entorno (`.env.example`)

| Variable                | Uso                                                                      |
| ----------------------- | ------------------------------------------------------------------------ |
| `SITE_URL`              | URL pública sin `/` final. Activa canonical, `og:url`, sitemap e imágenes OG absolutas. En Vercel/Netlify se detecta sola. |
| `VITE_FORM_ENDPOINT`    | Endpoint del formulario.                                                 |
| `VITE_PLAUSIBLE_DOMAIN` | Activa Plausible (opcional).                                             |
| `VITE_GA_ID`            | Activa Google Analytics 4 (opcional, `G-XXXX`).                          |

Ninguna es secreta: todo lo que empieza por `VITE_` termina en el JS público.

## Desplegar

**Vercel:** importa el repositorio y listo. `vercel.json` ya define el build, la carpeta `dist`, caché inmutable y cabeceras de seguridad. Agrega `VITE_FORM_ENDPOINT` en *Settings → Environment Variables*. Cuando tengas dominio propio, define también `SITE_URL=https://tudominio.com`.

**Netlify:** igual, con `netlify.toml`.

## Estructura

```
src/
  data/content.ts         ← contenido (ES/EN)
  components/
    layout/               Navbar, Footer, ScrollProgress
    sections/             Hero (+ órbita), Ticker, About, Services, Stack, Projects (+ modal y mockups), Journey, Contact
    ui/                   botones, íconos de marca (sprite SVG), typewriter, encabezados
  lib/
    enhance.ts            GSAP, ScrollTrigger, Lenis, cursor, magnético, tilt, títulos, cortinas (diferido)
    meshGradient.ts       fondo WebGL del hero (solo escritorio)
    prefs.ts              idioma
    form.ts, analytics.ts
  styles/index.css        tokens de color, tipografía y animaciones CSS
scripts/
  images.mjs              foto responsiva, íconos y og-image con sharp
  avatars.mjs             recorta el fondo de las ilustraciones de AVATAR/
  prerender.mjs           HTML estático, CSS inline, JSON-LD, sitemap y robots
  brand-icons.mjs         regenera los íconos de marca desde simple-icons
  serve.mjs               servidor local tipo producción
```

## Decisiones técnicas

- **Prerender en el build.** El `<h1>` llega en el HTML, así que es el LCP desde el primer paint. React solo hidrata.
- **Animaciones en un chunk diferido.** GSAP, Lenis y el WebGL (~50 KB gzip) se cargan cuando el navegador queda libre. La configuración se reparte en tareas cortas para no bloquear el hilo principal. JS inicial: ~96 KB gzip.
- **Solo `transform` y `opacity`.** Nunca `visibility`, para que el foco por teclado siga funcionando aunque una sección no se haya revelado. Excepciones baratas: el brillo del texto con gradiente y el borde cónico de las tarjetas (este último solo gira en hover).
- **Halos de fondo estáticos.** Animar los halos radiales grandes de cada sección costaba ~0,7 s de primer pintado en móvil; el movimiento lo aportan la órbita, las bandas de texto, el cursor y los reveals.
- **WebGL solo en escritorio con mouse.** En móvil, blobs CSS (más baratos para la batería).
- **`prefers-reduced-motion`.** Desactiva Lenis, GSAP, preloader, marquee, órbita, bandas de texto y typewriter.
- **Fuentes autoalojadas.** Bricolage Grotesque + Manrope (Google Fonts vía Fontsource, `font-display: swap`). La display se precarga.

## Lighthouse

`lighthouse-report.html` es la última medición local (móvil): **Performance 93–95 · Accessibility 100 · SEO 100**, con LCP 2,2 s, CLS 0 y TBT < 150 ms.

En este equipo el antivirus (Kaspersky) inyecta scripts en las páginas de `localhost` y sirve el HTML sin comprimir. Por eso Best Practices marca 82 ("solicitudes inseguras") y el rendimiento local es pesimista. Mide la versión publicada en [PageSpeed Insights](https://pagespeed.web.dev/).

## Pendientes

- [ ] Foto real en `public/assets/foto.jpg`.
- [ ] URL de LinkedIn en `profile.linkedin`.
- [ ] Endpoint del formulario (`VITE_FORM_ENDPOINT`).
- [ ] Dominio y `SITE_URL` (canonical, sitemap, Open Graph).
- [ ] Proyectos: tecnologías de MAXTRIAGE y MATEGAME, tu rol, enlaces a demo/repo y capturas reales.
- [ ] Descripción de funciones en "Monitor (ANDES)" y "Soporte Técnico (Solusystem)".
- [ ] (Opcional) Plausible o GA4.
