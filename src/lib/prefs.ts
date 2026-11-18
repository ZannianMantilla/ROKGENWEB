/**
 * Preferencias de idioma y tema como stores externos (useSyncExternalStore).
 * El servidor siempre renderiza ES + oscuro; el cliente corrige tras hidratar sin errores de mismatch.
 * El script inline de index.html ya aplica `lang` y `data-theme` antes del primer paint.
 */
import { useSyncExternalStore } from 'react';
import { seo, type Lang } from '../data/content';

type Theme = 'light' | 'dark';

function createStore<T>(read: () => T, server: T) {
  const listeners = new Set<() => void>();
  return {
    subscribe(cb: () => void) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    get: read,
    server: () => server,
    emit() {
      listeners.forEach((l) => l());
    },
  };
}

const safeStorage = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* modo privado: sin persistencia */
    }
  },
};

/* ---------- Idioma ---------- */
const langStore = createStore<Lang>(
  () => (document.documentElement.lang === 'en' ? 'en' : 'es'),
  'es',
);

export function setLang(lang: Lang) {
  const root = document.documentElement;
  root.lang = lang;
  document.title = seo.title[lang];
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', seo.description[lang]);
  safeStorage.set('lang', lang);
  langStore.emit();
}

export function useLang() {
  return useSyncExternalStore(langStore.subscribe, langStore.get, langStore.server);
}

/* ---------- Tema ---------- */
const themeStore = createStore<Theme>(
  () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'),
  'dark',
);

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#f6f6fa' : '#0b0b12');
  themeStore.emit();
  window.dispatchEvent(new CustomEvent('themechange'));
}

export function setTheme(theme: Theme) {
  safeStorage.set('theme', theme);
  applyTheme(theme);
}

/** Si el usuario no eligió tema, sigue los cambios del sistema. */
export function followSystemTheme() {
  const mq = matchMedia('(prefers-color-scheme: light)');
  const onChange = () => {
    if (!safeStorage.get('theme')) applyTheme(mq.matches ? 'light' : 'dark');
  };
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

export function useTheme() {
  return useSyncExternalStore(themeStore.subscribe, themeStore.get, themeStore.server);
}
