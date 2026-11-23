import { ArrowUpRight } from 'lucide-react';
import { clientSites, projects } from '../../data/content';
import { useT } from '../../hooks/useT';
import { subHeadings } from '../../lib/section';
import { DeviceFrame } from '../ui/Screenshot';

type Props = {
  /** Nivel del título de la página/sección que los contiene. */
  level: 1 | 2;
  /** En la página de proyectos: versión móvil superpuesta y rol. */
  detailed?: boolean;
};

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

/** Sitios web de clientes en producción, con captura y enlace al sitio. */
export function ClientSites({ level, detailed = false }: Props) {
  const { t } = useT();
  const [Title, CardTitle] = subHeadings(level);
  const L = projects.labels;

  return (
    <section aria-labelledby="client-sites-title" className="mt-20 md:mt-28">
      <div className="max-w-2xl" data-reveal>
        <Title id="client-sites-title" className="text-3xl font-semibold sm:text-4xl">
          {t(L.sitesTitle)}
        </Title>
        <p className="mt-3 text-lg leading-relaxed text-muted">{t(L.sitesIntro)}</p>
      </div>

      <ul
        className={`mt-10 grid gap-5 sm:grid-cols-2 ${detailed ? '' : 'lg:grid-cols-3'}`}
        data-stagger
      >
        {clientSites.map((site) => (
          <li key={site.id} id={site.id} className="scroll-mt-28">
            <article
              aria-labelledby={`site-${site.id}`}
              className="group gradient-ring flex h-full flex-col overflow-hidden card"
            >
              <div className="relative border-b border-line bg-surface-2/60 p-4 pb-6 sm:p-5 sm:pb-8">
                <DeviceFrame
                  shot={site.desktop}
                  sizes={
                    detailed
                      ? '(min-width: 640px) 36rem, 90vw'
                      : '(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw'
                  }
                  className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
                />
                {detailed && (
                  <DeviceFrame
                    shot={site.mobile}
                    sizes="120px"
                    decorative
                    className="absolute right-3 -bottom-3 w-[22%] rotate-[5deg] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-[2deg]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="font-mono text-xs tracking-wider text-accent-2">{host(site.url)}</p>
                <CardTitle id={`site-${site.id}`} className="mt-2 text-2xl font-semibold">
                  {site.name}
                </CardTitle>
                <p className="mt-3 leading-relaxed text-muted">{t(site.summary)}</p>
                {detailed && (
                  <p className="mt-4 text-sm">
                    <span className="kicker">{t(L.role)}</span>
                    <span className="mt-1 block">{t(site.role)}</span>
                  </p>
                )}
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 self-start pt-6 font-semibold text-accent transition-colors hover:text-fg"
                >
                  {t(L.visit)}
                  <span className="sr-only">: {site.name}</span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 group-hover:rotate-45"
                    aria-hidden
                  />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
