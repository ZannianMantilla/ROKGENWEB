import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Menu, X } from 'lucide-react';
import { hero, profile, ui, whatsappLink } from '../../data/content';
import { setLang } from '../../lib/prefs';
import { useT } from '../../hooks/useT';
import { ROUTES, type RouteId } from '../../lib/router';
import { Link } from '../ui/Link';

const PAGES = ['about', 'services', 'stack', 'projects', 'experience', 'contact'] as const;

export function Navbar({ route }: { route: RouteId }) {
  const { t, lang } = useT();
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => menuRef.current?.close();
  const links = PAGES.map((id) => ({ id, label: t(ui.nav[id]) }));

  const controls = (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
        className="grid h-11 min-w-11 place-items-center rounded-full px-2 font-mono text-xs font-semibold tracking-widest text-muted transition-colors hover:text-fg"
        lang={lang === 'es' ? 'en' : 'es'}
      >
        <span aria-hidden>{lang === 'es' ? 'EN' : 'ES'}</span>
        <span className="sr-only">{t(ui.langSwitch)}</span>
      </button>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 [view-transition-name:site-header] ${
        scrolled ? 'border-x-0 border-t-0 glass' : 'border-transparent'
      }`}
    >
      <nav
        aria-label={t(ui.mainNav)}
        className="shell flex h-16 items-center justify-between gap-4"
      >
        <Link to={ROUTES.home} className="group flex items-center gap-3" data-sound="growl">
          <span className="sr-only">{`${profile.shortName} — ${t(ui.home)}`}</span>
          {/* El oso es el distintivo de la marca (LOGO/oso.webp → scripts/images.mjs). */}
          <img
            src={`${import.meta.env.BASE_URL}assets/generated/logo-96.webp`}
            srcSet={`${import.meta.env.BASE_URL}assets/generated/logo-48.webp 1x, ${import.meta.env.BASE_URL}assets/generated/logo-96.webp 2x`}
            width={41}
            height={48}
            alt=""
            className="h-10 w-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]"
          />
          <span aria-hidden className="hidden font-display text-[0.95rem] font-semibold sm:block">
            {profile.shortName}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                to={ROUTES[l.id]}
                aria-current={route === l.id ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  route === l.id ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] transition-transform duration-500 ${
                    route === l.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          {controls}
          <a
            href={whatsappLink(t(hero.whatsappText))}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="btn-shine ml-2 hidden h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-on-accent shadow-[0_8px_30px_-8px_var(--accent-strong)] md:inline-flex"
          >
            <span data-magnetic-inner>{t(hero.ctaPrimary)}</span>
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full lg:hidden"
            aria-label={t(ui.openMenu)}
            aria-haspopup="dialog"
            data-sound="pop"
            onClick={() => menuRef.current?.showModal()}
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </nav>

      <dialog
        ref={menuRef}
        aria-label={t(ui.mainNav)}
        className="modal m-0 h-dvh max-h-none w-full max-w-none"
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
      >
        <div className="flex h-full flex-col bg-bg px-6 pt-3 pb-10">
          <div className="flex items-center justify-between">
            {controls}
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full"
              aria-label={t(ui.closeMenu)}
              onClick={closeMenu}
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <ul className="mt-10 flex flex-col gap-1">
            {[{ id: 'home' as const, label: t(ui.home) }, ...links].map((l, i) => (
              <li
                key={l.id}
                className="intro"
                style={{ '--d': `${i * 0.05}s`, '--intro-delay': '0s' } as CSSProperties}
              >
                <Link
                  to={ROUTES[l.id]}
                  onClick={closeMenu}
                  aria-current={route === l.id ? 'page' : undefined}
                  className={`flex items-baseline gap-4 py-3 font-display text-4xl font-semibold ${
                    route === l.id ? 'text-accent' : ''
                  }`}
                >
                  <span className="font-mono text-xs text-accent-2">0{i}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${profile.email}`} className="mt-auto text-sm text-muted">
            {profile.email}
          </a>
        </div>
      </dialog>
    </header>
  );
}
