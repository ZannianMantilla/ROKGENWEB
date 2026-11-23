import { useId } from 'react';

/**
 * El cristal del colgante del avatar: la marca del sitio (logo, favicon y viñetas).
 * Misma geometría que el ícono generado en scripts/images.mjs.
 */
export function Crystal({ className = '' }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 32" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset=".45" stopColor="#a855f7" />
          <stop offset="1" stopColor="#c026d3" />
        </linearGradient>
      </defs>
      <path d="M12 2 18.5 7.5v13L12 30l-6.5-9.5v-13Z" fill={`url(#${id}a)`} />
      <path d="M12 2 5.5 7.5v13L12 30Z" fill="#4c1d95" opacity=".45" />
      <path
        d="M12 2v28M5.5 7.5 12 11l6.5-3.5"
        stroke="#f5d0fe"
        strokeOpacity=".55"
        strokeWidth=".8"
        fill="none"
      />
      <path d="M14.6 9.6v9.6l-1.3 2.4V11Z" fill="#fff" opacity=".7" />
    </svg>
  );
}
