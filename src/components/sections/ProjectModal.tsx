import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { hero, projects, whatsappLink, type Project } from '../../data/content';
import { useT } from '../../hooks/useT';
import { BrandIcon } from '../ui/BrandIcon';
import { buttonClasses } from '../ui/buttonStyles';
import { ProjectMockup } from './ProjectMockup';
import { ProjectGallery } from './ProjectGallery';

type Props = { project: Project; onClose: () => void };

/** Detalle de proyecto en un <dialog> nativo: trampa de foco, Esc y backdrop incluidos. */
export default function ProjectModal({ project: p, onClose }: Props) {
  const { t, lang } = useT();
  const ref = useRef<HTMLDialogElement>(null);
  const L = projects.labels;
  const gallery = p.gallery ?? [];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const opener = document.activeElement as HTMLElement | null;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      opener?.focus();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="modal w-full"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      data-lenis-prevent
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-surface-2 shadow-[var(--shadow)] transition-colors hover:text-accent"
          aria-label={t(L.close)}
        >
          <X className="size-5" aria-hidden />
        </button>
        <div className="max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain card bg-surface shadow-[var(--shadow)]">
          {gallery.length > 0 && (
            <ProjectGallery
              shots={gallery}
              sizes="(min-width: 56rem) 50rem, 92vw"
              className="border-b border-line bg-surface-2/60 p-5 pr-16 sm:p-8 sm:pr-20"
            />
          )}
          <div className={gallery.length ? '' : 'grid md:grid-cols-[2fr_3fr]'}>
            {!gallery.length && p.mockup && (
              <div className="hidden items-center justify-center bg-surface-2/60 p-8 md:flex">
                <ProjectMockup kind={p.mockup} lang={lang} className="w-full" />
              </div>
            )}

            <div className="p-7 sm:p-10">
              <p className="font-mono text-xs tracking-wider text-accent-2 uppercase">
                {p.year} · {t(p.type)}
              </p>
              <h2 id="modal-title" className="mt-3 pr-12 text-4xl font-bold sm:text-5xl">
                {p.title}
              </h2>
              <p className="mt-5 leading-relaxed text-muted">{t(p.description)}</p>

              <dl className="mt-8 space-y-6">
                {p.role && (
                  <div>
                    <dt className="kicker">{t(L.role)}</dt>
                    <dd className="mt-2">{t(p.role)}</dd>
                  </div>
                )}
                <div>
                  <dt className="kicker">{t(L.highlights)}</dt>
                  <dd>
                    <ul className="mt-3 space-y-2">
                      {t(p.highlights).map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent-2" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                {p.stack.length > 0 && (
                  <div>
                    <dt className="kicker">{t(L.stack)}</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line px-3 py-1 font-mono text-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>

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
          </div>
        </div>
      </div>
    </dialog>
  );
}
