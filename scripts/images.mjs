/**
 * Genera las imágenes optimizadas del sitio con sharp.
 *  - public/assets/foto.jpg → public/assets/generated/foto-{320,640,960}.{avif,webp}
 *  - favicon PNG, apple-touch-icon, íconos del manifest y og-image.png (solo si no existen; usa --force para regenerar)
 * Si no existe foto.jpg crea un placeholder para que el build no falle.
 */
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const outDir = join(pub, 'assets', 'generated');
const photo = join(pub, 'assets', 'foto.jpg');
const force = process.argv.includes('--force');
mkdirSync(outDir, { recursive: true });

const W = 960;
const H = 1200;

/* ---------- Placeholder de la foto ---------- */
if (!existsSync(photo)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a1530"/><stop offset="1" stop-color="#0c1b24"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="${W / 2}" cy="470" r="170" fill="#2a2445"/>
    <path d="M${W / 2 - 330} ${H} C ${W / 2 - 330} 820, ${W / 2 + 330} 820, ${W / 2 + 330} ${H} Z" fill="#2a2445"/>
    <text x="50%" y="1080" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="40" fill="#8b8ba7">Reemplaza public/assets/foto.jpg</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(photo);
  console.log('• Placeholder creado en public/assets/foto.jpg');
}

/* ---------- Variantes responsivas de la foto ---------- */
const srcTime = statSync(photo).mtimeMs;
for (const w of [320, 640, 960]) {
  const h = Math.round((w * H) / W);
  for (const [ext, opts] of [
    ['avif', { quality: 55, effort: 5 }],
    ['webp', { quality: 78 }],
  ]) {
    const file = join(outDir, `foto-${w}.${ext}`);
    if (!force && existsSync(file) && statSync(file).mtimeMs > srcTime) continue;
    const img = sharp(photo).rotate().resize(w, h, { fit: 'cover', position: 'attention' });
    await (ext === 'avif' ? img.avif(opts) : img.webp(opts)).toFile(file);
  }
}
console.log('• Foto: variantes AVIF/WebP listas');

/* ---------- Íconos ---------- */
const iconSvg = (
  size,
  pad = 0,
) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c4b5fd"/><stop offset=".45" stop-color="#a855f7"/><stop offset="1" stop-color="#c026d3"/></linearGradient>
    <radialGradient id="h" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#7c3aed" stop-opacity=".55"/><stop offset="1" stop-color="#7c3aed" stop-opacity="0"/></radialGradient>
  </defs>
  <rect x="${pad}" y="${pad}" width="${64 - pad * 2}" height="${64 - pad * 2}" rx="14" fill="#0c0a16"/>
  <circle cx="32" cy="34" r="26" fill="url(#h)"/>
  <!-- El cristal del colgante (misma geometría que src/components/ui/Crystal.tsx) -->
  <g transform="translate(14 4) scale(1.5 1.75)">
    <path d="M12 2 18.5 7.5v13L12 30l-6.5-9.5v-13Z" fill="url(#g)"/>
    <path d="M12 2 5.5 7.5v13L12 30Z" fill="#4c1d95" opacity=".45"/>
    <path d="M12 2v28M5.5 7.5 12 11l6.5-3.5" stroke="#f5d0fe" stroke-opacity=".55" stroke-width=".8" fill="none"/>
    <path d="M14.6 9.6v9.6l-1.3 2.4V11Z" fill="#fff" opacity=".7"/>
  </g>
</svg>`;

const icons = [
  ['favicon-32.png', 32, 0],
  ['apple-touch-icon.png', 180, 0],
  ['icon-192.png', 192, 0],
  ['icon-512.png', 512, 0],
  ['icon-maskable-512.png', 512, 0],
];
for (const [name, size, pad] of icons) {
  const file = join(pub, name);
  if (!force && existsSync(file)) continue;
  await sharp(Buffer.from(iconSvg(size, pad)))
    .png()
    .toFile(file);
}
const favicon = join(pub, 'favicon.svg');
if (force || !existsSync(favicon)) writeFileSync(favicon, iconSvg(64));
console.log('• Íconos listos');

/* ---------- Imagen Open Graph 1200×630 ---------- */
const og = join(pub, 'og-image.png');
if (force || !existsSync(og)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <radialGradient id="a" cx="85%" cy="20%" r="60%"><stop offset="0" stop-color="#7c3aed" stop-opacity=".75"/><stop offset="1" stop-color="#7c3aed" stop-opacity="0"/></radialGradient>
      <radialGradient id="b" cx="95%" cy="95%" r="50%"><stop offset="0" stop-color="#e879f9" stop-opacity=".55"/><stop offset="1" stop-color="#e879f9" stop-opacity="0"/></radialGradient>
      <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#e879f9"/></linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#07060d"/>
    <rect width="1200" height="630" fill="url(#a)"/><rect width="1200" height="630" fill="url(#b)"/>
    <g font-family="Segoe UI, Arial, sans-serif">
      <text x="80" y="130" font-size="26" fill="#e879f9" letter-spacing="6" font-family="Consolas, monospace">DESARROLLADOR DE SOFTWARE</text>
      <text x="80" y="270" font-size="92" font-weight="700" fill="#ededf5" letter-spacing="-3">Zannián</text>
      <text x="80" y="370" font-size="92" font-weight="700" fill="url(#t)" letter-spacing="-3">Mantilla Celis</text>
      <text x="80" y="470" font-size="32" fill="#a1a1b5">Frontend · Mobile · Análisis de Datos · Soporte TI</text>
      <text x="80" y="550" font-size="26" fill="#a1a1b5">Santander, Colombia</text>
    </g>
  </svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(og);
  console.log('• og-image.png lista');
}
