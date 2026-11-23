import { ArrowRight } from 'lucide-react';
import { journey, otherSkills, services } from '../../data/content';
import { serviceIcons } from '../../lib/catalog';
import { useT } from '../../hooks/useT';
import { ROUTES } from '../../lib/router';
import { sectionPadding, subHeadings, type SectionProps } from '../../lib/section';
import { SectionHeading } from '../ui/SectionHeading';
import { Link } from '../ui/Link';

/** Área de otros conocimientos: servicios fuera del desarrollo, cursos e idiomas (datos ya existentes). */
export function OtherSkills({ level = 2 }: SectionProps) {
  const [Sub] = subHeadings(level);
  const { t } = useT();
  const items = services.items.filter((s) => otherSkills.services.includes(s.icon));

  return (
    <section
      id="other"
      aria-labelledby="other-title"
      className={`relative overflow-hidden ${sectionPadding(level)}`}
    >
      <div aria-hidden className="absolute -bottom-40 -left-40 size-[34rem] aura [--p:18%]" />
      <div className="relative shell">
        <SectionHeading
          id="other-title"
          kicker={t(otherSkills.kicker)}
          title={t(otherSkills.title)}
          intro={t(otherSkills.intro)}
          avatar="checklist"
          level={level}
        />

        <ul className="grid gap-4 md:grid-cols-3" data-stagger>
          {items.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li key={s.icon} className="gradient-ring flex flex-col card p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand text-white shadow-[0_0_24px_-4px_var(--accent-strong)]">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <Sub className="mt-6 text-xl font-semibold">{t(s.title)}</Sub>
                <p className="mt-3 leading-relaxed text-muted">{t(s.description)}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {s.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 grid gap-4 md:grid-cols-3" data-stagger>
          <section aria-labelledby="other-courses" className="gradient-ring card p-7 md:col-span-2">
            <Sub id="other-courses" className="text-lg font-semibold">
              {t(journey.coursesTitle)}
            </Sub>
            <ul className="mt-5 flex flex-wrap gap-2">
              {journey.courses.map((c) => (
                <li
                  key={c.es}
                  className="rounded-full border border-line-strong bg-[color-mix(in_oklab,var(--accent-strong)_10%,transparent)] px-3.5 py-1.5 text-sm"
                >
                  {t(c)}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="other-languages" className="gradient-ring card p-7">
            <Sub id="other-languages" className="text-lg font-semibold">
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

        <Link
          to={ROUTES.stack}
          className="group mt-8 inline-flex items-center gap-2 font-medium text-accent hover:text-fg"
        >
          {t(otherSkills.stackLink)}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
