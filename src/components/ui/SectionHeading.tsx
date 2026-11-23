import { Fragment, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Avatar, type AvatarName } from './Avatar';
import { Link } from './Link';

type Props = {
  id: string;
  kicker: string;
  title: string;
  intro?: ReactNode;
  /** Ilustración del avatar que flota junto al título. */
  avatar?: AvatarName;
  /** 1 en la página propia de la sección; 2 cuando la sección es un resumen en el inicio. */
  level?: 1 | 2;
  /** Enlace "Ver más" a la página completa (solo en el resumen del inicio). */
  more?: { to: string; label: string; context: string };
};

/** Encabezado de sección o de página. El título se parte en palabras para revelarlas una a una (enhance.ts). */
export function SectionHeading({ id, kicker, title, intro, avatar, level = 2, more }: Props) {
  const words = title.split(' ');
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <header className={`relative mb-12 md:mb-16 ${avatar ? '' : 'max-w-3xl'}`}>
      {avatar && (
        <div className="absolute -top-6 right-0 w-24 sm:w-32 md:-top-16 lg:w-52 xl:w-60">
          <div
            aria-hidden
            className="absolute inset-x-[-20%] top-[10%] bottom-[10%] -z-10 aura [--p:35%]"
          />
          <Avatar
            name={avatar}
            sizes="(min-width: 1280px) 240px, (min-width: 1024px) 208px, 128px"
            fade
          />
        </div>
      )}
      <div className={avatar ? 'max-w-3xl pr-28 sm:pr-36 lg:pr-0' : undefined}>
        <p className="mb-5 flex items-center gap-3 kicker" data-reveal>
          <span
            aria-hidden
            className="h-px w-10 bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
          />
          {kicker}
        </p>
        <Heading
          id={id}
          data-split
          className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl"
        >
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="split-word">
                <span>{w}</span>
              </span>
              {i < words.length - 1 && ' '}
            </Fragment>
          ))}
        </Heading>
      </div>
      {intro && (
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted" data-reveal>
          {intro}
        </p>
      )}
      {more && (
        <div data-reveal className="mt-7">
          <Link
            to={more.to}
            className="group inline-flex items-center gap-3 rounded-full border border-line-strong py-2 pr-2 pl-5 text-sm font-semibold transition-colors hover:border-accent"
          >
            {more.label}
            <span className="sr-only">: {more.context}</span>
            <span className="grid size-8 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:translate-x-1">
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
