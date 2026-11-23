import type { CSSProperties } from 'react';
import { services } from '../../data/content';
import { useT } from '../../hooks/useT';

/**
 * Bandas cruzadas con los servicios en texto gigante. Decorativas: el contenido real está en Servicios.
 * La banda sólida recorre todas las gemas del sitio, como adelanto de lo que viene.
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
              <span className={`text-[0.55em] ${outline ? 'text-accent' : 'text-white/80'}`}>
                ✦
              </span>
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
      <div className="gem-band relative scale-110 -rotate-2 py-4 text-white sm:py-5">
        <div data-skew>{band(false, '45s')}</div>
      </div>
    </div>
  );
}
