import type { CSSProperties } from 'react';
import { services } from '../../data/content';
import { useT } from '../../hooks/useT';
import { Paw } from '../ui/Paw';

/**
 * Bandas cruzadas con los servicios en texto gigante. Decorativas: el contenido real está en Servicios.
 */
export function Ticker() {
  const { t } = useT();
  const words = services.items.map((s) => t(s.title));

  const band = (outline: boolean, duration: string, reverse = false) => (
    <div
      className="ticker-track ticker text-4xl sm:text-6xl lg:text-7xl"
      style={
        { '--duration': duration, '--direction': reverse ? 'reverse' : 'normal' } as CSSProperties
      }
    >
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          {words.map((w) => (
            <li key={w} className="flex items-center gap-8 whitespace-nowrap sm:gap-12">
              <span className={outline ? 'text-outline' : undefined}>{w}</span>
              <Paw
                className={`size-[0.5em] shrink-0 ${outline ? 'text-accent' : 'text-accent-3'}`}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );

  return (
    <div aria-hidden className="relative z-10 overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 scale-110 rotate-[3deg] border-y border-line-strong bg-bg-soft py-4 sm:py-5">
        <div data-skew>{band(true, '60s', true)}</div>
      </div>
      <div className="relative scale-110 -rotate-2 bg-[linear-gradient(90deg,var(--accent-strong),#a21caf,var(--accent-strong))] py-4 text-white shadow-[0_20px_80px_-20px_var(--accent-strong)] sm:py-5">
        <div data-skew>{band(false, '45s')}</div>
      </div>
    </div>
  );
}
