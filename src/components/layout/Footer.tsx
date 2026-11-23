import { ArrowUp } from 'lucide-react';
import { footer, profile, ui } from '../../data/content';
import { PAGE_ORDER, ROUTES } from '../../lib/router';
import { Link } from '../ui/Link';
import { useT } from '../../hooks/useT';

export function Footer() {
  const { t } = useT();
  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-80 w-[60rem] max-w-full -translate-x-1/2 aura [--p:30%]"
      />
      <p
        aria-hidden
        className="ticker pointer-events-none pt-12 text-center text-[clamp(4rem,19vw,17rem)] whitespace-nowrap select-none"
        data-reveal
      >
        <span className="text-outline">{profile.name.split(' ')[0]}</span>
        <span className="text-gradient">.</span>
      </p>
      <nav aria-label={t(ui.footerNav)} className="shell">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-line pb-8 text-sm">
          {PAGE_ORDER.map((id) => (
            <li key={id}>
              <Link to={ROUTES[id]} className="text-muted transition-colors hover:text-accent">
                {t(id === 'home' ? ui.home : ui.nav[id])}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {t(footer.tagline)} © {new Date().getFullYear()}
          </p>
        </div>
        <a
          href="#main"
          data-magnetic
          className="group inline-flex items-center self-start rounded-full border border-line-strong py-2 pr-2 pl-5 text-sm font-medium transition-colors hover:border-accent sm:self-auto"
        >
          <span data-magnetic-inner className="inline-flex items-center gap-3">
            {t(footer.backToTop)}
            <span className="grid size-9 place-items-center rounded-full bg-surface-2 transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp className="size-4" aria-hidden />
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
}
