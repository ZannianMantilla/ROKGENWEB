import { useState } from 'react';
import { projects, type Shot } from '../../data/content';
import { useT } from '../../hooks/useT';
import { DeviceFrame } from '../ui/Screenshot';

type Props = { shots: Shot[]; sizes: string; className?: string; priority?: boolean };

/** Captura grande con miniaturas para cambiar entre las capturas del proyecto. */
export function ProjectGallery({ shots, sizes, className = '', priority = false }: Props) {
  const { t } = useT();
  const [active, setActive] = useState(0);
  const L = projects.labels;
  const current = shots[active];
  return (
    <div className={className}>
      <div className="grid min-h-[12rem] place-items-center">
        <DeviceFrame
          key={current.base}
          shot={current}
          sizes={sizes}
          priority={priority && active === 0}
          className={`anim-pop ${current.device === 'mobile' ? 'w-44 sm:w-56' : 'w-full'}`}
        />
      </div>
      <ul aria-label={t(L.screenshots)} className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {shots.map((s, i) => (
          <li key={s.base} className="shrink-0">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`${t(L.showShot)} ${i + 1}: ${t(s.alt)}`}
              className={`block overflow-hidden rounded-lg border-2 transition-[border-color,opacity] ${
                i === active ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={`${s.base}-${s.widths[0]}.webp`}
                width={s.width}
                height={s.height}
                alt=""
                loading="lazy"
                className={`h-14 w-auto ${s.device === 'mobile' ? '' : 'sm:h-16'}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
