import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Menu, X } from 'lucide-react';
import { hero, profile, ui, whatsappLink } from '../../data/content';
import { setLang } from '../../lib/prefs';
import { useT } from '../../hooks/useT';

const SECTIONS = ['about', 'services', 'stack', 'projects', 'experience', 'contact'] as const;

export function Navbar() {
  const { t, lang } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Resalta la sección que ocupa el centro del viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of ['top', ...SECTIONS]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const closeMenu = () => menuRef.current?.close();
  const links = SECTIONS.map((id) => ({ id, label: t(ui.nav[id]) }));

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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        scrolled ? 'border-x-0 border-t-0 glass' : 'border-transparent'
      }`}
    >
      <nav
        aria-label={t(ui.mainNav)}
        className="shell flex h-16 items-center justify-between gap-4"
      >
        <a href="#top" className="group flex items-center gap-3">
          <span className="sr-only">{`${profile.name} — ${t(ui.home)}`}</span>
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--accent-strong),#c026d3)] font-display text-sm font-bold text-white shadow-[0_0_24px_-4px_var(--accent-strong)] transition-transform duration-500 group-hover:rotate-[-8deg]"
          >
            {profile.initials}
          </span>
          <span aria-hidden className="hidden font-display text-[0.95rem] font-semibold sm:block">
            Zannián<span className="text-accent">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] transition-transform duration-500 ${
                    active === l.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
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
            {links.map((l, i) => (
              <li
                key={l.id}
                className="intro"
                style={{ '--d': `${i * 0.05}s`, '--intro-delay': '0s' } as CSSProperties}
              >
                <a
                  href={`#${l.id}`}
                  onClick={closeMenu}
                  className="flex items-baseline gap-4 py-3 font-display text-4xl font-semibold"
                >
                  <span className="font-mono text-xs text-accent-2">0{i + 1}</span>
                  {l.label}
                </a>
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
