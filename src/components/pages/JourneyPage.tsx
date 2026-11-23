import { detail, journey, profile } from '../../data/content';
import { useT } from '../../hooks/useT';
import { Journey } from '../sections/Journey';

/** Trayectoria: cifras de resumen (calculadas del contenido) y la línea de tiempo completa. */
export function JourneyPage() {
  const { t } = useT();
  const N = detail.numbers;
  const numbers = [
    { value: new Date().getFullYear() - profile.careerStartYear, suffix: '+', label: N.years },
    { value: journey.experience.length, suffix: '', label: N.roles },
    { value: journey.education.length, suffix: '', label: N.education },
    { value: journey.courses.length, suffix: '', label: N.courses },
    { value: journey.languages.length, suffix: '', label: N.languages },
  ];

  return (
    <Journey
      level={1}
      extra={
        <section aria-labelledby="journey-numbers" className="mb-16 md:mb-20 lg:mt-28">
          <h2 id="journey-numbers" className="sr-only">
            {t(detail.inNumbers)}
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" data-stagger>
            {numbers.map((n) => (
              <li key={n.label.es} className="gradient-ring card p-6">
                <p className="font-display text-5xl font-semibold tracking-tight">
                  <span data-count={n.value} className="text-gradient">
                    {n.value}
                  </span>
                  <span className="text-gradient">{n.suffix}</span>
                </p>
                <p className="mt-2 text-sm leading-snug text-muted">{t(n.label)}</p>
              </li>
            ))}
          </ul>
        </section>
      }
    />
  );
}
