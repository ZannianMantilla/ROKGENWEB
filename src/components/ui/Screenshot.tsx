import type { Shot } from '../../data/content';
import { useT } from '../../hooks/useT';

type Props = {
  shot: Shot;
  /** Ancho mostrado, para elegir la variante del srcset. */
  sizes: string;
  className?: string;
  /** Sin texto alternativo cuando la imagen solo acompaña a un texto que ya la describe. */
  decorative?: boolean;
  /** Imagen principal visible al cargar: se descarga de inmediato y con prioridad alta. */
  priority?: boolean;
};

function ShotImage({ shot, sizes, decorative, priority, className = '' }: Props) {
  const { t } = useT();
  return (
    <img
      src={`${shot.base}-${shot.widths[0]}.webp`}
      srcSet={shot.widths.map((w) => `${shot.base}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      width={shot.width}
      height={shot.height}
      alt={decorative ? '' : t(shot.alt)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={`block h-auto w-full ${className}`}
    />
  );
}

/** Captura dentro de un marco de navegador (escritorio) o de teléfono (móvil). */
export function DeviceFrame({ shot, sizes, decorative, priority, className = '' }: Props) {
  if (shot.device === 'mobile') {
    return (
      <div
        className={`overflow-hidden rounded-[1.6rem] border-[5px] border-[#211b36] bg-[#211b36] shadow-[var(--shadow)] ${className}`}
      >
        <ShotImage
          shot={shot}
          sizes={sizes}
          decorative={decorative}
          className="rounded-[1.25rem]"
        />
      </div>
    );
  }
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[var(--shadow)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#f87171]/80" />
        <span className="size-2.5 rounded-full bg-[#fbbf24]/80" />
        <span className="size-2.5 rounded-full bg-[#34d399]/80" />
        <span className="ml-3 h-4 flex-1 rounded-md bg-surface-2" />
      </div>
      <ShotImage shot={shot} sizes={sizes} decorative={decorative} priority={priority} />
    </div>
  );
}
