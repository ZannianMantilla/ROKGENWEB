import { ArrowUpRight, Check } from 'lucide-react';
import { detail, hero, projects, services, whatsappLink, type Project } from '../../data/content';
import { useT } from '../../hooks/useT';
import { findTool, serviceAnchor, toolName } from '../../lib/catalog';
import { ROUTES } from '../../lib/router';
import { sectionPadding } from '../../lib/section';
import { ProjectGallery } from '../sections/ProjectGallery';
import { ClientSites } from '../sections/ClientSites';
import { ProjectMockup } from '../sections/ProjectMockup';
import { BrandIcon } from '../ui/BrandIcon';
import { Link } from '../ui/Link';
import { DeviceFrame } from '../ui/Screenshot';
import { SectionHeading } from '../ui/SectionHeading';
import { ToolLogo } from '../ui/Tools';
import { buttonClasses } from '../ui/buttonStyles';

/** Proyectos: cada uno como caso completo, con capturas, descripción, puntos clave y stack. */
export function ProjectsPage() {
  const { t } = useT();
  return (
    <section
      data-tone="rose"
      id="projects"
      aria-labelledby="projects-title"
      className={`relative isolate overflow-x-clip ${sectionPadding(1)}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -left-48 -z-10 size-[36rem] aura [--p:22%]"
      />
      <div className="shell">
        <SectionHeading
          id="projects-title"
          level={1}
          kicker={t(projects.kicker)}
          title={t(projects.title)}
          intro={t(projects.intro)}
          avatar="proyectos"
        />
        <ol className="space-y-8 md:space-y-10">
          {projects.items.map((p, i) => (
            <li key={p.id} id={p.id} className="scroll-mt-28" data-reveal>
              <ProjectCase project={p} index={i} />
            </li>
          ))}
        </ol>
        <ClientSites level={1} detailed />
      </div>
    </section>
  );
}

function ProjectCase({ project: p, index }: { project: Project; index: number }) {
  const { t, lang } = useT();
  const L = projects.labels;
  const titleId = `case-${p.id}`;
  const relatedServices = services.items.filter((s) => p.services?.includes(s.icon));

  return (
    <article
      aria-labelledby={titleId}
      className="group gradient-ring grid overflow-clip card lg:grid-cols-[1.25fr_1fr]"
    >
      <div className="relative border-b border-line bg-surface-2/60 p-5 sm:p-8 lg:border-r lg:border-b-0 lg:p-10">
        <div className="lg:sticky lg:top-28">
          {p.gallery?.length ? (
            <ProjectGallery
              shots={p.gallery}
              sizes="(min-width: 1024px) 40rem, 92vw"
              priority={index === 0}
            />
          ) : p.image ? (
            <DeviceFrame shot={p.image} sizes="(min-width: 1024px) 40rem, 92vw" />
          ) : (
            p.mockup && (
              <div className="grid place-items-center py-6">
                <ProjectMockup kind={p.mockup} lang={lang} className="w-full max-w-sm" />
                <span className="mt-6 font-mono text-[0.65rem] tracking-wider text-muted uppercase">
                  {t(L.illustrative)}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative overflow-hidden p-7 sm:p-10 lg:p-12">
        <span
          aria-hidden
          className="ticker text-outline pointer-events-none absolute -top-4 right-4 text-[9rem] opacity-20 transition-opacity duration-700 group-hover:opacity-50 sm:text-[11rem]"
        >
          0{index + 1}
        </span>
        <p className="relative flex items-center gap-3 font-mono text-xs tracking-wider text-muted uppercase">
          <span className="text-accent-2">{p.year}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden />
          {t(p.type)}
        </p>
        <h2
          id={titleId}
          className="relative mt-5 text-4xl font-bold tracking-[-0.03em] sm:text-5xl"
        >
          {p.title}
        </h2>
        <p className="relative mt-5 leading-relaxed text-muted">{t(p.description)}</p>

        <h3 className="mt-8 kicker">{t(L.highlights)}</h3>
        <ul className="mt-3 space-y-2">
          {t(p.highlights).map((h) => (
            <li key={h} className="flex items-start gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              {h}
            </li>
          ))}
        </ul>

        {p.stack.length > 0 && (
          <>
            <h3 className="mt-8 kicker">{t(L.stack)}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((tech) => {
                const tool = findTool(tech);
                return (
                  <li
                    key={tech}
                    className="flex items-center gap-2 rounded-full border border-line bg-surface-2/70 py-1 pr-3 pl-1.5 font-mono text-xs"
                  >
                    {tool ? (
                      <ToolLogo item={tool} size="size-4" colored />
                    ) : (
                      <span aria-hidden className="ml-1 size-1.5 rounded-full bg-accent" />
                    )}
                    {tool ? toolName(tool, lang) : tech}
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {p.role && (
          <>
            <h3 className="mt-8 kicker">{t(L.role)}</h3>
            <p className="mt-2">{t(p.role)}</p>
          </>
        )}

        {relatedServices.length > 0 && (
          <>
            <h3 className="mt-8 kicker">{t(detail.relatedService)}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {relatedServices.map((s) => (
                <li key={s.icon}>
                  <Link
                    to={`${ROUTES.services}#${serviceAnchor(s.icon)}`}
                    className="inline-flex rounded-full border border-line px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {t(s.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {p.demoUrl && (
            <a
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('primary')}
            >
              {t(L.demo)} <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
          {p.repoUrl && (
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('ghost')}
            >
              <BrandIcon name="github" className="size-4" /> {t(L.repo)}
            </a>
          )}
          <a
            href={whatsappLink(`${t(hero.whatsappText)} (${p.title})`)}
            target="_blank"
            rel="noopener noreferrer"
            className={p.demoUrl ? buttonClasses('ghost') : buttonClasses('primary')}
          >
            {t(L.talk)} <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </article>
  );
}
