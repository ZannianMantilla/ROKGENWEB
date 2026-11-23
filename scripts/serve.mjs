/**
 * Servidor estático mínimo para probar `dist` como en producción (Brotli/gzip + caché inmutable).
 * Uso: npm run serve  →  http://localhost:4174
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const port = Number(process.env.PORT) || 4174;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const compressible = /^(text\/|application\/(json|xml|manifest)|image\/svg)/;

/** /sobre-mi → dist/sobre-mi/index.html (como cleanUrls en Vercel); si no existe, 404.html. */
async function resolve(pathname) {
  const candidates = pathname.endsWith('/')
    ? [`${pathname}index.html`]
    : extname(pathname)
      ? [pathname]
      : [pathname, `${pathname}/index.html`];
  for (const c of candidates) {
    const file = join(dist, normalize(c));
    if (!file.startsWith(dist + sep)) return null;
    try {
      if ((await stat(file)).isFile()) return { file, status: 200 };
    } catch {
      /* siguiente candidato */
    }
  }
  return { file: join(dist, '404.html'), status: 404 };
}

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const hit = await resolve(pathname);
  if (!hit) {
    res.writeHead(403).end();
    return;
  }
  const { file, status } = hit;
  try {
    let body = await readFile(file);
    const type = types[extname(file)] || 'application/octet-stream';
    const headers = {
      'Content-Type': type,
      'Cache-Control': pathname.startsWith('/assets/')
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    };
    const accept = req.headers['accept-encoding'] || '';
    if (compressible.test(type) && accept.includes('br')) {
      body = brotliCompressSync(body);
      headers['Content-Encoding'] = 'br';
    } else if (compressible.test(type) && accept.includes('gzip')) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    res.writeHead(status, headers).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404');
  }
}).listen(port, () => console.log(`dist → http://localhost:${port}`));
