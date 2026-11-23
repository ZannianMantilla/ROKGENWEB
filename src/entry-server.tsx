import { renderToString } from 'react-dom/server';
import { App } from './App';
import { pageSeo } from './data/content';
import { PAGE_ORDER, ROUTES, setServerPath } from './lib/router';

/** Usado por scripts/prerender.mjs para generar el HTML estático de cada página. */
export function render(path: string) {
  setServerPath(path);
  return renderToString(<App />);
}

/** Páginas que se prerenderizan: ruta, archivo de salida y metadatos (en español, idioma base). */
export const pages = [
  ...PAGE_ORDER.map((id) => ({
    path: ROUTES[id],
    file: id === 'home' ? 'index.html' : `${ROUTES[id].slice(1)}/index.html`,
    title: pageSeo[id].title.es,
    description: pageSeo[id].description.es,
    indexable: true,
  })),
  {
    path: '/404',
    file: '404.html',
    title: pageSeo.notFound.title.es,
    description: pageSeo.notFound.description.es,
    indexable: false,
  },
];
