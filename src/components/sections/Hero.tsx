import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { hero, profile, whatsappLink } from '../../data/content';
import { useT } from '../../hooks/useT';
import { ButtonLink } from '../ui/Button';
import { Typewriter } from '../ui/Typewriter';
import { BrandIcon } from '../ui/BrandIcon';
import type { BrandName } from '../ui/brandPaths';

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

const floating: { brand: BrandName; label: string; pos: string; speed: number; d: number }[] = [
  { brand: 'flutter', label: 'Flutter', pos: 'top-[20%] right-[5%]', speed: 0.6, d: 0 },
  { brand: 'firebase', label: 'Firebase', pos: 'top-[38%] right-[2%]', speed: 1.1, d: 1.2 },
  { brand: 'python', label: 'Python', pos: 'top-[56%] right-[6%]', speed: 0.8, d: 0.6 },
  { brand: 'figma', label: 'Figma', pos: 'top-[74%] right-[3%]', speed: 1.4, d: 1.8 },
];

export function Hero() {
  const { t, lang } = useT();
  const canvas = useRef<HTMLCanvasElement>(null);

  // El fondo WebGL se carga después del primer paint para no competir con el LCP.
  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    // En móviles y equipos sin mouse usamos los blobs CSS (más baratos para la batería).
    const capable = matchMedia(
      '(min-width: 1024px) and (hover: hover) and (pointer: fine)',
    ).matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (!capable || saveData) return;
    const run = () =>
      import('../../lib/meshGradient').then((m) => {
        if (cancelled || !canvas.current) return;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        stop = m.startMeshGradient(canvas.current, reduced);
      });
    const id =
      'requestIdleCallback' in window
        ? requestIdleCallback(run, { timeout: 2000 })
        : setTimeout(run, 600);
    return () => {
      cancelled = true;
      if ('cancelIdleCallback' in window) cancelIdleCallback(id as number);
      clearTimeout(id as number);
      stop?.();
    };
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-20"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="mesh-blob mesh-blob-a" />
        <div className="mesh-blob mesh-blob-b" />
        <div className="mesh-blob mesh-blob-c" />
        <canvas
          ref={canvas}
          className="absolute inset-0 size-full opacity-0 transition-opacity duration-[1.5s] data-[ready=true]:opacity-100"
        />
        <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [mask-image:radial-gradient(70%_60%_at_30%_40%,#000,transparent)] bg-[size:64px_64px] opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(transparent,var(--bg))]" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden xl:block" aria-hidden>
        {floating.map((f) => (
          <div key={f.brand} className={`absolute ${f.pos}`} data-speed={f.speed}>
            <div
              className="intro flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-[var(--shadow)] glass"
              style={delay(0.5 + f.d * 0.15)}
            >
              <BrandIcon name={f.brand} className="size-5" colored />
              <span className="text-sm font-semibold">{f.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="shell" data-hero-content>
        <p className="intro flex items-center gap-3 kicker" style={delay(0)}>
          <span className="relative flex size-2.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>
          {t(hero.kicker)}
        </p>

        <p className="intro mt-6 text-lg font-medium text-muted" style={delay(0.05)}>
          {profile.name}
        </p>

        <h1
          id="hero-title"
          className="mt-3 max-w-[14ch] text-[clamp(2.6rem,8.4vw,7.25rem)] leading-[0.95] font-semibold tracking-[-0.035em]"
        >
          {t(hero.headline).map((line, i, all) => (
            <span
              key={line}
              className={`intro-line block ${i === 1 ? 'text-gradient' : ''}`}
              style={delay(i * 0.08)}
            >
              {line}
              {i < all.length - 1 && ' '}
            </span>
          ))}
        </h1>

        <p className="intro mt-8 min-h-[1.6em] font-mono text-base sm:text-lg" style={delay(0.3)}>
          <span className="text-accent-2" aria-hidden>
            {'> '}
          </span>
          <Typewriter key={lang} words={t(hero.roles)} />
        </p>

        <p className="intro mt-5 max-w-xl text-lg leading-relaxed text-muted" style={delay(0.38)}>
          {t(hero.intro)}
        </p>

        <div className="intro mt-10 flex flex-wrap gap-3" style={delay(0.46)}>
          <ButtonLink
            href={whatsappLink(t(hero.whatsappText))}
            external
            icon={<ArrowUpRight className="size-4" aria-hidden />}
          >
            {t(hero.ctaPrimary)}
          </ButtonLink>
          <ButtonLink
            href="#projects"
            variant="ghost"
            icon={<ArrowDown className="size-4" aria-hidden />}
          >
            {t(hero.ctaSecondary)}
          </ButtonLink>
        </div>
      </div>

      <a
        href="#about"
        className="intro absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[0.7rem] tracking-[0.3em] text-muted uppercase transition-colors hover:text-fg sm:flex"
        style={delay(0.7)}
      >
        {t(hero.scroll)}
        <span className="relative h-12 w-px overflow-hidden bg-line-strong" aria-hidden>
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-accent-2" />
        </span>
      </a>
    </section>
  );
}
