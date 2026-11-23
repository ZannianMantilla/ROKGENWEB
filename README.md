# Portafolio · Zannián Mantilla Celis

Portafolio multipágina: Vite + React 19 + TypeScript + Tailwind CSS 4 + GSAP/ScrollTrigger + Lenis.
Bilingüe (ES/EN), tema oscuro grafito donde cada sección tiene su gema: amatista (inicio y contacto), zafiro (sobre mí), citrino (servicios), jade (stack), cuarzo rosa (proyectos) y topacio (trayectoria). Al hacer scroll, el logo, el cursor, la barra de progreso y el cristal del avatar toman la gema de la sección visible. Las gemas están en `index.css` (sección Tokens) y la de cada página en `TONES` (`src/lib/section.ts`). Cada página se prerenderiza en el build para SEO y velocidad.

## Páginas

**El inicio (`/`) es el resumen**: hero, bandas de texto y todas las secciones, como una página única. Cada sección tiene un botón **"Ver más"** que lleva a su página propia, donde la información se amplía:

| Ruta           | Qué agrega frente al resumen                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| `/sobre-mi`    | Formación completa, idiomas, ubicación y herramientas principales.                                             |
| `/servicios`   | Cada servicio en detalle, con sus herramientas, los proyectos relacionados y un botón para cotizarlo por WhatsApp. |
| `/stack`       | Cada herramienta con los servicios y proyectos donde la uso, o el curso en el que la aprendí.                  |
| `/proyectos`   | Cada proyecto como caso completo, con galería, puntos clave, stack y servicio relacionado.                     |
| `/trayectoria` | Cifras de resumen y la línea de tiempo completa.                                                               |
| `/contacto`    | Formulario, WhatsApp con el servicio ya elegido y ubicación.                                                   |

- **Nada de esto es contenido nuevo inventado.** Las páginas cruzan lo que ya está en `content.ts` (ver `src/lib/catalog.ts`).
- Para que un proyecto aparezca en un servicio, agrégale `services: ['web']` (o el servicio que corresponda).
- Para enlazar una herramienta del stack con un curso, usa `course`.
- La navegación entre páginas no recarga y tiene transición animada (View Transitions, en los navegadores que la soportan).
- Las páginas internas terminan con una invitación a escribir y un enlace grande a la siguiente.
- Las rutas están en `src/lib/router.ts`. El título y la descripción de cada página están en `pageSeo`, al final de `content.ts`.

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

**El avatar está vivo.** Flota y respira. Sus ojos brillan, parpadean y siguen al cursor, y el cristal del colgante late: más fuerte cuando el cursor se acerca o pasa por un enlace, y con el scroll rápido. En el hero, al tocar el cristal salen esquirlas y el avatar dice una frase (`hero.crystal` en `content.ts`). El cristal también es el logo y el favicon (`src/components/ui/Crystal.tsx`).

- Las posiciones de ojos y cristal de cada ilustración están en `AVATARS` (`src/components/ui/Avatar.tsx`), en % de la imagen recortada. Si cambias una ilustración, vuelve a medirlas.
- El movimiento está en `initAvatarLife` (`src/lib/enhance.ts`) y en la sección "Avatar vivo" de `index.css`.
- Con `prefers-reduced-motion`, el avatar queda quieto.

Para cambiar una ilustración, reemplaza el PNG con el mismo nombre y corre `npm run images`. Funciona con fondo blanco o negro liso. La asignación está en `scripts/avatars.mjs` y en la prop `avatar` de cada `SectionHeading`.

### Capturas de proyectos

Las capturas van en `public/assets/projects/` como WebP, con el ancho en el nombre: `nombre-720.webp` y `nombre-1440.webp` para escritorio, y `nombre-390.webp` y `nombre-780.webp` para móvil. En el proyecto:

- `image`: la captura principal de la tarjeta, mostrada dentro de un marco de navegador.
- `gallery`: todas las capturas del detalle, con miniaturas. Si la galería incluye una captura móvil, también aparece superpuesta en la tarjeta.

Toma como ejemplo `adsolearnShot()` en `content.ts`. Cada captura lleva su texto alternativo en ES/EN.

Las capturas actuales de **ADSOLEARN** salieron de su modo demo (`D:\YO\Proyectos\Proyecto SENA Web`). Las de **GYMROCK** salieron de `D:\YO\Proyectos\GymRock Web`, recorriendo la app como usuario nuevo: bienvenida, marcas de 1RM y una sesión registrada. Las de **MAXTRIAGE** salieron de `D:\YO\Proyectos\MAXTRIAGE Web` en modo demo: un paciente crea una solicitud de triage III y el personal la atiende.

### Sitios web para clientes

Están en `clientSites` (`content.ts`) y se muestran en el inicio, en `/proyectos` (con la vista móvil) y en el servicio "Sitios web" de `/servicios`.

- Las capturas se tomaron de cada sitio publicado (escritorio 1440 × 900 y móvil 390 × 844) y están en `public/assets/projects/<id>-*.webp`.
- Las descripciones resumen lo que dice cada sitio.
- `stack` solo lista lo que se pudo confirmar en el sitio publicado: WordPress en SYSTEMRED GPS y Motel Cherry Hot.

Si un sitio cambia de diseño, vuelve a tomar sus capturas con los mismos nombres.

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
  data/content.ts         ← contenido (ES/EN) y SEO de cada página
  components/
    layout/               Navbar, Footer, ScrollProgress
    pages/                inicio (resumen), una página detallada por sección, cierre, siguiente y 404
    sections/             Hero (+ órbita), Ticker, About, Services, Stack, Projects (+ modal y mockups), Journey, Contact
    ui/                   botones, enlaces internos, capturas, avatar, íconos de marca, typewriter, encabezados
  lib/
    router.ts             rutas y navegación sin recarga (History API + View Transitions)
    catalog.ts            cruces entre servicios, herramientas y proyectos
    section.ts            nivel de títulos y espaciado según resumen o página propia
    enhance.ts            GSAP, ScrollTrigger, Lenis, cursor, magnético, tilt, títulos, cortinas (diferido)
    meshGradient.ts       fondo WebGL del hero (solo escritorio)
    prefs.ts              idioma
    form.ts, analytics.ts
  styles/index.css        tokens de color, tipografía y animaciones CSS
scripts/
  images.mjs              foto responsiva, íconos y og-image con sharp
  avatars.mjs             recorta el fondo de las ilustraciones de AVATAR/
  prerender.mjs           un HTML por página (+ 404), CSS inline, JSON-LD, sitemap y robots
  brand-icons.mjs         regenera los íconos de marca desde simple-icons
  serve.mjs               servidor local tipo producción
```

## Decisiones técnicas

- **Prerender en el build, una página por ruta.** Cada página es un HTML propio, con su `<title>`, descripción, canonical y Open Graph, así que funciona sin JS y los buscadores la indexan por separado. El `<h1>` llega en el HTML y React solo hidrata. Después, la navegación es del lado del cliente con un router propio de ~1 KB, sin dependencias.
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
- [ ] MATEGAME: tecnologías, rol y capturas reales (hoy muestra una ilustración).
- [ ] Enlaces a demo o repositorio de ADSOLEARN, GYMROCK y MAXTRIAGE cuando se publiquen.
- [ ] Año de los sitios web para clientes (hoy no se muestra).
- [ ] Descripción de funciones en "Monitor (ANDES)" y "Soporte Técnico (Solusystem)".
- [ ] (Opcional) Plausible o GA4.
