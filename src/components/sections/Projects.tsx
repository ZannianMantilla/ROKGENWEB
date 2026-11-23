import { lazy, Suspense, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project, detail, ui } from '../../data/content';
import { useT } from '../../hooks/useT';
import { sectionPadding, subHeadings, type SectionProps } from '../../lib/section';
import { ROUTES } from '../../lib/router';

import { SectionHeading } from '../ui/SectionHeading';
import { buttonClasses } from '../ui/buttonStyles';
import { ClientSites } from './ClientSites';
import { DeviceFrame } from '../ui/Screenshot';

/** Captura principal en un navegador y, si hay, la versión móvil superpuesta. */
function ProjectShots({ project: p, priority }: { project: Project; priority: boolean }) {
  const mobile = p.gallery?.find((s) => s.device === 'mobile');
  return (
    <div className="relative mx-auto w-full max-w-xl pb-6">
      <DeviceFrame
        shot={p.image!}
        sizes="(min-width: 1024px) 36rem, 90vw"
        priority={priority}
        className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-[-1deg]"
      />
      {mobile && (
        <DeviceFrame
          shot={mobile}
          sizes="140px"
          decorative
          className="absolute right-[-4%] bottom-[-6%] w-[26%] rotate-[5deg] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-[-6%] group-hover:rotate-[2deg]"
        />
      )}
    </div>
  );
}

// El modal solo se descarga cuando alguien abre un proyecto.
const ProjectModal = lazy(() => import('./ProjectModal'));

/** `kicker` reemplaza al de la sección (en el inicio la presenta como el área de software). */
export function Projects({ level = 2, more = false, kicker }: SectionProps & { kicker?: string }) {
  const [Sub] = subHeadings(level);
  const { t } = useT();
  const [open, setOpen] = useState<Project | null>(null);
  const L = projects.labels;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className={`relative isolate overflow-hidden ${sectionPadding(level)}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -left-48 -z-10 size-[36rem] aura [--p:22%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 bottom-40 -z-10 size-[36rem] aura [--p:16%] aura-fuchsia"
      />
      <div className="shell">
        <SectionHeading
          id="projects-title"
          kicker={kicker ?? t(projects.kicker)}
          title={t(projects.title)}
          intro={t(projects.intro)}
          avatar="proyectos"
          level={level}
          more={
            more
              ? { to: ROUTES.projects, label: t(detail.more), context: t(ui.nav.projects) }
              : undefined
          }
        />

        <ul className="space-y-6 md:space-y-8">
          {projects.items.map((p, i) => (
            <li key={p.id} data-reveal>
              <article
                aria-labelledby={`project-${p.id}`}
                className="group gradient-ring grid overflow-hidden card lg:grid-cols-2"
              >
                <div
                  className={`relative flex items-center justify-center overflow-hidden bg-surface-2/60 px-6 py-12 sm:py-16 ${
                    i % 2 ? 'lg:order-2' : ''
                  }`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-[15%] aura opacity-60 transition-opacity duration-700 [--p:40%] group-hover:opacity-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] [mask-image:radial-gradient(closest-side,#000,transparent)] bg-[size:18px_18px]"
                  />
                  <div data-speed="0.5" className="relative w-full">
                    <div data-pop>
                      <ProjectShots project={p} priority={i === 0} />
                    </div>
                  </div>
                  <div aria-hidden data-curtain className="absolute inset-0 z-10 bg-brand" />
                </div>

                <div className="relative flex flex-col overflow-hidden p-7 sm:p-10 lg:p-14">
                  <span
                    aria-hidden
                    className="ticker text-outline pointer-events-none absolute -top-4 right-4 text-[9rem] opacity-25 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:opacity-60 sm:text-[12rem]"
                  >
                    0{i + 1}
                  </span>
                  <p className="flex items-center gap-3 font-mono text-xs tracking-wider text-muted uppercase">
                    <span className="text-accent-2">{p.year}</span>
                    <span className="h-px w-6 bg-line-strong" aria-hidden />
                    {t(p.type)}
                  </p>
                  <Sub
                    id={`project-${p.id}`}
                    className="relative mt-5 text-5xl font-bold tracking-[-0.03em] transition-colors duration-500 group-hover:text-accent sm:text-6xl"
                  >
                    {p.title}
                  </Sub>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{t(p.summary)}</p>

                  {(p.stack.length > 0 || t(p.highlights).length > 0) && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {(p.stack.length ? p.stack : t(p.highlights)).map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 font-mono text-xs"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-10">
                    <button
                      type="button"
                      data-magnetic
                      data-sound="pop"
                      onClick={() => setOpen(p)}
                      className={buttonClasses('ghost')}
                      aria-haspopup="dialog"
                    >
                      <span data-magnetic-inner className="inline-flex items-center gap-2">
                        {t(L.details)}
                        <span className="sr-only">: {p.title}</span>
                        <ArrowUpRight
                          className="size-4 transition-transform duration-500 group-hover:rotate-45"
                          aria-hidden
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <ClientSites level={level} />
      </div>

      {open && (
        <Suspense fallback={null}>
          <ProjectModal project={open} onClose={() => setOpen(null)} />
        </Suspense>
      )}
    </section>
  );
}
