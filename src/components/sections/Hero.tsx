import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {
  ArrowUpRight,
  Cpu,
  HardDrive,
  MemoryStick,
  MonitorCog,
  Network,
  Router,
  Server,
  type LucideIcon,
} from 'lucide-react';
import { hero, whatsappLink } from '../../data/content';
import { strum } from '../../lib/sound';
import { useT } from '../../hooks/useT';
import { ButtonLink } from '../ui/Button';
import { Typewriter } from '../ui/Typewriter';
import { BrandIcon } from '../ui/BrandIcon';
import { Avatar, avatarSize, type AvatarName } from '../ui/Avatar';
import type { BrandName } from '../ui/brandPaths';

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

/* ---------- Facetas que se eligen con la guitarra ---------- */
type Tile = { key: string; node: ReactNode };
type Box = { left: number; top: number; width: number; height: number };

const brand = (b: BrandName): Tile => ({
  key: b,
  // TikTok y X son negros: sobre el fondo oscuro van en blanco
  node: <BrandIcon name={b} className="size-7" colored={b !== 'tiktok' && b !== 'x'} />,
});
const glyph = (key: string, Icon: LucideIcon): Tile => ({
  key,
  node: <Icon className="size-7 text-[var(--mode)]" strokeWidth={1.75} aria-hidden />,
});

/**
 * avatar: ilustración y su lugar dentro de la órbita (en %). frets: grupo de trastes que la elige,
 * en % de la imagen de la guitarra. chord: notas del rasgueo. bubble: dónde sale el globo de diálogo,
 * medido desde el cristal del colgante.
 */
const MODES = {
  dev: {
    color: '#a78bfa',
    avatar: 'intro',
    place: { top: '3%', left: '21%', width: '46%' },
    bubble: 'right-12 bottom-44',
    rings: [
      ['python', 'figma', 'wordpress', 'javascript'].map((b) => brand(b as BrandName)),
      ['flutter', 'firebase', 'dart'].map((b) => brand(b as BrandName)),
    ],
    frets: { left: 35.6, top: 37.9, width: 9.3, height: 17.4 },
    chord: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63], // Mi mayor
  },
  tech: {
    color: '#22d3ee',
    avatar: 'ram',
    place: { top: '10%', left: '14%', width: '62%' },
    bubble: 'left-10 bottom-52',
    rings: [
      [glyph('cpu', Cpu), glyph('drive', HardDrive), glyph('router', Router), glyph('server', Server)],
      [glyph('ram', MemoryStick), glyph('network', Network), glyph('monitor', MonitorCog)],
    ],
    frets: { left: 48.8, top: 37.9, width: 11.5, height: 16.7 },
    chord: [110, 164.81, 220, 277.18, 329.63], // La mayor
  },
  cm: {
    color: '#f472b6',
    avatar: 'metricas',
    place: { top: '5%', left: '17%', width: '58%' },
    bubble: 'left-10 bottom-40',
    rings: [
      ['instagram', 'facebook', 'tiktok', 'youtube'].map((b) => brand(b as BrandName)),
      ['x', 'whatsapp', 'linkedin'].map((b) => brand(b as BrandName)),
    ],
    frets: { left: 65.7, top: 37.9, width: 12.4, height: 15.5 },
    chord: [146.83, 220, 293.66, 369.99], // Re mayor
  },
} satisfies Record<
  string,
  {
    color: string;
    avatar: AvatarName;
    place: CSSProperties;
    bubble: string;
    rings: [Tile[], Tile[]];
    frets: Box;
    chord: number[];
  }
>;
type Mode = keyof typeof MODES;
const MODE_IDS = Object.keys(MODES) as Mode[];
const pct = (b: Box) => ({
  left: `${b.left}%`,
  top: `${b.top}%`,
  width: `${b.width}%`,
  height: `${b.height}%`,
});

type RingProps = { items: Tile[]; inset: string; t: string; reverse?: boolean };

