import type { ReactNode } from 'react';

type Props = {
  id: string;
  kicker: string;
  title: string;
  intro?: ReactNode;
  align?: 'left' | 'center';
};

export function SectionHeading({ id, kicker, title, intro, align = 'left' }: Props) {
  const center = align === 'center';
  return (
    <header
      className={`mb-12 max-w-3xl md:mb-16 ${center ? 'mx-auto text-center' : ''}`}
      data-reveal
    >
      <p className="mb-4 kicker">{kicker}</p>
      <h2 id={id} className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </header>
  );
}
