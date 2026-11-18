import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useMediaQuery';

type Props = { words: string[]; startDelay?: number };

/**
 * Rotador con efecto máquina de escribir. El texto animado es aria-hidden;
 * los lectores de pantalla reciben todas las frases de una vez.
 */
export function Typewriter({ words, startDelay = 2600 }: Props) {
  const reduced = useReducedMotion();
  const [s, setS] = useState({ i: 0, len: words[0].length, deleting: false, started: false });

  useEffect(() => {
    if (reduced) return;
    const word = words[s.i % words.length];
    let delay = s.deleting ? 32 : 65;
    if (!s.started) delay = startDelay;
    else if (!s.deleting && s.len === word.length) delay = 1900;
    else if (s.deleting && s.len === 0) delay = 280;

    const id = setTimeout(() => {
      setS((p) => {
        const w = words[p.i % words.length];
        if (!p.started) return { ...p, started: true, deleting: true };
        if (!p.deleting && p.len === w.length) return { ...p, deleting: true };
        if (p.deleting && p.len === 0) {
          const i = (p.i + 1) % words.length;
          return { ...p, i, deleting: false };
        }
        return { ...p, len: p.len + (p.deleting ? -1 : 1) };
      });
    }, delay);
    return () => clearTimeout(id);
  }, [s, words, reduced, startDelay]);

  const text = words[s.i % words.length].slice(0, s.len);

  return (
    <>
      <span className="sr-only">{words.join('. ')}</span>
      <span aria-hidden className="whitespace-nowrap">
        {text}
        <span className="caret" />
      </span>
    </>
  );
}
