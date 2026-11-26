import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
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
const img = (name: string, w: number, ext: string) =>
  `${import.meta.env.BASE_URL}assets/generated/${name}-${w}.${ext}`;

/** Una pose de la gata (recortes de scripts/avatars.mjs, desde AVATAR/AVATAR GATO). */
function CatPose({
  name,
  w,
  h,
  className,
}: {
  name: string;
  w: number;
  h: number;
  className: string;
}) {
  const set = (ext: string) => `${img(name, 360, ext)} 360w, ${img(name, 720, ext)} 720w`;
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes="(min-width: 640px) 15rem, 10rem" />
      <source type="image/webp" srcSet={set('webp')} sizes="(min-width: 640px) 15rem, 10rem" />
      <img
        src={img(name, 360, 'webp')}
        width={w}
        height={h}
        alt=""
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

/**
 * La gata asomada sobre el carrusel. Al cambiar de sitio pasa a la pose de pata alzada,
 * como si empujara el carrusel, y vuelve a asomarse.
 */
function Cat({ swat }: { swat: boolean }) {
  return (
    <div
      aria-hidden
      className={`cat pointer-events-none absolute right-6 bottom-full z-10 w-40 translate-y-[18%] sm:right-12 sm:w-60 ${swat ? 'is-swat' : ''}`}
    >
      <CatPose name="gata-borde" w={1284} h={826} className="cat-idle h-auto w-full" />
      {/* Misma escala de cabeza que la pose quieta: la imagen de la pata alzada viene más alejada. */}
      <CatPose
        name="gata-pata"
        w={1197}
        h={894}
        className="cat-paw absolute bottom-0 left-1/2 h-auto w-[121%] max-w-none -translate-x-1/2"
      />
    </div>
  );
}

/** Sitios web de clientes en producción: carrusel con captura y enlace a cada sitio. */
export function ClientSites({ level, detailed = false }: Props) {
  const { t } = useT();
  const [Title, CardTitle] = subHeadings(level);
  const L = projects.labels;
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [ends, setEnds] = useState({ start: true, end: false });
  const [swat, setSwat] = useState(false);
  const swatTimer = useRef(0);

  const paw = () => {
    setSwat(true);
    clearTimeout(swatTimer.current);
    swatTimer.current = window.setTimeout(() => setSwat(false), 650);
  };

  // Índice visible y extremos, para habilitar los botones y para que la gata reaccione al deslizar.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
      setIndex(Math.round(el.scrollLeft / step));
      setEnds({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      clearTimeout(swatTimer.current);
    };
  }, []);

  // Deslizar con el dedo también cuenta como un empujón de la gata.
  const lastIndex = useRef(0);
  useEffect(() => {
    if (index !== lastIndex.current) paw();
    lastIndex.current = index;
  }, [index]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    paw();
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // La pata sube primero y luego se mueve el carrusel.
    setTimeout(
      () =>
        // Destino absoluto (tarjeta vecina) en vez de relativo: un clic durante otro desplazamiento no se descuadra.
        el.scrollTo({
          left:
            (Math.round(el.scrollLeft / (card.offsetWidth + gap)) + dir) * (card.offsetWidth + gap),
          behavior: reduced ? 'auto' : 'smooth',
        }),
      reduced ? 0 : 160,
    );
  };

  const button = (dir: 1 | -1) => {
    const Icon = dir === 1 ? ArrowRight : ArrowLeft;
    const disabled = dir === 1 ? ends.end : ends.start;
    return (
      <button
        type="button"
        onClick={() => go(dir)}
        disabled={disabled}
        aria-controls="client-sites-track"
        aria-label={t(dir === 1 ? L.next : L.prev)}
        className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors hover:border-accent hover:bg-[color-mix(in_oklab,var(--accent-strong)_18%,transparent)] disabled:pointer-events-none disabled:opacity-35"
      >
        <Icon className="size-5" aria-hidden />
      </button>
    );
  };

  return (
    <section aria-labelledby="client-sites-title" className="mt-20 md:mt-28">
      <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
        <div className="max-w-2xl">
          <Title id="client-sites-title" className="text-3xl font-semibold sm:text-4xl">
            {t(L.sitesTitle)}
          </Title>
          <p className="mt-3 text-lg leading-relaxed text-muted">{t(L.sitesIntro)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-muted" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(clientSites.length).padStart(2, '0')}
          </span>
          {button(-1)}
          {button(1)}
        </div>
      </div>

      {/* Espacio arriba para la gata, que se asoma sobre el borde del carrusel. */}
      <div className="relative mt-32 sm:mt-44">
        <Cat swat={swat} />
        <ul
          id="client-sites-track"
          ref={track}
          className="carousel -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 sm:mr-[calc(50%-50vw)] sm:-ml-8 sm:scroll-px-8 sm:pl-8"
        >
          {clientSites.map((site) => (
            <li
              key={site.id}
              id={site.id}
              className={`w-[85%] shrink-0 snap-start scroll-mt-28 sm:w-[60%] ${detailed ? 'lg:w-[48%]' : 'lg:w-[38%]'}`}
            >
              <article
                aria-labelledby={`site-${site.id}`}
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
                  <p className="font-mono text-xs tracking-wider text-accent-2">{host(site.url)}</p>
                  <CardTitle id={`site-${site.id}`} className="mt-2 text-2xl font-semibold">
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
          ))}
        </ul>
      </div>
    </section>
  );
}
