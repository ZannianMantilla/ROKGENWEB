import { useEffect, useRef, useState, type MouseEvent, type RefObject } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { clientSites, projects } from '../../data/content';
import { useT } from '../../hooks/useT';
import { subHeadings } from '../../lib/section';
import { DeviceFrame } from '../ui/Screenshot';

type Props = {
  /** Nivel del título de la página/sección que los contiene. */
  level: 1 | 2;
  /** En la página de proyectos: versión móvil superpuesta y rol. */
  detailed?: boolean;
};

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');
const img = (w: number, ext: string) =>
  `${import.meta.env.BASE_URL}assets/generated/gata-borde-${w}.${ext}`;

/** Iris de la gata en % de la imagen (los mide scripts/avatars.mjs al borrar las pupilas). */
const IRIS = [
  { left: 25.9, top: 72.9, width: 12.9, height: 16.3 },
  { left: 60.7, top: 73.7, width: 12.8, height: 15.7 },
];
const SPEED = 48; // px por segundo del giro continuo

/** Corazones que salen de la gata al tocarla (Web Animations; se borran al terminar). */
function hearts(host: HTMLElement) {
  for (let i = 0; i < 5; i++) {
    const h = document.createElement('span');
    h.className = 'cat-heart';
    h.textContent = '♥';
    h.style.left = `${30 + Math.random() * 40}%`;
    host.append(h);
    const dx = (Math.random() - 0.5) * 80;
    h.animate(
      [
        { transform: 'translate(-50%, 0) scale(0.4)', opacity: 0 },
        { opacity: 1, offset: 0.2 },
        {
          transform: `translate(calc(-50% + ${dx}px), -${70 + Math.random() * 50}px) scale(1.1) rotate(${dx / 3}deg)`,
          opacity: 0,
        },
      ],
      { duration: 1100 + Math.random() * 400, delay: i * 70, easing: 'cubic-bezier(.16,1,.3,1)' },
    ).finished.then(() => h.remove());
  }
}

/**
 * La gata asomada sobre el carrusel. Sus pupilas son capas propias (la imagen viene sin ellas)
 * y se mueven con --lx: siguen la tarjeta que pasa por debajo. Al tocarla maúlla, da un saltito,
 * abre los ojos y suelta corazones.
 */
function Cat({ catRef, label }: { catRef: RefObject<HTMLButtonElement | null>; label: string }) {
  const set = (ext: string) => `${img(360, ext)} 360w, ${img(720, ext)} 720w`;
  const poke = (e: MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.classList.remove('is-happy');
    void el.offsetWidth; // reinicia la animación si se toca varias veces seguidas
    el.classList.add('is-happy');
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) hearts(el);
  };
  return (
    <button
      type="button"
      ref={catRef}
      onClick={poke}
      onAnimationEnd={(e) =>
        e.animationName === 'cat-hop' && e.currentTarget.classList.remove('is-happy')
      }
      data-sound="meow"
      aria-label={label}
      className="cat absolute right-6 bottom-full z-10 w-40 translate-y-[18%] cursor-pointer sm:right-12 sm:w-60"
    >
      <picture>
        <source type="image/avif" srcSet={set('avif')} sizes="(min-width: 640px) 15rem, 10rem" />
        <source type="image/webp" srcSet={set('webp')} sizes="(min-width: 640px) 15rem, 10rem" />
        <img
          src={img(360, 'webp')}
          width={1284}
          height={826}
          alt=""
          loading="lazy"
          decoding="async"
          className="cat-body h-auto w-full"
        />
      </picture>
      {IRIS.map((e, i) => (
        <span
          key={i}
          className="cat-iris"
          style={{
            left: `${e.left}%`,
            top: `${e.top}%`,
            width: `${e.width}%`,
            height: `${e.height}%`,
          }}
        >
          <span className="cat-pupil" />
        </span>
      ))}
    </button>
  );
}

