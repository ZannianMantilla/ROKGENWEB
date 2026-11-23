import { ArrowUpRight, Lock } from 'lucide-react';
import { community } from '../../data/content';
import { useT } from '../../hooks/useT';
import { sectionPadding, subHeadings, type SectionProps } from '../../lib/section';
import { SectionHeading } from '../ui/SectionHeading';

const img = (file: string) => `${import.meta.env.BASE_URL}assets/social/${file}.webp`;
const sum = (key: 'followers' | 'posts') =>
  community.accounts.reduce((n, a) => n + (a[key] ?? 0), 0);

/** Área de community manager: cifras totales y una tarjeta por marca con su perfil y publicaciones. */
export function Community({ level = 2 }: SectionProps) {
  const [Sub] = subHeadings(level);
  const { t, lang } = useT();
  const L = community.labels;
  const fmt = (n: number) => n.toLocaleString(lang === 'es' ? 'es-CO' : 'en-US');
  const totals = [
    { value: community.accounts.length, label: L.brands },
    { value: sum('followers'), label: L.followersTotal },
    { value: sum('posts'), label: L.postsTotal },
  ];

  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className={`relative overflow-hidden border-y border-line bg-bg-soft ${sectionPadding(level)}`}
    >
      <div
        aria-hidden
        className="absolute -top-40 -right-40 size-[34rem] aura [--p:20%] aura-fuchsia"
      />
      <div className="relative shell">
        <SectionHeading
          id="community-title"
          kicker={t(community.kicker)}
          title={t(community.title)}
          intro={t(community.intro)}
          avatar="contacto"
          level={level}
        />

        <ul className="grid grid-cols-3 gap-3 sm:gap-4" data-stagger>
          {totals.map((s) => (
            <li key={s.label.es} className="gradient-ring card p-4 sm:p-6">
              <p className="font-display text-2xl font-semibold tracking-tight sm:text-5xl">
                <span data-count={s.value} className="text-gradient">
                  {fmt(s.value)}
                </span>
              </p>
              <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">{t(s.label)}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" data-stagger>
          {community.accounts.map((a) => (
            <li key={a.handle} className="gradient-ring flex flex-col card p-5">
              <a
                href={`https://www.instagram.com/${a.handle}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
                aria-label={`${t(L.open)}: @${a.handle}`}
              >
                {a.shots ? (
                  <img
                    src={img(`${a.handle}-avatar`)}
                    width={160}
                    height={160}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-12 shrink-0 rounded-full border border-line-strong bg-white object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-brand font-display font-semibold text-white"
                  >
                    {a.name[0]}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <Sub className="truncate font-display font-semibold transition-colors group-hover:text-accent">
                    {a.name}
                  </Sub>
                  <span className="block truncate font-mono text-xs text-muted">@{a.handle}</span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </a>

              {a.followers !== undefined ? (
                <dl className="mt-4 grid grid-cols-2 gap-2 text-center">
                  {(['followers', 'posts'] as const).map((k) => (
                    <div
                      key={k}
                      className="flex flex-col-reverse rounded-xl border border-line bg-bg/40 px-3 py-2"
                    >
                      <dt className="text-xs text-muted">{t(L[k])}</dt>
                      <dd className="font-display text-xl font-semibold">{fmt(a[k] ?? 0)}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-line px-3 py-3 text-sm text-muted">
                  <Lock className="size-4 shrink-0" aria-hidden />
                  {t(L.private)}
                </p>
              )}

              {a.shots > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-1.5 overflow-hidden rounded-xl">
                  {Array.from({ length: a.shots }, (_, i) => (
                    <img
                      key={i}
                      src={img(`${a.handle}-${i + 1}`)}
                      width={480}
                      height={480}
                      alt={`${t(L.post)} ${a.name}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">{t(community.measuredAt)}</p>
      </div>
    </section>
  );
}
