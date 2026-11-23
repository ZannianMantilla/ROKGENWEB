import type { CSSProperties } from 'react';
import type { Lang, StackItem } from '../../data/content';
import { toolName } from '../../lib/catalog';
import { BrandIcon } from './BrandIcon';

/** Logo de una herramienta: ícono de marca o, si no hay, sus iniciales. */
export function ToolLogo({
  item,
  size = 'size-6',
  colored = false,
}: {
  item: StackItem;
  size?: string;
  colored?: boolean;
}) {
  if (item.brand) return <BrandIcon name={item.brand} className={size} colored={colored} />;
  return (
    <span
      className={`${size} grid shrink-0 place-items-center rounded-md border border-line-strong font-mono text-[0.6rem] leading-none font-bold`}
      aria-hidden
    >
      {item.mono}
    </span>
  );
}

/** Fila de herramientas en movimiento continuo. */
export function ToolMarquee({
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
          key={toolName(it, 'es')}
          className="flex items-center gap-3 card !rounded-2xl px-5 py-3.5 whitespace-nowrap text-muted transition-colors hover:text-fg"
        >
          <ToolLogo item={it} />
          <span className="font-medium">{toolName(it, lang)}</span>
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
