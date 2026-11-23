/**
 * Preferencia de idioma como store externo (useSyncExternalStore).
 * El servidor siempre renderiza ES; el cliente corrige tras hidratar sin errores de mismatch.
 * El script inline de index.html ya aplica `lang` antes del primer paint.
 */
import { useSyncExternalStore } from 'react';
import type { Lang } from '../data/content';

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

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* modo privado: sin persistencia */
  }
}

/* ---------- Idioma ---------- */
const langStore = createStore<Lang>(
  () => (document.documentElement.lang === 'en' ? 'en' : 'es'),
  'es',
);

export function setLang(lang: Lang) {
  const root = document.documentElement;
  root.lang = lang;
  save('lang', lang);
  langStore.emit();
}

export function useLang() {
  return useSyncExternalStore(langStore.subscribe, langStore.get, langStore.server);
}

/* ---------- Sonidos (activos salvo que el visitante los apague) ---------- */
const readSound = () => {
  try {
    return localStorage.getItem('sound') !== 'off';
  } catch {
    return true;
  }
};
const soundStore = createStore<boolean>(readSound, true);

export const soundOn = readSound;

export function setSound(on: boolean) {
  save('sound', on ? 'on' : 'off');
  soundStore.emit();
}

export function useSound() {
  return useSyncExternalStore(soundStore.subscribe, soundStore.get, soundStore.server);
}
