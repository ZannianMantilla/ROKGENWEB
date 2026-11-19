/**
 * Recorta el fondo de las ilustraciones del avatar (carpeta AVATAR/) y genera WebP/AVIF con transparencia.
 *  - Fondo blanco: se rellena desde los bordes todo lo casi blanco que no cruce el contorno negro.
 *  - Fondo negro (cuerpo completo): igual, pero con los píxeles casi negros. El borde iluminado del
 *    dibujo hace de barrera.
 * Para no "filtrarse" por huecos de 1–2 px en el contorno, el relleno se hace sobre la máscara erosionada
 * y luego se expande de vuelta hasta el trazo.
 * Solo regenera si falta la salida o la fuente es más nueva (usa --force para rehacer todo).
 */
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'AVATAR');
const outDir = join(root, 'public', 'assets', 'generated');
const force = process.argv.includes('--force');
mkdirSync(outDir, { recursive: true });

/**
 * fuente → nombre de salida y color de fondo.
 * gap: radio de erosión (huecos del contorno que se cierran). holes: también borra bolsas de fondo
 * encerradas por el dibujo (p. ej. entre el brazo y la cabeza) mayores a ese número de píxeles.
 */
const avatars = [
  { src: 'introduccion.png', name: 'avatar-intro', bg: 'black', gap: 12 },
  { src: 'checklist.png', name: 'avatar-checklist', bg: 'white' },
  { src: 'proyectos.png', name: 'avatar-proyectos', bg: 'white', holes: 3000 },
  { src: 'pulgar arriba.png', name: 'avatar-pulgar', bg: 'white' },
  { src: 'contacto.png', name: 'avatar-contacto', bg: 'white' },
];
const WIDTHS = [360, 720];

/** Erosión/dilatación cuadrada separable sobre una máscara binaria. */
function morph(mask, w, h, r, erode) {
  const tmp = new Uint8Array(mask.length);
  const out = new Uint8Array(mask.length);
  const pick = erode ? (a, b) => a & b : (a, b) => a | b;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = erode ? 1 : 0;
      for (let k = -r; k <= r; k++) {
        const xx = Math.min(w - 1, Math.max(0, x + k));
        v = pick(v, mask[y * w + xx]);
      }
      tmp[y * w + x] = v;
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = erode ? 1 : 0;
      for (let k = -r; k <= r; k++) {
        const yy = Math.min(h - 1, Math.max(0, y + k));
        v = pick(v, tmp[yy * w + x]);
      }
      out[y * w + x] = v;
    }
  return out;
}

/** Relleno 4-conexo desde todos los píxeles del borde que estén en la máscara. */
function floodFromEdges(mask, w, h) {
  const filled = new Uint8Array(mask.length);
  const stack = [];
  const push = (i) => {
    if (mask[i] && !filled[i]) {
      filled[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % w;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (i >= w) push(i - w);
    if (i < w * (h - 1)) push(i + w);
  }
  return filled;
}

/** Marca como fondo las regiones de `mask` no alcanzadas por el relleno y con área > minArea. */
function removeHoles(mask, bgMask, w, h, minArea) {
  const seen = new Uint8Array(mask.length);
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || bgMask[start] || seen[start]) continue;
    const region = [start];
    seen[start] = 1;
    for (let k = 0; k < region.length; k++) {
      const i = region[k];
      const x = i % w;
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w]) {
        if (j >= 0 && j < mask.length && mask[j] && !bgMask[j] && !seen[j]) {
          seen[j] = 1;
          region.push(j);
        }
      }
    }
    if (region.length > minArea) for (const i of region) bgMask[i] = 1;
  }
}

async function cutout({ src, bg, gap = 3, holes = 0 }) {
  const { data, info } = await sharp(join(srcDir, src))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const n = w * h;
  const white = bg === 'white';
  // "cercanía al fondo": 0 = fondo puro, 255 = lo opuesto
  const dist = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    dist[i] = white ? 255 - Math.min(r, g, b) : Math.max(r, g, b);
  }
  const strict = white ? 22 : 2; // lo que sin duda es fondo
  const loose = white ? 70 : 3; // hasta dónde se puede expandir hacia el trazo

  const strictMask = new Uint8Array(n);
  const looseMask = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    strictMask[i] = dist[i] <= strict ? 1 : 0;
    looseMask[i] = dist[i] <= loose ? 1 : 0;
  }

  // 1) Relleno sobre la máscara erosionada: los huecos finos del contorno no dejan pasar el relleno.
  const R = gap;
  const eroded = morph(strictMask, w, h, R, true);
  const bgMask = floodFromEdges(eroded, w, h);
  if (holes) removeHoles(eroded, bgMask, w, h, holes);
  // 2) Vuelve a crecer hasta el trazo, solo por píxeles que parecen fondo.
  for (let step = 0; step < R + 2; step++) {
    const grown = morph(bgMask, w, h, 1, false);
    for (let i = 0; i < n; i++) bgMask[i] = grown[i] & looseMask[i];
  }

  // 3) Alfa: 0 en el fondo; en el borde antialias del dibujo, alfa proporcional a la tinta.
  const edge = morph(bgMask, w, h, 1, false);
  const out = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    let a = 255;
    if (bgMask[i]) a = 0;
    else if (edge[i] && white && dist[i] < 200) a = Math.round((dist[i] / 200) * 255);
    out[i * 4] = data[i * 4];
    out[i * 4 + 1] = data[i * 4 + 1];
    out[i * 4 + 2] = data[i * 4 + 2];
    out[i * 4 + 3] = a;
    // Borde semitransparente sobre fondo blanco: se oscurece para que no quede halo claro.
    if (a > 0 && a < 255) {
      out[i * 4] = out[i * 4 + 1] = out[i * 4 + 2] = 0;
    }
  }
  return sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 0 })
    .png()
    .toBuffer();
}

for (const a of avatars) {
  const source = join(srcDir, a.src);
  if (!existsSync(source)) {
    console.warn(`• Falta AVATAR/${a.src}, se omite`);
    continue;
  }
  const srcTime = statSync(source).mtimeMs;
  const files = WIDTHS.flatMap((w) =>
    ['avif', 'webp'].map((ext) => join(outDir, `${a.name}-${w}.${ext}`)),
  );
  if (!force && files.every((f) => existsSync(f) && statSync(f).mtimeMs > srcTime)) continue;

  const png = await cutout(a);
  for (const w of WIDTHS) {
    const img = () => sharp(png).resize({ width: w });
    await img()
      .avif({ quality: 60, effort: 5 })
      .toFile(join(outDir, `${a.name}-${w}.avif`));
    await img()
      .webp({ quality: 82, alphaQuality: 90 })
      .toFile(join(outDir, `${a.name}-${w}.webp`));
  }
  const meta = await sharp(png).metadata();
  console.log(`• ${a.name}: ${meta.width}×${meta.height}`);
}
console.log('• Avatar: recortes listos');
