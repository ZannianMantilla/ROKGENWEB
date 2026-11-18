import {
  ChartColumn,
  Globe,
  Headset,
  Megaphone,
  PenTool,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { services, type ServiceIcon } from '../../data/content';
import { useT } from '../../hooks/useT';
import { SectionHeading } from '../ui/SectionHeading';

const icons: Record<ServiceIcon, LucideIcon> = {
  mobile: Smartphone,
  web: Globe,
  design: PenTool,
  data: ChartColumn,
  support: Headset,
  content: Megaphone,
};

export function Services() {
  const { t } = useT();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative border-y border-line bg-bg-soft py-24 md:py-36"
    >
      <div className="shell">
        <SectionHeading
          id="services-title"
          kicker={t(services.kicker)}
          title={t(services.title)}
          intro={t(services.intro)}
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {services.items.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.icon} className="h-full">
                <article
                  data-tilt
                  className="tilt group gradient-ring relative flex h-full flex-col overflow-hidden card p-7 sm:p-8"
                >
                  <div aria-hidden className="spotlight pointer-events-none absolute inset-0" />
                  <div className="relative flex items-start justify-between">
                    <span className="svc-icon grid size-14 place-items-center rounded-2xl border border-[color-mix(in_oklab,var(--accent-2)_35%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] text-accent-2">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted" aria-hidden>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="relative mt-8 text-2xl font-semibold">{t(s.title)}</h3>
                  <p className="relative mt-3 leading-relaxed text-muted">{t(s.description)}</p>
                  <ul className="relative mt-auto flex flex-wrap gap-2 pt-6">
                    {s.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
