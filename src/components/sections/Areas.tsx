import { ArrowDown, Code2, Megaphone, Sparkles } from 'lucide-react';
import { areas, clientSites, community, journey, projects } from '../../data/content';
import type { CSSProperties } from 'react';
import { useT } from '../../hooks/useT';
import { SectionHeading } from '../ui/SectionHeading';

/**
 * Huellas de un oso cruzando la sección, una tras otra (pata izquierda y derecha).
 * path(t) da el punto del camino en % (t de 0 a 1); aspect es ancho/alto aproximado de la sección,
 * para orientar cada huella hacia donde avanza.
 */
function walk(steps: number, aspect: number, path: (t: number) => [number, number], gap: number) {
  return Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1);
    const [x, y] = path(t);
    const [x2, y2] = path(Math.min(1, t + 0.01));
    const [x1, y1] = path(Math.max(0, t - 0.01));
    const angle = Math.atan2(y2 - y1, (x2 - x1) * aspect); // en píxeles, no en %
    const side = i % 2 ? 1 : -1;
    // cada pata va un poco a un lado del camino, perpendicular a la dirección
    return {
      left: x - (side * gap * Math.sin(angle)) / aspect,
      top: y + side * gap * Math.cos(angle),
      rotate: (angle * 180) / Math.PI + 90 + side * 8,
    };
  });
}
const TAU = Math.PI * 2;
// PC: diagonal suave de abajo a la izquierda hacia arriba a la derecha.
const wide = walk(16, 2, (t) => [4 + 92 * t, 88 - 76 * t + 9 * Math.sin(t * TAU)], 2.8);
// Móvil (sección alta y angosta): sube en S de abajo hacia arriba.
const tall = walk(18, 0.3, (t) => [50 + 30 * Math.sin(t * TAU * 1.5), 97 - 94 * t], 0.8);

function PawWalk() {
  const prints = (list: typeof wide, className: string) =>
    list.map((p, i) => (
      <span
        key={className + i}
        className={`walk-print ${className}`}
        style={
          {
            left: `${p.left}%`,
            top: `${p.top}%`,
            rotate: `${p.rotate}deg`,
            '--i': i,
            '--n': list.length,
          } as CSSProperties
        }
      />
    ));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {prints(wide, 'max-md:hidden')}
      {prints(tall, 'md:hidden')}
    </div>
  );
}

const icons = { projects: Code2, community: Megaphone, other: Sparkles };

/** Resumen de las tres áreas del inicio; cada tarjeta baja a su sección. */
export function Areas() {
  const { t, lang } = useT();
  const es = lang === 'es';
  const followers = community.accounts.reduce((n, a) => n + (a.followers ?? 0), 0);
  const facts = {
    projects: es
      ? `${projects.items.length} proyectos · ${clientSites.length} sitios para clientes`
      : `${projects.items.length} projects · ${clientSites.length} client websites`,
    community: es
      ? `${community.accounts.length} marcas · ${followers.toLocaleString('es-CO')} seguidores`
      : `${community.accounts.length} brands · ${followers.toLocaleString('en-US')} followers`,
    other: es
      ? `${journey.courses.length} cursos · ${journey.languages.length} idiomas`
      : `${journey.courses.length} courses · ${journey.languages.length} languages`,
  };

  return (
    <section id="areas" aria-labelledby="areas-title" className="relative isolate py-24 md:py-32">
      <PawWalk />
      <div className="shell">
        <SectionHeading id="areas-title" kicker={t(areas.kicker)} title={t(areas.title)} />
        <ol className="grid gap-4 md:grid-cols-3" data-stagger>
          {areas.items.map((a, i) => {
            const Icon = icons[a.id];
            return (
              <li key={a.id} className="h-full">
                <a
                  href={`#${a.id}`}
                  data-tilt
                  className="tilt group gradient-ring relative flex h-full flex-col overflow-hidden card p-7 sm:p-8"
                >
                  <div aria-hidden className="spotlight pointer-events-none absolute inset-0" />
                  <div className="relative flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_0_32px_-4px_var(--accent-strong)]">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="ticker text-outline -mt-2 text-6xl opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="relative mt-8 text-2xl font-semibold transition-colors group-hover:text-accent">
                    {t(a.title)}
                  </h3>
                  <p className="relative mt-3 leading-relaxed text-muted">{t(a.description)}</p>
                  <p className="relative mt-auto flex items-center justify-between gap-3 pt-8 font-mono text-xs tracking-wider text-accent-2 uppercase">
                    {facts[a.id]}
                    <ArrowDown
                      className="size-4 shrink-0 transition-transform group-hover:translate-y-1"
                      aria-label={t(areas.go)}
                    />
                  </p>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
