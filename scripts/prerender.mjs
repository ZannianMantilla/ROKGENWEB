/**
 * Prerender estático: inyecta el HTML de React en dist/index.html, completa URLs absolutas
 * (canonical, Open Graph), JSON-LD, preload de fuentes, sitemap.xml y robots.txt.
 */
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

// URL pública: SITE_URL > Vercel > Netlify. Sin URL, se omiten canonical y og:url.
const rawUrl =
  process.env.SITE_URL ||
  readEnvFile('SITE_URL') ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  process.env.URL ||
  '';
const SITE_URL = rawUrl.replace(/\/$/, '');

function readEnvFile(key) {
  for (const f of ['.env.production.local', '.env.local', '.env.production', '.env']) {
    try {
      const line = readFileSync(join(root, f), 'utf8')
        .split(/\r?\n/)
        .find((l) => l.startsWith(`${key}=`));
      const value = line?.slice(key.length + 1).trim();
      if (value) return value;
    } catch {
      /* archivo inexistente */
    }
  }
  return '';
}

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const appHtml = render();

let html = readFileSync(join(dist, 'index.html'), 'utf8');
html = html.replace('<!--app-html-->', appHtml);

// CSS inline: elimina la única petición que bloquea el render (el CSS pesa ~11 KB comprimido).
html = html.replace(
  /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/,
  (tag, href) => {
    const css = readFileSync(join(dist, href), 'utf8');
    return `<style>${css}</style>`;
  },
);

/* ---------- Head extra ---------- */
const abs = (p) => (SITE_URL ? `${SITE_URL}${p}` : p);
const head = [];

// Precarga de la fuente display (subset latin): es la del h1, que es el LCP.
const assets = readdirSync(join(dist, 'assets'));
for (const re of [/^bricolage-grotesque-latin-wght-normal.*\.woff2$/]) {
  const font = assets.find((f) => re.test(f));
  if (font)
    head.push(
      `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin>`,
    );
}

if (SITE_URL) {
  head.push(`<link rel="canonical" href="${SITE_URL}/">`);
  head.push(`<meta property="og:url" content="${SITE_URL}/">`);
} else {
  console.warn(
    '⚠  SITE_URL no definido: se omiten canonical/og:url y las imágenes OG quedan relativas.',
  );
}
html = html.replace(/content="\/og-image\.png"/g, `content="${abs('/og-image.png')}"`);

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Zannián Mantilla Celis',
      jobTitle: 'Desarrollador de Software',
      description: 'Desarrollador de Software | Frontend | Mobile | Análisis de Datos | Soporte TI',
      email: 'mailto:zanniancelis@gmail.com',
      telephone: '+57 324 603 3634',
      image: abs('/assets/generated/foto-640.webp'),
      ...(SITE_URL && { url: `${SITE_URL}/` }),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bucaramanga',
        addressRegion: 'Santander',
        addressCountry: 'CO',
      },
      alumniOf: [
        { '@type': 'EducationalOrganization', name: 'SENA' },
        { '@type': 'EducationalOrganization', name: 'UTO' },
      ],
      knowsLanguage: ['es', 'en', 'ru'],
      knowsAbout: [
        'Flutter',
        'Dart',
        'FlutterFlow',
        'Firebase',
        'HTML',
        'CSS',
        'JavaScript',
        'WordPress',
        'Python',
        'Figma',
        'SharePoint',
        'UI/UX',
      ],
      sameAs: ['https://github.com/ZannianMantilla'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Zannián Mantilla Celis — Desarrollo de software freelance',
      ...(SITE_URL && { url: `${SITE_URL}/` }),
      image: abs('/og-image.png'),
      email: 'zanniancelis@gmail.com',
      telephone: '+57 324 603 3634',
      founder: { '@id': `${SITE_URL}/#person` },
      areaServed: { '@type': 'Country', name: 'Colombia' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bucaramanga',
        addressRegion: 'Santander',
        addressCountry: 'CO',
      },
      serviceType: [
        'Desarrollo de apps móviles',
        'Desarrollo web y WordPress',
        'Diseño UI/UX',
        'Análisis de datos',
        'Soporte TI',
        'Contenido digital y SEO',
      ],
    },
  ],
};
head.push(
  `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
);

html = html.replace('<!--head-extra-->', head.join('\n    '));
writeFileSync(join(dist, 'index.html'), html);

/* ---------- robots.txt y sitemap.xml ---------- */
const robots = ['User-agent: *', 'Allow: /'];
if (SITE_URL) robots.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
writeFileSync(join(dist, 'robots.txt'), robots.join('\n') + '\n');

if (SITE_URL) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`,
  );
}

rmSync(ssrDir, { recursive: true, force: true });
console.log(`✓ Prerender listo${SITE_URL ? ` (${SITE_URL})` : ''}`);
