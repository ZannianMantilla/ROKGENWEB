import { ArrowUpRight, MapPin } from 'lucide-react';
import { detail, profile, services, whatsappLink } from '../../data/content';
import { useT } from '../../hooks/useT';
import { serviceIcons } from '../../lib/catalog';
import { Contact } from '../sections/Contact';

/** Contacto: formulario y canales directos, más WhatsApp con el servicio ya elegido y ubicación. */
export function ContactPage() {
  const { t } = useT();
  return (
    <>
      <Contact level={1} />
      <div className="shell grid gap-4 pb-24 md:pb-32 lg:grid-cols-[2fr_1fr]" data-stagger>
        <section aria-labelledby="contact-by-service" className="gradient-ring card p-7 sm:p-10">
          <h2 id="contact-by-service" className="text-2xl font-semibold sm:text-3xl">
            {t(detail.byService)}
          </h2>
          <p className="mt-3 text-muted">{t(detail.byServiceIntro)}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {services.items.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <li key={s.icon}>
                  <a
                    href={whatsappLink(`${t(detail.quoteText)} ${t(s.title)}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-surface-2/40 p-3.5 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-accent"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-semibold">{t(s.title)}</span>
                    <ArrowUpRight
                      className="ml-auto size-4 shrink-0 text-muted transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="contact-where" className="gradient-ring card p-7 sm:p-10">
          <h2 id="contact-where" className="text-2xl font-semibold sm:text-3xl">
            {t(detail.whereIAm)}
          </h2>
          <ul className="mt-7 space-y-4">
            {profile.locations.map((place) => (
              <li key={place} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2">
                  <MapPin className="size-4 text-accent" aria-hidden />
                </span>
                {place}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{profile.country}</p>
        </section>
      </div>
    </>
  );
}