/** Sitios web de clientes en producción: carrusel que gira solo, con captura y enlace a cada sitio. */
export function ClientSites({ level, detailed = false }: Props) {
  const { t } = useT();
  const [Title, CardTitle] = subHeadings(level);
  const L = projects.labels;
  const N = clientSites.length;
  const track = useRef<HTMLUListElement>(null);
  const cat = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const resumeAt = useRef(0); // hasta cuándo queda en pausa el giro tras deslizar

  useEffect(() => {
    const el = track.current;
    const catEl = cat.current;
    if (!el || !catEl) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pos = el.scrollLeft;
    let last = performance.now();
    let frame = 0;
    let holding = false;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const cards = [...el.children] as HTMLElement[];
      const step = cards[0].offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
      const loop = step * N; // una vuelta: las tarjetas van dos veces seguidas

      if (!reduced && !holding && now > resumeAt.current) {
        pos += SPEED * dt;
        if (pos >= loop) pos -= loop;
        el.scrollLeft = pos;
      } else {
        if (el.scrollLeft >= loop) el.scrollLeft -= loop;
        pos = el.scrollLeft;
      }

      // Los ojos siguen la tarjeta más cercana a la gata, la que pasa por debajo.
      const box = catEl.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      let best = 0;
      let bestD = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - cx);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      const r = cards[best].getBoundingClientRect();
      const lx = Math.max(-1, Math.min(1, (r.left + r.width / 2 - cx) / (r.width * 0.6)));
      catEl.style.setProperty('--lx', lx.toFixed(3));
      setIndex(best % N);

      frame = requestAnimationFrame(tick);
    };

    // Solo anima mientras el carrusel está en pantalla.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(frame);
      if (e.isIntersecting) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    io.observe(el);

    // Se detiene mientras alguien lo mira o lo usa, y sigue girando poco después.
    const hold = () => (holding = true);
    const release = () => {
      holding = false;
      resumeAt.current = performance.now() + 1500;
    };
    const nudge = () => (resumeAt.current = performance.now() + 3000);
    const events: [string, EventListener][] = [
      ['pointerenter', hold],
      ['pointerleave', release],
      ['focusin', hold],
      ['focusout', release],
      ['touchstart', nudge],
      ['wheel', nudge],
    ];
    events.forEach(([type, fn]) => el.addEventListener(type, fn, { passive: true }));
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      events.forEach(([type, fn]) => el.removeEventListener(type, fn));
    };
  }, [N]);

  return (
    <section aria-labelledby="client-sites-title" className="mt-20 md:mt-28">
      <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
        <div className="max-w-2xl">
          <Title id="client-sites-title" className="text-3xl font-semibold sm:text-4xl">
            {t(L.sitesTitle)}
          </Title>
          <p className="mt-3 text-lg leading-relaxed text-muted">{t(L.sitesIntro)}</p>
        </div>
        <span className="font-mono text-xs tracking-widest text-muted">
          {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </span>
      </div>

      {/* Espacio arriba para la gata, que se asoma sobre el borde del carrusel. */}
      <div className="relative mt-32 sm:mt-44">
        <Cat catRef={cat} label={t(L.cat)} />
        <ul
          id="client-sites-track"
          ref={track}
          className="carousel -mx-5 flex gap-5 overflow-x-auto px-5 pb-4 sm:mr-[calc(50%-50vw)] sm:-ml-8 sm:pl-8"
        >
          {/* Las tarjetas van dos veces para que el giro no tenga fin; la copia no se lee ni se enfoca. */}
          {[...clientSites, ...clientSites].map((site, i) => {
            const copy = i >= N;
            return (
              <li
                key={`${site.id}-${i}`}
                id={copy ? undefined : site.id}
                aria-hidden={copy || undefined}
                inert={copy || undefined}
                className={`w-[85%] shrink-0 scroll-mt-28 sm:w-[60%] ${detailed ? 'lg:w-[48%]' : 'lg:w-[38%]'}`}
              >
                <article
                  aria-labelledby={copy ? undefined : `site-${site.id}`}
                  className="group gradient-ring flex h-full flex-col overflow-hidden card"
                >
                  <div className="relative border-b border-line bg-surface-2/60 p-4 pb-6 sm:p-5 sm:pb-8">
                    <DeviceFrame
                      shot={site.desktop}
                      sizes={
                        detailed
                          ? '(min-width: 1024px) 30rem, (min-width: 640px) 60vw, 85vw'
                          : '(min-width: 1024px) 24rem, (min-width: 640px) 60vw, 85vw'
                      }
                      className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
                    />
                    {detailed && (
                      <DeviceFrame
                        shot={site.mobile}
                        sizes="120px"
                        decorative
                        className="absolute right-3 -bottom-3 w-[22%] rotate-[5deg] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-[2deg]"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="font-mono text-xs tracking-wider text-accent-2">
                      {host(site.url)}
                    </p>
                    <CardTitle
                      id={copy ? undefined : `site-${site.id}`}
                      className="mt-2 text-2xl font-semibold"
                    >
                      {site.name}
                    </CardTitle>
                    <p className="mt-3 leading-relaxed text-muted">{t(site.summary)}</p>
                    {detailed && (
                      <p className="mt-4 text-sm">
                        <span className="kicker">{t(L.role)}</span>
                        <span className="mt-1 block">{t(site.role)}</span>
                      </p>
                    )}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-4 font-semibold text-accent transition-colors hover:text-fg"
                    >
                      {t(L.visit)}
                      <span className="sr-only">: {site.name}</span>
                      <ArrowUpRight
                        className="size-4 transition-transform duration-500 group-hover:rotate-45"
                        aria-hidden
                      />
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
