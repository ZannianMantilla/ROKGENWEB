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

/* ---------- Logo: el oso (LOGO/oso.webp, sobre blanco con contorno negro) ---------- */
// El fondo blanco se borra rellenando desde los bordes: el contorno negro lo detiene, así el interior queda intacto.
// Los píxeles claros junto al contorno quedan semitransparentes para suavizarlo.
const { data: px, info } = await sharp(join(root, 'LOGO', 'oso.webp'))
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: lw, height: lh } = info;
const light = (p) => Math.min(px[p * 3], px[p * 3 + 1], px[p * 3 + 2]);
const alpha = new Uint8Array(lw * lh).fill(255);
const stack = [];
for (let x = 0; x < lw; x++) stack.push(x, (lh - 1) * lw + x);
for (let y = 0; y < lh; y++) stack.push(y * lw, y * lw + lw - 1);
while (stack.length) {
  const p = stack.pop();
  if (alpha[p] !== 255 || light(p) < 200) continue;
  alpha[p] = Math.max(0, Math.min(254, Math.round(((235 - light(p)) / 35) * 255)));
  const x = p % lw;
  if (x > 0) stack.push(p - 1);
  if (x < lw - 1) stack.push(p + 1);
  if (p >= lw) stack.push(p - lw);
  if (p < lw * (lh - 1)) stack.push(p + lw);
}
const rgba = Buffer.alloc(lw * lh * 4);
for (let p = 0; p < lw * lh; p++)
  rgba.set([px[p * 3], px[p * 3 + 1], px[p * 3 + 2], alpha[p]], p * 4);
const logo = await sharp(rgba, { raw: { width: lw, height: lh, channels: 4 } })
  .trim({ threshold: 1 })
  .png()
  .toBuffer();
const logoMeta = await sharp(logo).metadata();
for (const h of [48, 96, 192]) {
  await sharp(logo)
    .resize({ height: h })
    .webp({ quality: 90, alphaQuality: 90 })
    .toFile(join(outDir, `logo-${h}.webp`));
}
console.log(`• Logo: ${logoMeta.width}×${logoMeta.height} → logo-{48,96,192}.webp`);

/* ---------- Huella del cursor (LOGO/huella.webp, negra sobre blanco) → máscara en src/assets ---------- */
// Lo oscuro pasa a opaco y el blanco a transparente; el color lo pone el CSS (mask-image).
{
  const assets = join(root, 'src', 'assets');
  mkdirSync(assets, { recursive: true });
  const { data: g, info: gi } = await sharp(join(root, 'LOGO', 'huella.webp'))
    .trim({ threshold: 30 })
    .resize(128, 128, { fit: 'contain', background: '#fff' })
    .flatten({ background: '#fff' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ga = Buffer.alloc(gi.width * gi.height * 2);
  for (let i = 0; i < g.length; i++) ga.set([0, 255 - g[i]], i * 2);
  await sharp(ga, { raw: { width: gi.width, height: gi.height, channels: 2 } })
    .png({ compressionLevel: 9 })
    .toFile(join(assets, 'huella.png'));
  console.log('• Huella del cursor lista');
}

/* ---------- Íconos: el logo sobre fondo oscuro ---------- */
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const icon = async (size, inner, background = '#0c0a16') =>
  sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([
      {
        input: await sharp(logo)
          .resize({
            width: Math.round(size * inner),
            height: Math.round(size * inner),
            fit: 'inside',
          })
          .toBuffer(),
        gravity: 'center',
      },
    ])
    .png()
    .toBuffer();

const icons = [
  ['favicon-32.png', 32, 1, clear],
  ['apple-touch-icon.png', 180, 0.78],
  ['icon-192.png', 192, 0.78],
  ['icon-512.png', 512, 0.78],
  ['icon-maskable-512.png', 512, 0.6],
];
for (const [name, size, inner, bg] of icons) {
  const file = join(pub, name);
  if (!force && existsSync(file)) continue;
  writeFileSync(file, await icon(size, inner, bg));
}
const favicon = join(pub, 'favicon.svg');
if (force || !existsSync(favicon))
  writeFileSync(
    favicon,
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><image width="64" height="64" href="data:image/png;base64,${(await icon(64, 1, clear)).toString('base64')}"/></svg>`,
  );
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
      <text x="80" y="370" font-size="92" font-weight="700" fill="url(#t)" letter-spacing="-3">MC</text>
      <text x="80" y="470" font-size="32" fill="#a1a1b5">Frontend · Mobile · Análisis de Datos · Soporte TI</text>
      <text x="80" y="550" font-size="26" fill="#a1a1b5">Santander, Colombia</text>
    </g>
  </svg>`;
  const mark = await sharp(logo).resize({ width: 330 }).toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: mark, top: 130, left: 800 }])
    .png({ compressionLevel: 9 })
    .toFile(og);
  console.log('• og-image.png lista');
}
