import type { CSSProperties } from 'react';
import { stack, type Lang, type StackItem } from '../../data/content';
import { useT } from '../../hooks/useT';
import { SectionHeading } from '../ui/SectionHeading';
import { BrandIcon } from '../ui/BrandIcon';

const label = (item: StackItem, lang: Lang) =>
  typeof item.name === 'string' ? item.name : item.name[lang];

function Logo({ item, size = 'size-6' }: { item: StackItem; size?: string }) {
  if (item.brand) return <BrandIcon name={item.brand} className={size} />;
  return (
    <span
      className={`${size} grid shrink-0 place-items-center rounded-md border border-line-strong font-mono text-[0.6rem] leading-none font-bold`}
      aria-hidden
    >
      {item.mono}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse,
  lang,
}: {
  items: StackItem[];
  reverse?: boolean;
  lang: Lang;
}) {
  const list = (hidden: boolean) => (
    <ul className="flex shrink-0 gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li
          key={label(it, 'es')}
          className="flex items-center gap-3 card !rounded-2xl px-5 py-3.5 whitespace-nowrap text-muted transition-colors hover:text-fg"
        >
          <Logo item={it} />
          <span className="font-medium">{label(it, lang)}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden py-1.5">
      <div
        className="marquee-track"
        style={
          { '--direction': reverse ? 'reverse' : 'normal', '--duration': '48s' } as CSSProperties
        }
      >
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

export function Stack() {
  const { t, lang } = useT();
  const all = stack.groups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="relative isolate overflow-hidden py-24 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[44rem] -translate-x-1/2 aura [--p:18%]"
      />
      <div className="shell">
        <SectionHeading
          id="stack-title"
          kicker={t(stack.kicker)}
          title={t(stack.title)}
          intro={t(stack.intro)}
        />
      </div>

      <div className="space-y-3" aria-hidden data-reveal>
        <MarqueeRow items={all.slice(0, half)} lang={lang} />
        <MarqueeRow items={all.slice(half)} reverse lang={lang} />
      </div>

      <div className="shell mt-16">
        <div className="grid gap-4 md:grid-cols-3" data-stagger>
          {stack.groups.map((g) => (
            <section
              key={g.id}
              aria-labelledby={`stack-${g.id}`}
              className="gradient-ring card p-7"
            >
              <h3
                id={`stack-${g.id}`}
                className="flex items-center justify-between text-xl font-semibold"
              >
                {t(g.name)}
                <span className="font-mono text-xs font-normal text-muted">{g.items.length}</span>
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={label(it, 'es')}
                    className="flex items-center gap-2 rounded-full border border-line bg-surface-2/70 py-1.5 pr-3.5 pl-2 text-sm"
                  >
                    <Logo item={it} size="size-5" />
                    {label(it, lang)}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
