// Genera src/components/ui/brandPaths.ts con los íconos de marca que usa el sitio.
// Uso: node scripts/brand-icons.mjs (solo hace falta al agregar íconos nuevos).
import { writeFileSync } from 'node:fs';
import * as si from 'simple-icons';

const icons = {
  flutter: si.siFlutter,
  dart: si.siDart,
  firebase: si.siFirebase,
  html: si.siHtml5,
  css: si.siCss,
  javascript: si.siJavascript,
  wordpress: si.siWordpress,
  python: si.siPython,
  figma: si.siFigma,
  github: si.siGithub,
  whatsapp: si.siWhatsapp,
  gmail: si.siGmail,
};

const entries = Object.entries(icons)
  .map(
    ([k, v]) =>
      `  ${k}: { title: ${JSON.stringify(v.title)}, hex: '#${v.hex}', path: ${JSON.stringify(v.path)} },`,
  )
  .join('\n');

const out = `// Archivo generado por scripts/brand-icons.mjs a partir de simple-icons (CC0). No editar a mano.
export const brandPaths = {
${entries}
  linkedin: {
    title: 'LinkedIn',
    hex: '#0A66C2',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 4.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
} as const;

export type BrandName = keyof typeof brandPaths;
`;
writeFileSync(new URL('../src/components/ui/brandPaths.ts', import.meta.url), out);
console.log('brandPaths.ts generado');
