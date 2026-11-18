import { useCallback } from 'react';
import type { Localized } from '../data/content';
import { useLang } from '../lib/prefs';

/** Devuelve el idioma actual y `t()` para resolver valores { es, en }. */
export function useT() {
  const lang = useLang();
  const t = useCallback(<T>(value: Localized<T>): T => value[lang], [lang]);
  return { lang, t };
}
