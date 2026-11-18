import type { Lang, MockupKind } from '../../data/content';
import { BrandIcon } from '../ui/BrandIcon';

/**
 * Pantallas ilustrativas dibujadas con HTML/CSS (no son capturas reales).
 * Reemplázalas con capturas agregando `image` al proyecto en content.ts.
 */
const themes: Record<MockupKind, { bg: string; glow: string }> = {
  triage: { bg: 'linear-gradient(160deg,#1e1b4b,#0f172a)', glow: '#f43f5e' },
  math: { bg: 'linear-gradient(160deg,#4c1d95,#1e1b4b)', glow: '#facc15' },
  fitness: { bg: 'linear-gradient(160deg,#052e16,#0f172a)', glow: '#a3e635' },
};

function Triage({ lang }: { lang: Lang }) {
  const rows = [
    { c: '#ef4444', l: 'I', w: '78%' },
    { c: '#f97316', l: 'II', w: '64%' },
    { c: '#eab308', l: 'III', w: '70%' },
    { c: '#22c55e', l: 'IV', w: '52%' },
  ];
  return (
    <div className="flex h-full flex-col gap-2.5 p-4 text-white">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-bold tracking-wide">MAXTRIAGE</span>
        <span className="size-6 rounded-full bg-white/15" />
      </div>
      <p className="text-[0.6rem] text-white/60">
        {lang === 'es' ? 'Pacientes en espera' : 'Patients waiting'}
      </p>
      {rows.map((r) => (
        <div key={r.l} className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] p-2.5">
          <span
            className="grid size-7 place-items-center rounded-lg text-[0.6rem] font-bold"
            style={{ background: r.c }}
          >
            {r.l}
          </span>
          <div className="flex-1 space-y-1.5">
            <span className="block h-1.5 rounded-full bg-white/70" style={{ width: r.w }} />
            <span className="block h-1.5 w-2/5 rounded-full bg-white/25" />
          </div>
        </div>
      ))}
      <div className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[0.65rem] font-bold text-slate-900">
        <BrandIcon name="gmail" className="size-3.5" colored />
        {lang === 'es' ? 'Enviar reporte' : 'Send report'}
      </div>
    </div>
  );
}

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

function Fitness({ lang }: { lang: Lang }) {
  return (
    <div className="flex h-full flex-col gap-3 p-4 text-white">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-bold">GYMROCK</span>
        <span className="rounded-full bg-lime-400 px-2 py-0.5 text-[0.55rem] font-bold text-slate-900">
          PRO
        </span>
      </div>
      <p className="text-[0.6rem] text-white/60">
        {lang === 'es' ? 'Calculadora IMC' : 'BMI calculator'}
      </p>
      <div className="relative mx-auto grid size-28 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgb(255 255 255 / .12)"
            strokeWidth="9"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#a3e635"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset="95"
          />
        </svg>
        <div className="text-center">
          <p className="font-display text-2xl font-bold">22.9</p>
          <p className="text-[0.55rem] text-lime-300">Normal</p>
        </div>
      </div>
      {[
        [lang === 'es' ? 'Peso' : 'Weight', '70 kg'],
        [lang === 'es' ? 'Altura' : 'Height', '1.75 m'],
      ].map(([k, v]) => (
        <div
          key={k}
          className="flex items-center justify-between rounded-xl bg-white/[0.07] px-3 py-2.5 text-[0.65rem]"
        >
          <span className="text-white/60">{k}</span>
          <span className="font-bold">{v}</span>
        </div>
      ))}
      <div className="mt-auto rounded-xl bg-lime-400 py-2.5 text-center text-[0.65rem] font-bold text-slate-900">
        {lang === 'es' ? 'Calcular' : 'Calculate'}
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
  const Screen = kind === 'triage' ? Triage : kind === 'math' ? MathGame : Fitness;
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
            <Screen lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
