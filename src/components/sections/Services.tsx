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
      className="relative overflow-hidden border-y border-line bg-bg-soft py-24 md:py-36"
    >
      <div aria-hidden className="absolute -top-40 -left-40 size-[34rem] aura [--p:22%]" />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 size-[28rem] aura [--p:16%] aura-fuchsia"
      />
      <div className="relative shell">
        <SectionHeading
          id="services-title"
          kicker={t(services.kicker)}
          title={t(services.title)}
          intro={t(services.intro)}
          avatar="checklist"
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
                    <span className="svc-icon grid size-14 place-items-center rounded-2xl border border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--accent-strong)_14%,transparent)] text-accent transition-[background-color,color,box-shadow] duration-500 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_32px_-4px_var(--accent-strong)]">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span
                      className="ticker text-outline -mt-2 text-6xl opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="relative mt-8 text-2xl font-semibold">{t(s.title)}</h3>
                  <p className="relative mt-3 leading-relaxed text-muted">{t(s.description)}</p>
                  <ul className="relative mt-auto flex flex-wrap gap-2 pt-6">
                    {s.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-line-strong group-hover:text-fg"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
