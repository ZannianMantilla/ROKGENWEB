import { ArrowUpRight } from 'lucide-react';
import { detail, services, whatsappLink } from '../../data/content';
import { useT } from '../../hooks/useT';
import {
  findTool,
  projectsForService,
  serviceAnchor,
  sitesForService,
  serviceIcons,
  toolName,
} from '../../lib/catalog';
import { ROUTES } from '../../lib/router';
import { sectionPadding } from '../../lib/section';
import { ButtonLink } from '../ui/Button';
import { Link } from '../ui/Link';
import { SectionHeading } from '../ui/SectionHeading';
import { ToolLogo } from '../ui/Tools';

/** Servicios: cada uno con sus herramientas, proyectos relacionados y cotización directa. */
export function ServicesPage() {
  const { t, lang } = useT();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className={`relative isolate overflow-hidden ${sectionPadding(1)}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 -z-10 size-[34rem] aura [--p:22%]"
      />
      <div className="shell">
        <SectionHeading
          id="services-title"
          level={1}
          kicker={t(services.kicker)}
          title={t(services.title)}
          intro={t(services.intro)}
          avatar="checklist"
        />

        <ol className="space-y-6">
          {services.items.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            const related = [
              ...projectsForService(s.icon).map((p) => ({
                id: p.id,
                title: p.title,
                detail: `${p.year} · ${t(p.type)}`,
              })),
              ...sitesForService(s.icon).map((site) => ({
                id: site.id,
                title: site.name,
                detail: new URL(site.url).hostname.replace(/^www\./, ''),
              })),
            ];
            const anchor = serviceAnchor(s.icon);
            return (
              <li key={s.icon} id={anchor} className="scroll-mt-28" data-reveal>
                <article
                  aria-labelledby={`${anchor}-title`}
                  className="group gradient-ring relative grid gap-10 overflow-hidden card p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-14"
                >
                  <span
                    aria-hidden
                    className="ticker text-outline pointer-events-none absolute -top-6 right-6 text-[8rem] opacity-20 transition-opacity duration-700 group-hover:opacity-50 sm:text-[11rem]"
                  >
                    0{i + 1}
                  </span>

                  <div className="relative">
                    <span className="svc-icon grid size-16 place-items-center rounded-2xl bg-brand text-white shadow-[0_0_32px_-4px_var(--accent-strong)]">
                      <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h2 id={`${anchor}-title`} className="mt-8 text-3xl font-semibold sm:text-4xl">
                      {t(s.title)}
                    </h2>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                      {t(s.description)}
                    </p>
                    <ButtonLink
                      href={whatsappLink(`${t(detail.quoteText)} ${t(s.title)}.`)}
                      external
                      className="mt-8"
                      icon={<ArrowUpRight className="size-4" aria-hidden />}
                    >
                      {t(detail.quote)}
                    </ButtonLink>
                  </div>

                  <div className="relative space-y-8 lg:pt-24">
                    <div>
                      <h3 className="kicker">{t(detail.tools)}</h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {s.tags.map((tag) => {
                          const tool = findTool(tag);
                          return (
                            <li
                              key={tag}
                              className="flex items-center gap-2 rounded-full border border-line bg-surface-2/70 py-1.5 pr-3.5 pl-2 text-sm"
                            >
                              {tool ? (
                                <ToolLogo item={tool} size="size-5" colored />
                              ) : (
                                <span aria-hidden className="ml-1 size-2 rounded-full bg-accent" />
                              )}
                              {tool ? toolName(tool, lang) : tag}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {related.length > 0 && (
                      <div>
                        <h3 className="kicker">{t(detail.relatedProjects)}</h3>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                          {related.map((p) => (
                            <li key={p.id}>
                              <Link
                                to={`${ROUTES.projects}#${p.id}`}
                                className="group/p flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2/40 p-4 transition-colors hover:border-accent"
                              >
                                <span>
                                  <span className="block font-semibold">{p.title}</span>
                                  <span className="block text-sm text-muted">{p.detail}</span>
                                </span>
                                <ArrowUpRight
                                  className="size-5 shrink-0 text-muted transition-transform duration-500 group-hover/p:rotate-45 group-hover/p:text-accent"
                                  aria-hidden
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
