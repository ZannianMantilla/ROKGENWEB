import { ArrowDown, Code2, Megaphone, Sparkles } from 'lucide-react';
import { areas, clientSites, community, journey, projects } from '../../data/content';
import { useT } from '../../hooks/useT';
import { SectionHeading } from '../ui/SectionHeading';

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
    <section id="areas" aria-labelledby="areas-title" className="relative py-24 md:py-32">
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
