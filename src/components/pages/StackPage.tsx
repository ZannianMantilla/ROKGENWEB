import { detail, stack } from '../../data/content';
import { useT } from '../../hooks/useT';
import {
  projectsForTool,
  serviceAnchor,
  servicesForTool,
  sitesForTool,
  toolName,
} from '../../lib/catalog';
import { ROUTES } from '../../lib/router';
import { sectionPadding } from '../../lib/section';
import { Link } from '../ui/Link';
import { SectionHeading } from '../ui/SectionHeading';
import { ToolLogo, ToolMarquee } from '../ui/Tools';

const chip =
  'inline-flex rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:border-accent hover:text-accent';

/** Stack: cada herramienta con los servicios y proyectos en los que aparece. */
export function StackPage() {
  const { t, lang } = useT();
  const all = stack.groups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className={`relative isolate overflow-hidden ${sectionPadding(1)}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 size-[44rem] -translate-x-1/2 aura [--p:18%]"
      />
      <div className="shell">
        <SectionHeading
          id="stack-title"
          level={1}
          kicker={t(stack.kicker)}
          title={t(stack.title)}
          intro={t(stack.intro)}
        />
      </div>

      <div className="space-y-3" aria-hidden data-reveal>
        <ToolMarquee items={all.slice(0, half)} lang={lang} />
        <ToolMarquee items={all.slice(half)} reverse lang={lang} />
      </div>

      <div className="shell mt-20 space-y-20">
        {stack.groups.map((g) => (
          <section key={g.id} aria-labelledby={`tools-${g.id}`}>
            <h2
              id={`tools-${g.id}`}
              className="flex items-baseline gap-4 text-3xl font-semibold sm:text-4xl"
              data-reveal
            >
              {t(g.name)}
              <span className="font-mono text-sm font-normal text-muted">{g.items.length}</span>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {g.items.map((it) => {
                const svc = servicesForTool(it);
                const prj = [
                  ...projectsForTool(it).map((p) => ({ id: p.id, title: p.title })),
                  ...sitesForTool(it).map((site) => ({ id: site.id, title: site.name })),
                ];
                return (
                  <li key={toolName(it, 'es')}>
                    <article
                      data-tilt
                      className="tilt group gradient-ring relative h-full overflow-hidden card p-6 sm:p-7"
                    >
                      <div aria-hidden className="spotlight pointer-events-none absolute inset-0" />
                      <div className="relative flex items-center gap-4">
                        <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 transition-transform duration-500 group-hover:-rotate-6">
                          <ToolLogo item={it} size="size-7" colored />
                        </span>
                        <h3 className="text-xl font-semibold">{toolName(it, lang)}</h3>
                      </div>
                      {svc.length + prj.length > 0 && (
                        <>
                          <p className="relative mt-6 kicker !text-muted">{t(detail.usedIn)}</p>
                          <ul className="relative mt-3 flex flex-wrap gap-2">
                            {svc.map((s) => (
                              <li key={s.icon}>
                                <Link
                                  to={`${ROUTES.services}#${serviceAnchor(s.icon)}`}
                                  className={`${chip} border-line text-muted`}
                                >
                                  {t(s.title)}
                                </Link>
                              </li>
                            ))}
                            {prj.map((p) => (
                              <li key={p.id}>
                                <Link
                                  to={`${ROUTES.projects}#${p.id}`}
                                  className={`${chip} border-accent/40 bg-accent/10 text-fg`}
                                >
                                  {p.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {it.course && (
                        <>
                          <p className="relative mt-6 kicker !text-muted">{t(detail.learnedIn)}</p>
                          <Link
                            to={ROUTES.experience}
                            className={`${chip} relative mt-3 border-line text-muted`}
                          >
                            {t(it.course)}
                          </Link>
                        </>
                      )}
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
