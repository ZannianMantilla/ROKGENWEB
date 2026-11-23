import { MapPin } from 'lucide-react';
import { about, profile, projects, services, detail, ui } from '../../data/content';
import { useT } from '../../hooks/useT';
import { sectionPadding, type SectionProps } from '../../lib/section';
import { ROUTES } from '../../lib/router';

import { SectionHeading } from '../ui/SectionHeading';

const { photo } = profile;
const srcset = (ext: string) =>
  photo.widths.map((w) => `${photo.base}-${w}.${ext} ${w}w`).join(', ');
const sizes = '(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 90vw';

export function About({ level = 2, more = false }: SectionProps) {
  const { t } = useT();
  const years = new Date().getFullYear() - profile.careerStartYear;

  return (
    <section
      data-tone="sapphire"
      id="about"
      aria-labelledby="about-title"
      className={`relative isolate overflow-hidden ${sectionPadding(level)}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 -right-48 -z-10 size-[38rem] aura [--p:24%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-40 -z-10 size-[30rem] aura [--p:14%] aura-fuchsia"
      />
      <div className="shell">
        <SectionHeading
          id="about-title"
          kicker={t(about.kicker)}
          title={t(about.title)}
          level={level}
          more={
            more ? { to: ROUTES.about, label: t(detail.more), context: t(ui.nav.about) } : undefined
          }
        />

        <div className="grid gap-4 lg:grid-cols-12" data-stagger>
          {/* Foto */}
          <div className="relative flex items-center justify-center overflow-hidden card p-8 sm:p-10 lg:col-span-5 lg:row-span-2">
            <div
              aria-hidden
              className="blob-spin absolute aspect-square w-[130%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-strong)_45%,transparent),transparent_70%),radial-gradient(closest-side_at_70%_70%,color-mix(in_oklab,var(--accent-2)_35%,transparent),transparent)]"
            />
            <div className="relative w-full max-w-sm" data-speed="0.4">
              <div className="blob relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-strong),var(--accent-2))] p-[3px]">
                <picture>
                  <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
                  <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
                  <img
                    src={`${photo.base}-640.webp`}
                    width={photo.width}
                    height={photo.height}
                    alt={t(about.photoAlt)}
                    loading="lazy"
                    decoding="async"
                    className="blob aspect-[4/5] w-full bg-surface-2 object-cover"
                  />
                </picture>
              </div>
              <p className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap shadow-[var(--shadow)] glass">
                <MapPin className="size-3.5 text-accent" aria-hidden />
                Santander · {profile.country}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="card p-7 sm:p-10 lg:col-span-7">
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              {t(about.bio).map((p, i) => (
                <p key={i} className={i === 0 ? 'text-fg' : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Datos clave */}
          <dl className="grid divide-y divide-line card p-3 sm:p-4 lg:col-span-7">
            {about.facts.map((f) => (
              <div
                key={f.label.es}
                className="grid gap-1 px-4 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <dt className="pt-0.5 kicker !text-muted">{t(f.label)}</dt>
                <dd className="font-medium">{t(f.value)}</dd>
              </div>
            ))}
          </dl>

          {/* Contadores */}
          <ul className="grid grid-cols-2 gap-4 lg:col-span-12 lg:grid-cols-4">
            {about.stats.map((s) => {
              const value =
                s.value === 'years'
                  ? years
                  : s.value === 'projects'
                    ? projects.items.length
                    : s.value === 'services'
                      ? services.items.length
                      : s.value;
              return (
                <li
                  key={s.label.es}
                  className="gradient-ring card p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7"
                >
                  <p className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                    <span data-count={value} className="text-gradient">
                      {value}
                    </span>
                    <span className="text-gradient">{s.suffix}</span>
                  </p>
                  <p className="mt-2 text-sm leading-snug text-muted">{t(s.label)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
