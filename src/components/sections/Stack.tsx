import { stack, detail, ui } from '../../data/content';
import { toolName } from '../../lib/catalog';
import { useT } from '../../hooks/useT';
import { sectionPadding, subHeadings, type SectionProps } from '../../lib/section';
import { ROUTES } from '../../lib/router';

import { SectionHeading } from '../ui/SectionHeading';
import { ToolLogo, ToolMarquee } from '../ui/Tools';

export function Stack({ level = 2, more = false }: SectionProps) {
  const [Sub] = subHeadings(level);
  const { t, lang } = useT();
  const all = stack.groups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);

  return (
    <section
      data-tone="jade"
      id="stack"
      aria-labelledby="stack-title"
      className={`relative isolate overflow-hidden ${sectionPadding(level)}`}
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
          level={level}
          more={
            more ? { to: ROUTES.stack, label: t(detail.more), context: t(ui.nav.stack) } : undefined
          }
        />
      </div>

      <div className="space-y-3" aria-hidden data-reveal>
        <ToolMarquee items={all.slice(0, half)} lang={lang} />
        <ToolMarquee items={all.slice(half)} reverse lang={lang} />
      </div>

      <div className="shell mt-16">
        <div className="grid gap-4 md:grid-cols-3" data-stagger>
          {stack.groups.map((g) => (
            <section
              key={g.id}
              aria-labelledby={`stack-${g.id}`}
              className="gradient-ring card p-7"
            >
              <Sub
                id={`stack-${g.id}`}
                className="flex items-center justify-between text-xl font-semibold"
              >
                {t(g.name)}
                <span className="font-mono text-xs font-normal text-muted">{g.items.length}</span>
              </Sub>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={toolName(it, 'es')}
                    className="flex items-center gap-2 rounded-full border border-line bg-surface-2/70 py-1.5 pr-3.5 pl-2 text-sm"
                  >
                    <ToolLogo item={it} size="size-5" />
                    {toolName(it, lang)}
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
