import { Fragment, type ReactNode } from 'react';
import { Avatar, type AvatarName } from './Avatar';

type Props = {
  id: string;
  kicker: string;
  title: string;
  intro?: ReactNode;
  /** Ilustración del avatar que flota junto al título. */
  avatar?: AvatarName;
};

/** Encabezado de sección. El título se parte en palabras para revelarlas una a una (enhance.ts). */
export function SectionHeading({ id, kicker, title, intro, avatar }: Props) {
  const words = title.split(' ');
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
        <h2
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
        </h2>
      </div>
      {intro && (
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted" data-reveal>
          {intro}
        </p>
      )}
    </header>
  );
}
