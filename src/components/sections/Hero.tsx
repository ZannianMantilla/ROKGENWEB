import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { hero, profile, whatsappLink } from '../../data/content';
import { useT } from '../../hooks/useT';
import { ButtonLink } from '../ui/Button';
import { Typewriter } from '../ui/Typewriter';
import { BrandIcon } from '../ui/BrandIcon';
import { Avatar } from '../ui/Avatar';
import type { BrandName } from '../ui/brandPaths';

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

type RingProps = { items: BrandName[]; inset: string; t: string; reverse?: boolean };

/** Anillo que gira con íconos que se mantienen derechos (contra-rotación). */
function Ring({ items, inset, t, reverse }: RingProps) {
  return (
    <div
      aria-hidden
      className={`orbit-ring ${reverse ? 'reverse' : ''}`}
      style={{ inset, '--t': t } as CSSProperties}
    >
      {items.map((brand, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div key={brand} className="absolute inset-0" style={{ rotate: `${angle}deg` }}>
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ rotate: `${-angle}deg` }}
            >
              <div className="orbit-counter grid size-14 place-items-center rounded-2xl shadow-[0_0_30px_-6px_var(--accent-strong)] glass">
                <BrandIcon name={brand} className="size-7" colored />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Esquirlas del cristal: salen disparadas con Web Animations y se borran al terminar. */
function burst(host: HTMLElement) {
  const n = 12;
  for (let i = 0; i < n; i++) {
    const shard = document.createElement('span');
    shard.className = 'crystal-shard';
    host.append(shard);
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.5;
    const dist = 60 + Math.random() * 70;
    shard
      .animate(
        [
          { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) rotate(${Math.random() * 540 - 270}deg) scale(0.2)`,
            opacity: 0,
          },
        ],
        { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(.16,1,.3,1)' },
      )
      .finished.then(() => shard.remove());
  }
}

/** Botón sobre el cristal del avatar: al tocarlo, el cristal estalla y el avatar pregunta qué hay pa' hacer. */
function CrystalPoke() {
  const { t } = useT();
  const [talking, setTalking] = useState(false);
  const hide = useRef(0);

  const poke = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) burst(btn);
    const avatar = btn.closest<HTMLElement>('[data-avatar]');
    avatar?.classList.remove('is-burst');
    void avatar?.offsetWidth; // reinicia la animación del destello
    avatar?.classList.add('is-burst');
    setTalking(true);
    clearTimeout(hide.current);
    hide.current = window.setTimeout(() => setTalking(false), 4200);
  };
  useEffect(() => () => clearTimeout(hide.current), []);

  return (
    <>
      <button
        type="button"
        onClick={poke}
        aria-label={t(hero.crystal.label)}
        className="pointer-events-auto absolute z-10 size-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
      />
      <p
        aria-live="polite"
        className={`speech pointer-events-none absolute right-12 bottom-44 w-max max-w-[15rem] ${talking ? '' : 'is-hidden'}`}
      >
        {talking && t(hero.crystal.line)}
      </p>
    </>
  );
}

function Orbit() {
  return (
    <div className="pointer-events-none absolute top-1/2 right-[-3%] z-20 hidden aspect-square w-[min(44vw,640px)] -translate-y-1/2 lg:block">
      <div className="size-full" data-speed="0.35">
        <div className="intro relative size-full" style={delay(0.35)}>
          {/* Anillo exterior punteado con un satélite luminoso */}
          <div
            aria-hidden
            className="orbit-ring !border-dashed opacity-60"
            style={{ inset: '-4%', '--t': '70s' } as CSSProperties}
          >
            <span className="absolute top-1/2 -left-1.5 size-3 rounded-full bg-accent-2 shadow-[0_0_18px_4px_var(--accent-2)]" />
          </div>
          <Ring items={['python', 'figma', 'wordpress', 'javascript']} inset="8%" t="46s" reverse />
          <Ring items={['flutter', 'firebase', 'dart']} inset="24%" t="30s" />

          {/* Avatar en el centro de la órbita, señalando el titular */}
          <div
            aria-hidden
            className="orbit-core-glow absolute inset-[22%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-strong)_60%,transparent),color-mix(in_oklab,var(--accent-2)_20%,transparent)_55%,transparent)]"
          />
          <div
            aria-hidden
            className="absolute bottom-[2%] left-[30%] h-[6%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]"
          />
          <Avatar
            name="intro"
            sizes="(min-width: 1024px) 20vw, 1px"
            className="absolute top-[3%] left-[21%] w-[46%]"
          >
            <CrystalPoke />
          </Avatar>
        </div>
      </div>
    </div>
  );
}

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
        <span className="stars" />
        <span className="stars stars-b" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [mask-image:radial-gradient(70%_60%_at_30%_40%,#000,transparent)] bg-[size:64px_64px] opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(transparent,var(--bg))]" />
      </div>

      <Orbit />

      <div className="relative z-10 shell" data-hero-content>
        <p
          className="intro inline-flex items-center gap-3 rounded-full border border-line-strong bg-[color-mix(in_oklab,var(--accent-strong)_12%,transparent)] px-4 py-2 kicker"
          style={delay(0)}
        >
          <span className="relative flex size-2.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>
          {t(hero.kicker)}
        </p>

        <p className="intro mt-6 text-lg font-medium text-muted" style={delay(0.05)}>
          {profile.name}
        </p>

        <div className="relative">
          <h1
            id="hero-title"
            className="mt-3 max-w-[14ch] text-[clamp(2.6rem,8.4vw,7.25rem)] leading-[0.95] font-semibold tracking-[-0.035em] lg:text-[clamp(3.5rem,6vw,6.5rem)]"
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

          {/* En móvil, busto del avatar asomado por el borde derecho, señalando el titular.
            Va junto a las líneas cortas del titular (la primera es la única ancha). */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[28%] right-[-10vw] w-[36vw] overflow-hidden [mask-image:linear-gradient(#000_75%,transparent)] sm:hidden"
            style={{ aspectRatio: '722 / 650' }}
          >
            <Avatar name="intro" sizes="36vw" />
          </div>
        </div>

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
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-[linear-gradient(var(--accent),var(--accent-2))]" />
        </span>
      </a>
    </section>
  );
}
