import { Briefcase, GraduationCap, type LucideIcon } from 'lucide-react';
import { journey, type TimelineEntry } from '../../data/content';
import { useT } from '../../hooks/useT';
import { SectionHeading } from '../ui/SectionHeading';

function Timeline({
  id,
  title,
  icon: Icon,
  items,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  items: TimelineEntry[];
}) {
  const { t } = useT();
  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="mb-10 flex items-center gap-3 text-2xl font-semibold" data-reveal>
        <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-accent">
          <Icon className="size-5" aria-hidden />
        </span>
        {title}
      </h3>
      <ol className="relative">
        {/* Línea base + línea que se dibuja con el scroll */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
        <span
          aria-hidden
          data-line
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-[linear-gradient(var(--accent),var(--accent-2))]"
        />
        {items.map((it) => (
          <li
            key={`${it.org}-${it.title.es}`}
            className="relative pb-10 pl-10 last:pb-0"
            data-reveal
          >
            <span
              aria-hidden
              className="absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_var(--bg)]"
            />
            <p className="font-mono text-xs tracking-wider text-accent-2 uppercase">
              {t(it.period)}
            </p>
            <h4 className="mt-2 font-display text-xl font-semibold">{t(it.title)}</h4>
            <p className="mt-1 text-sm font-medium text-muted">{it.org}</p>
            {it.description && (
              <p className="mt-3 leading-relaxed text-muted">{t(it.description)}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Journey() {
  const { t } = useT();
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative border-y border-line bg-bg-soft py-24 md:py-36"
    >
      <div className="shell">
        <SectionHeading id="experience-title" kicker={t(journey.kicker)} title={t(journey.title)} />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Timeline
            id="exp-title"
            title={t(journey.experienceTitle)}
            icon={Briefcase}
            items={journey.experience}
          />

          <div className="space-y-16">
            <Timeline
              id="edu-title"
              title={t(journey.educationTitle)}
              icon={GraduationCap}
              items={journey.education}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" data-stagger>
              <section aria-labelledby="courses-title" className="card p-7">
                <h3 id="courses-title" className="text-lg font-semibold">
                  {t(journey.coursesTitle)}
                </h3>
                <ul className="mt-5 space-y-3">
                  {journey.courses.map((c) => (
                    <li key={c.es} className="flex gap-3 text-sm leading-snug text-muted">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-2"
                        aria-hidden
                      />
                      {t(c)}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="languages-title" className="card p-7">
                <h3 id="languages-title" className="text-lg font-semibold">
                  {t(journey.languagesTitle)}
                </h3>
                <ul className="mt-5 space-y-3">
                  {journey.languages.map((l) => (
                    <li key={l.name.es} className="flex items-center justify-between gap-3 text-sm">
                      <span>{t(l.name)}</span>
                      <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-xs">
                        {t(l.level)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
