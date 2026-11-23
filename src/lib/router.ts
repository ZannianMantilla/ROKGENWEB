/**
 * Router mínimo con la History API (sin dependencias).
 * Cada página también existe como HTML prerenderizado (scripts/prerender.mjs), así que un enlace
 * directo o una recarga funcionan sin JS; con JS la navegación es instantánea y animada
 * con View Transitions cuando el navegador lo permite.
 */
import { useSyncExternalStore, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

export const ROUTES = {
  home: '/',
  about: '/sobre-mi',
  services: '/servicios',
  stack: '/stack',
  projects: '/proyectos',
  experience: '/trayectoria',
  contact: '/contacto',
} as const;

export type RouteId = keyof typeof ROUTES | 'notFound';

/** Orden de las páginas (navegación, "siguiente página" y sitemap). */
export const PAGE_ORDER = Object.keys(ROUTES) as (keyof typeof ROUTES)[];

export function routeFromPath(pathname: string): RouteId {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const hit = PAGE_ORDER.find((id) => ROUTES[id] === clean);
  return hit ?? 'notFound';
}

/* ---------- Store de la ruta actual ---------- */
let serverPath = '/';
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

/** Solo para el prerender: fija la ruta que se va a renderizar en el servidor. */
export function setServerPath(path: string) {
  serverPath = path;
}

const onPop = () => transition(emit);

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) addEventListener('popstate', onPop);
  return () => {
    listeners.delete(cb);
    if (!listeners.size) removeEventListener('popstate', onPop);
  };
}

export function useRoute(): RouteId {
  const path = useSyncExternalStore(
    subscribe,
    () => location.pathname,
    // Al hidratar, React usa este valor: en el navegador debe ser la ruta real del HTML prerenderizado.
    () => (typeof window === 'undefined' ? serverPath : location.pathname),
  );
  return routeFromPath(path);
}

/* ---------- Navegación ---------- */
type DocWithVT = Document & { startViewTransition?: (cb: () => void) => unknown };

/** Aplica `update` (sincrónico, para que la transición capture el DOM nuevo) y luego `after`. */
function transition(update: () => void, after?: () => void) {
  const doc = document as DocWithVT;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const apply = () => {
    flushSync(update);
    after?.();
  };
  if (doc.startViewTransition && !reduced) doc.startViewTransition(apply);
  else apply();
}

export function navigate(to: string) {
  const url = new URL(to, location.href);
  if (url.pathname === location.pathname) {
    if (url.hash) document.querySelector(url.hash)?.scrollIntoView();
    else scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  transition(
    () => {
      history.pushState(null, '', url.pathname + url.hash);
      emit();
    },
    () => {
      // Ya con la página nueva en el DOM: arriba o en el ancla pedida (enhance.ts sincroniza Lenis).
      const target = url.hash && document.getElementById(url.hash.slice(1));
      if (target) target.scrollIntoView();
      else scrollTo(0, 0);
      dispatchEvent(new Event('routechange'));
    },
  );
}

/** onClick para enlaces internos: navega sin recargar salvo con teclas modificadoras. */
export function handleLinkClick(e: MouseEvent<HTMLAnchorElement>) {
  const a = e.currentTarget;
  if (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    a.target === '_blank' ||
    a.origin !== location.origin ||
    a.getAttribute('href')?.startsWith('#')
  )
    return;
  e.preventDefault();
  navigate(a.href);
}
