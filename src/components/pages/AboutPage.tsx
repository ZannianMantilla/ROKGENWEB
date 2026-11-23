import { ArrowRight, MapPin } from 'lucide-react';
import { detail, journey, profile, stack } from '../../data/content';
import { useT } from '../../hooks/useT';
import { toolName } from '../../lib/catalog';
import { ROUTES } from '../../lib/router';
import { About } from '../sections/About';
import { Link } from '../ui/Link';
import { ToolLogo } from '../ui/Tools';

const moreLink =
  'group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-fg';

/** Sobre mí: perfil completo + formación, idiomas, ubicación y herramientas principales. */
export function AboutPage() {
  const { t, lang } = useT();
  const mainTools = stack.groups.flatMap((g) => g.items).filter((it) => it.brand);

  return (
    <>
      <About level={1} />
      <div className="shell grid gap-4 pb-24 md:pb-32 lg:grid-cols-3" data-stagger>
        <section aria-labelledby="about-education" className="gradient-ring card p-7 sm:p-9">
          <h2 id="about-education" className="text-2xl font-semibold">
            {t(detail.education)}
          </h2>
          <ol className="mt-6 space-y-5">
            {journey.education.map((e) => (
              <li key={e.title.es} className="border-l-2 border-accent/50 pl-4">
                <p className="font-mono text-xs tracking-wider text-accent-2 uppercase">
                  {t(e.period)}
                </p>
                <p className="mt-1 font-semibold">{t(e.title)}</p>
                <p className="text-sm text-muted">{e.org}</p>
              </li>
            ))}
          </ol>
          <Link to={ROUTES.experience} className={moreLink}>
            {t(detail.seeJourney)}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </section>

        <div className="grid gap-4">
          <section aria-labelledby="about-languages" className="gradient-ring card p-7 sm:p-9">
            <h2 id="about-languages" className="text-2xl font-semibold">
              {t(journey.languagesTitle)}
            </h2>
            <ul className="mt-6 space-y-3">
              {journey.languages.map((l) => (
                <li key={l.name.es} className="flex items-center justify-between gap-3">
                  <span className="font-medium">{t(l.name)}</span>
                  <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-xs">
                    {t(l.level)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="about-where" className="gradient-ring card p-7 sm:p-9">
            <h2 id="about-where" className="text-2xl font-semibold">
              {t(detail.whereIAm)}
            </h2>
            <ul className="mt-6 space-y-3">
              {profile.locations.map((place) => (
                <li key={place} className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
                  {place}
                </li>
              ))}
            </ul>
            <p className="mt-3 pl-7 text-sm text-muted">{profile.country}</p>
          </section>
        </div>

        <section aria-labelledby="about-tools" className="gradient-ring card p-7 sm:p-9">
          <h2 id="about-tools" className="text-2xl font-semibold">
            {t(detail.mainTools)}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {mainTools.map((it) => (
              <li
                key={toolName(it, 'es')}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2/60 p-3 text-sm font-medium"
              >
                <ToolLogo item={it} size="size-6" colored />
                {toolName(it, lang)}
              </li>
            ))}
          </ul>
          <Link to={ROUTES.stack} className={moreLink}>
            {t(detail.seeStack)}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </section>
      </div>
    </>
  );
}
