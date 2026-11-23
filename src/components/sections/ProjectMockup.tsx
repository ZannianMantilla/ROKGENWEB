import type { Lang, MockupKind } from '../../data/content';

/**
 * Pantallas ilustrativas dibujadas con HTML/CSS (no son capturas reales).
 * Reemplázalas con capturas agregando `image` al proyecto en content.ts.
 */
const themes: Record<MockupKind, { bg: string; glow: string }> = {
  math: { bg: 'linear-gradient(160deg,#4c1d95,#1e1b4b)', glow: '#facc15' },
};

function MathGame({ lang }: { lang: Lang }) {
  const answers = [
    { n: 11, c: '#f472b6' },
    { n: 12, c: '#22d3ee' },
    { n: 13, c: '#a3e635' },
    { n: 10, c: '#fb923c' },
  ];
  return (
    <div className="flex h-full flex-col gap-3 p-4 text-white">
      <div className="flex items-center justify-between text-[0.65rem]">
        <span className="font-display font-bold">MATEGAME</span>
        <span className="text-yellow-300">★★★☆</span>
      </div>
      <div className="grid flex-1 place-items-center rounded-2xl bg-white/10">
        <div className="text-center">
          <p className="text-[0.6rem] text-white/60">{lang === 'es' ? 'Nivel 3' : 'Level 3'}</p>
          <p className="font-display text-4xl font-bold">7 + 5</p>
          <p className="font-display text-2xl font-bold text-yellow-300">= ?</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {answers.map((a) => (
          <span
            key={a.n}
            className="grid h-11 place-items-center rounded-xl font-display text-lg font-bold text-slate-900 shadow-[0_4px_0_rgb(0_0_0/0.25)]"
            style={{ background: a.c }}
          >
            {a.n}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectMockup({
  kind,
  lang,
  className = '',
}: {
  kind: MockupKind;
  lang: Lang;
  className?: string;
}) {
  const theme = themes[kind];

  return (
    <div className={`relative ${className}`} aria-hidden>
      <div
        className="absolute -inset-[15%] opacity-60"
        style={{ background: `radial-gradient(closest-side, ${theme.glow}, transparent)` }}
      />
      <div className="relative mx-auto aspect-[9/18.5] w-full max-w-[15rem] rounded-[2.4rem] border border-white/15 bg-[#0a0a0f] p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
        <div
          className="relative h-full overflow-hidden rounded-[1.9rem]"
          style={{ background: theme.bg }}
        >
          <div className="mx-auto mt-2 h-4 w-16 rounded-full bg-black/60" />
          <div className="h-[calc(100%-1.5rem)]">
            <MathGame lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
