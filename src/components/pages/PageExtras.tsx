import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { contact, detail, hero, pageNav, ui, whatsappLink } from '../../data/content';
import { useT } from '../../hooks/useT';
import { PAGE_ORDER, ROUTES, type RouteId } from '../../lib/router';
import { Link } from '../ui/Link';
import { buttonClasses } from '../ui/buttonStyles';
import { ButtonLink } from '../ui/Button';

/** Cierre de cada página interna: invitación a escribir. */
export function PageCta() {
  const { t } = useT();
  return (
    <section aria-labelledby="page-cta" className="shell pb-24 md:pb-32">
      <div
        className="relative isolate overflow-hidden rounded-[2rem] border border-line-strong bg-surface px-6 py-14 text-center sm:px-14 sm:py-20"
        data-reveal
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 aura [--p:30%]"
        />
        <p className="kicker">{t(hero.kicker)}</p>
        <h2 id="page-cta" className="mx-auto mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">
          {t(contact.title)}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{t(contact.intro)}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href={whatsappLink(t(hero.whatsappText))}
            external
            icon={<ArrowUpRight className="size-4" aria-hidden />}
          >
            {t(hero.ctaPrimary)}
          </ButtonLink>
          <ButtonLink
            href={ROUTES.contact}
            variant="ghost"
            icon={<ArrowRight className="size-4" aria-hidden />}
          >
            {t(detail.ctaGoContact)}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** Enlace grande a la página siguiente, al final de cada página interna. */
export function NextPage({ current }: { current: RouteId }) {
  const { t } = useT();
  const pages = PAGE_ORDER.filter((id) => id !== 'home');
  const index = pages.indexOf(current as (typeof pages)[number]);
  const next = index >= 0 ? pages[index + 1] : undefined;
  if (!next) return null;
  return (
    <nav aria-label={t(pageNav.next)} className="border-t border-line">
      <Link
        to={ROUTES[next]}
        className="group shell flex items-center justify-between gap-6 py-14 md:py-20"
      >
        <span>
          <span className="block kicker">{t(pageNav.next)}</span>
          <span className="mt-3 block font-display text-5xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-accent sm:text-7xl">
            {t(ui.nav[next])}
          </span>
        </span>
        <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line-strong transition-[background-color,border-color,transform] duration-500 group-hover:translate-x-2 group-hover:border-transparent group-hover:bg-brand sm:size-24">
          <ArrowRight className="size-6 sm:size-8" aria-hidden />
        </span>
      </Link>
    </nav>
  );
}

export function NotFound() {
  const { t } = useT();
  const N = pageNav.notFound;
  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center overflow-hidden pt-28 pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[36rem] -translate-x-1/2 aura [--p:30%]"
      />
      <div className="shell text-center">
        <p
          aria-hidden
          className="ticker text-outline flex items-center justify-center gap-[0.08em] text-[clamp(6rem,24vw,14rem)]"
        >
          4
          <img
            src={`${import.meta.env.BASE_URL}assets/generated/logo-192.webp`}
            width={163}
            height={192}
            alt=""
            className="bear-lost h-[0.85em] w-auto"
          />
          4
        </p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{t(N.title)}</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">{t(N.body)}</p>
        <Link to={ROUTES.home} className={`${buttonClasses('primary')} mt-10`}>
          <ArrowLeft className="size-4" aria-hidden /> {t(N.cta)}
        </Link>
      </div>
    </section>
  );
}
