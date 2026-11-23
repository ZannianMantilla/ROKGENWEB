import type { ReactNode } from 'react';
import { Briefcase, GraduationCap, type LucideIcon } from 'lucide-react';
import { journey, type TimelineEntry, detail, ui } from '../../data/content';
import { useT } from '../../hooks/useT';
import { sectionPadding, subHeadings, type SectionProps } from '../../lib/section';
import { ROUTES } from '../../lib/router';
import { SectionHeading } from '../ui/SectionHeading';

function Timeline({
  id,
  title,
  icon: Icon,
  items,
  level,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  items: TimelineEntry[];
  level: 1 | 2;
}) {
  const { t } = useT();
  const [Sub, SubSub] = subHeadings(level);
  return (
    <section aria-labelledby={id}>
      <Sub id={id} className="mb-10 flex items-center gap-3 text-2xl font-semibold" data-reveal>
        <span className="grid size-11 place-items-center rounded-xl bg-brand text-white shadow-[0_0_24px_-4px_var(--accent-strong)]">
          <Icon className="size-5" aria-hidden />
        </span>
        {title}
      </Sub>
      <ol className="relative">
        {/* Línea base + línea que se dibuja con el scroll */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
        <span
          aria-hidden
          data-line
          className="absolute top-2 bottom-2 left-[6px] w-[3px] origin-top rounded-full bg-[linear-gradient(var(--accent),var(--accent-2),var(--accent-3))] shadow-[0_0_14px_var(--accent-strong)]"
        />
        {items.map((it) => (
          <li
            key={`${it.org}-${it.title.es}`}
            className="group relative pb-10 pl-10 last:pb-0"
            data-reveal
          >
            <span
              aria-hidden
              className="dot-pulse absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_var(--bg-soft),0_0_16px_var(--accent-strong)]"
            />
            <p className="font-mono text-xs tracking-wider text-accent-2 uppercase">
              {t(it.period)}
            </p>
            <SubSub className="mt-2 font-display text-xl font-semibold transition-colors duration-300 group-hover:text-accent">
              {t(it.title)}
            </SubSub>
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

/** `extra` se muestra entre el encabezado y la línea de tiempo (cifras en la página propia). */
export function Journey({ level = 2, more = false, extra }: SectionProps & { extra?: ReactNode }) {
  const [Sub] = subHeadings(level);
  const { t } = useT();
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className={`relative border-y border-line bg-bg-soft ${sectionPadding(level)}`}
    >
      <div className="shell">
        <SectionHeading
          id="experience-title"
          kicker={t(journey.kicker)}
          title={t(journey.title)}
          avatar="pulgar"
          level={level}
          more={
            more
              ? { to: ROUTES.experience, label: t(detail.more), context: t(ui.nav.experience) }
              : undefined
          }
        />
        {extra}

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Timeline
            id="exp-title"
            title={t(journey.experienceTitle)}
            icon={Briefcase}
            items={journey.experience}
            level={level}
          />

          <div className="space-y-16">
            <Timeline
              id="edu-title"
              title={t(journey.educationTitle)}
              icon={GraduationCap}
              items={journey.education}
              level={level}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" data-stagger>
              <section aria-labelledby="courses-title" className="gradient-ring card p-7">
                <Sub id="courses-title" className="text-lg font-semibold">
                  {t(journey.coursesTitle)}
                </Sub>
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
              <section aria-labelledby="languages-title" className="gradient-ring card p-7">
                <Sub id="languages-title" className="text-lg font-semibold">
                  {t(journey.languagesTitle)}
                </Sub>
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