/** Anillo que gira con íconos que se mantienen derechos (contra-rotación). */
function Ring({ items, inset, t, reverse }: RingProps) {
  return (
    <div
      aria-hidden
      className={`orbit-ring ${reverse ? 'reverse' : ''}`}
      style={{ inset, '--t': t } as CSSProperties}
    >
      {items.map((item, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div key={item.key} className="absolute inset-0" style={{ rotate: `${angle}deg` }}>
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ rotate: `${-angle}deg` }}
            >
              <div className="orbit-counter grid size-14 place-items-center rounded-2xl shadow-[0_0_30px_-6px_var(--mode)] glass">
                {item.node}
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

/** Botón sobre el cristal del avatar: al tocarlo, el cristal estalla y el avatar dice su frase. */
function CrystalPoke({ line, bubble }: { line: string; bubble: string }) {
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
        data-sound="chime"
        aria-label={t(hero.crystal.label)}
        className="pointer-events-auto absolute z-10 size-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
      />
      <p
        aria-live="polite"
        className={`speech pointer-events-none absolute w-max max-w-[15rem] ${bubble} ${talking ? '' : 'is-hidden'}`}
      >
        {talking && line}
      </p>
    </>
  );
}

/**
 * Las tres facetas quedan montadas una sobre otra y solo se ve la elegida: así la animación de entrada
 * y la mirada del avatar (enhance.ts, que busca los [data-avatar] al cargar) funcionan en todas.
 */
function Orbit({ mode }: { mode: Mode }) {
  const { t } = useT();
  const active = MODES[mode];
  return (
    <div
      className="pointer-events-none absolute top-1/2 right-[-3%] z-20 hidden aspect-square w-[min(44vw,640px)] -translate-y-1/2 lg:block"
      style={{ '--mode': active.color } as CSSProperties}
    >
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
          <div key={mode} className="ring-swap absolute inset-0">
            <Ring items={active.rings[0]} inset="8%" t="46s" reverse />
            <Ring items={active.rings[1]} inset="24%" t="30s" />
          </div>

          {/* Avatar en el centro de la órbita */}
          <div
            aria-hidden
            className="orbit-core-glow absolute inset-[22%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--mode)_55%,transparent),color-mix(in_oklab,var(--accent-2)_20%,transparent)_55%,transparent)]"
          />
          <div
            aria-hidden
            className="absolute bottom-[2%] left-[30%] h-[6%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]"
          />
          {MODE_IDS.map((m) => (
            <div
              key={m}
              className={`mode-swap absolute ${m === mode ? '' : 'is-off'}`}
              style={MODES[m].place}
            >
              <Avatar
                name={MODES[m].avatar}
                sizes="(min-width: 1024px) 26vw, 1px"
                fade={m === 'cm'} /* la ilustración termina cortada a media pierna */
              >
                {m === mode && <CrystalPoke line={t(hero.guitar.modes[m].line)} bubble={MODES[m].bubble} />}
              </Avatar>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Guitarra: toda ella es un solo botón (cómodo aunque sea pequeña). Cada toque rasguea y pasa a la
 * siguiente faceta; los trastes de colores solo indican cuál está activa.
 */
function Guitar({ mode, onPick }: { mode: Mode; onPick: (m: Mode) => void }) {
  const { t } = useT();
  const base = `${import.meta.env.BASE_URL}assets/generated/guitarra`;
  const set = (ext: string) => `${base}-360.${ext} 360w, ${base}-720.${ext} 720w`;
  // Sin órbita (móvil y tablet) el avatar queda lejos o no se ve: la frase sale sobre la guitarra.
  const [said, setSaid] = useState<Mode | null>(null);
  const hide = useRef(0);
  useEffect(() => () => clearTimeout(hide.current), []);
  const next = (e: MouseEvent<HTMLButtonElement>) => {
    const m = MODE_IDS[(MODE_IDS.indexOf(mode) + 1) % MODE_IDS.length];
    strum(MODES[m].chord);
    onPick(m);
    setSaid(m);
    clearTimeout(hide.current);
    hide.current = window.setTimeout(() => setSaid(null), 2600);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      e.currentTarget.animate(
        [{ rotate: '0deg' }, { rotate: '-5deg' }, { rotate: '3deg' }, { rotate: '-1.5deg' }, { rotate: '0deg' }],
        { duration: 500, easing: 'ease-out' },
      );
  };
  return (
    <div className="relative w-[10.5rem] shrink-0 sm:w-[12.5rem]">
      <p
        aria-live="polite"
        className={`speech pointer-events-none absolute right-[3%] bottom-[88%] w-max max-w-[14rem] lg:hidden ${said ? '' : 'is-hidden'}`}
      >
        {said && t(hero.guitar.modes[said].line)}
      </p>
      <button
        type="button"
        onClick={next}
        data-sound="none"
        aria-label={`${t(hero.guitar.label)}: ${t(hero.guitar.modes[mode].name)}`}
        className="guitar relative block w-full cursor-pointer rounded-xl"
      >
        <picture>
          <source type="image/avif" srcSet={set('avif')} sizes="(min-width: 640px) 12.5rem, 10.5rem" />
          <source type="image/webp" srcSet={set('webp')} sizes="(min-width: 640px) 12.5rem, 10.5rem" />
          <img
            src={`${base}-720.webp`}
            width={2024}
            height={659}
            alt=""
            decoding="async"
            className="h-auto w-full select-none"
            draggable={false}
          />
        </picture>
        {MODE_IDS.map((m) => (
          <span
            key={m}
            aria-hidden
            data-on={m === mode}
            className="fret"
            style={{ ...pct(MODES[m].frets), '--c': MODES[m].color } as CSSProperties}
          />
        ))}
      </button>
    </div>
  );
}

export function Hero() {
  const { t, lang } = useT();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>('dev');

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

  const bust = MODES[mode];
  const { w, h } = avatarSize(bust.avatar);

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

      <Orbit mode={mode} />

      <div className="relative z-10 shell" data-hero-content>
        <div className="relative">
          <h1
            id="hero-title"
            className="max-w-[14ch] text-[clamp(2.6rem,8.4vw,7.25rem)] leading-[0.95] font-semibold tracking-[-0.035em] lg:text-[clamp(3.5rem,6vw,6.5rem)]"
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

          {/* En móvil, busto del avatar asomado por el borde derecho, junto a las líneas cortas del
            titular. Se recorta al 45 % de alto de la faceta elegida. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[28%] right-[-10vw] w-[36vw] overflow-hidden [mask-image:linear-gradient(#000_75%,transparent)] transition-[aspect-ratio] duration-500 sm:hidden"
            style={{ aspectRatio: `${w} / ${Math.round(h * 0.45)}` }}
          >
            {MODE_IDS.map((m) => (
              <div key={m} className={`mode-swap absolute inset-x-0 top-0 ${m === mode ? '' : 'is-off'}`}>
                <Avatar name={MODES[m].avatar} sizes="36vw" />
              </div>
            ))}
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

        <div
          className="intro mt-10 flex items-center gap-3 sm:gap-5"
          style={delay(0.46)}
        >
          <ButtonLink
            href={whatsappLink(t(hero.whatsappText))}
            external
            icon={<ArrowUpRight className="size-4" aria-hidden />}
          >
            {t(hero.ctaPrimary)}
          </ButtonLink>
          <Guitar mode={mode} onPick={setMode} />
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
