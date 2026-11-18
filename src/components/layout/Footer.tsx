import { ArrowUp } from 'lucide-react';
import { footer, profile } from '../../data/content';
import { useT } from '../../hooks/useT';

export function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {t(footer.tagline)} © {new Date().getFullYear()}
          </p>
        </div>
        <a
          href="#top"
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
