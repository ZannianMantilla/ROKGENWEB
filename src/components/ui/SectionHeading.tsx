import { Fragment, type ReactNode } from 'react';

type Props = {
  id: string;
  kicker: string;
  title: string;
  intro?: ReactNode;
};

/** Encabezado de sección. El título se parte en palabras para revelarlas una a una (enhance.ts). */
export function SectionHeading({ id, kicker, title, intro }: Props) {
  const words = title.split(' ');
  return (
    <header className="mb-12 max-w-3xl md:mb-16">
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
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-muted" data-reveal>
          {intro}
        </p>
      )}
    </header>
  );
}
