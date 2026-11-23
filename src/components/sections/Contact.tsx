import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, CircleAlert, LoaderCircle, Mail, Send } from 'lucide-react';
import { contact, hero, profile, whatsappLink, detail, ui } from '../../data/content';
import { useT } from '../../hooks/useT';
import { sectionPadding, subHeadings, type SectionProps } from '../../lib/section';
import { ROUTES } from '../../lib/router';

import { submitForm, validate, type FormErrors, type FormValues } from '../../lib/form';
import { trackEvent } from '../../lib/analytics';
import { SectionHeading } from '../ui/SectionHeading';
import { BrandIcon } from '../ui/BrandIcon';
import { Avatar } from '../ui/Avatar';
import { buttonClasses } from '../ui/buttonStyles';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'fallback';
const EMPTY: FormValues = { name: '', email: '', message: '' };
const F = contact.form;

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} className="mt-2 min-h-5 text-sm text-danger" aria-live="polite">
        {error}
      </p>
    </div>
  );
}

const inputCls =
  'bg-bg/60 border-line-strong placeholder:text-muted/70 w-full rounded-2xl border px-4 py-3.5 transition-[border-color,box-shadow] outline-none focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_20%,transparent)] aria-[invalid=true]:border-danger';

export function Contact({ level = 2, more = false }: SectionProps) {
  const [Sub] = subHeadings(level);
  const { t } = useT();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const mountedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === 'success' || status === 'fallback') resultRef.current?.focus();
  }, [status]);

  const update = (key: keyof FormValues, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };

  const onBlur = (key: keyof FormValues) => {
    setTouched((p) => ({ ...p, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = (Object.keys(errs) as (keyof FormValues)[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#cf-${firstInvalid}`)?.focus();
      return;
    }

    // Anti-spam: honeypot lleno o envío en menos de 3 s → se descarta en silencio.
    const honeypot = new FormData(form).get('_gotcha');
    if (honeypot || Date.now() - mountedAt.current < 3000) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    const result = await submitForm(values, {
      to: profile.email,
      subject: t(contact.emailSubject),
    });
    setStatus(result);
    if (result !== 'error') {
      trackEvent('contact_submit');
      setValues(EMPTY);
      setTouched({});
    }
  };

  const err = (k: keyof FormValues) =>
    touched[k] && errors[k] ? t(F.errors[errors[k]!]) : undefined;
  const done = status === 'success' || status === 'fallback';

  const direct = [
    {
      href: whatsappLink(t(hero.whatsappText)),
      label: t(contact.direct.whatsapp),
      detail: profile.phoneDisplay,
      icon: <BrandIcon name="whatsapp" className="size-5" />,
      external: true,
    },
    {
      href: `mailto:${profile.email}`,
      label: t(contact.direct.email),
      detail: profile.email,
      icon: <Mail className="size-5" aria-hidden />,
      external: false,
    },
    {
      href: profile.github,
      label: t(contact.direct.github),
      detail: profile.github.replace('https://', ''),
      icon: <BrandIcon name="github" className="size-5" />,
      external: true,
    },
    ...(profile.linkedin
      ? [
          {
            href: profile.linkedin,
            label: t(contact.direct.linkedin),
            detail: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
            icon: <BrandIcon name="linkedin" className="size-5" />,
            external: true,
          },
        ]
      : []),
  ];

  return (
    <section
      data-tone="amethyst"
      id="contact"
      aria-labelledby="contact-title"
      className={`relative overflow-hidden ${sectionPadding(level)}`}
    >
      <div aria-hidden className="absolute -right-40 bottom-0 -z-10 size-[40rem] aura [--p:38%]" />
      <div
        aria-hidden
        className="absolute top-10 -left-40 -z-10 size-[30rem] aura [--p:20%] aura-fuchsia"
      />
      <div className="shell grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            kicker={t(contact.kicker)}
            title={t(contact.title)}
            intro={t(contact.intro)}
            level={level}
            more={
              more
                ? { to: ROUTES.contact, label: t(detail.more), context: t(ui.nav.contact) }
                : undefined
            }
          />
          <Sub className="mb-4 text-sm font-semibold text-muted" data-reveal>
            {t(contact.direct.title)}
          </Sub>
          <ul className="grid gap-3" data-stagger>
            {direct.map((d) => (
              <li key={d.href}>
                <a
                  href={d.href}
                  {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 card !rounded-2xl p-4 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_50px_-20px_var(--accent-strong)]"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface-2 text-fg transition-[background-color,color] duration-500 group-hover:bg-brand group-hover:text-white">
                    {d.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{d.label}</span>
                    <span className="block truncate text-sm text-muted">{d.detail}</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-muted transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-40 self-start sm:mt-44 lg:mt-36">
          <div className="absolute right-4 bottom-full w-32 translate-y-[18%] sm:right-8 sm:w-40 lg:w-44">
            <div aria-hidden className="absolute inset-[-15%] -z-10 aura [--p:40%]" />
            <Avatar name="contacto" sizes="(min-width: 1024px) 176px, 160px" />
          </div>
          <div className="gradient-ring relative card !bg-surface p-6 sm:p-10" data-reveal>
            {done ? (
              <div
                ref={resultRef}
                tabIndex={-1}
                className="flex flex-col items-center py-10 text-center outline-none"
                role="status"
              >
                <svg viewBox="0 0 52 52" className="anim-pop size-20 text-accent" aria-hidden>
                  <circle
                    cx="26"
                    cy="26"
                    r="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    opacity=".3"
                  />
                  <path
                    d="M15 27l7 7 15-16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    className="anim-draw"
                  />
                </svg>
                <Sub className="mt-6 text-3xl font-semibold">{t(F.successTitle)}</Sub>
                <p className="mt-3 max-w-sm text-muted">
                  {status === 'fallback' ? t(F.fallbackBody) : t(F.successBody)}
                </p>
                <button
                  type="button"
                  className={`${buttonClasses('ghost')} mt-8`}
                  onClick={() => setStatus('idle')}
                >
                  {t(F.again)}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-2">
                <Field id="cf-name" label={t(F.name)} error={err('name')}>
                  <input
                    id="cf-name"
                    name="name"
                    autoComplete="name"
                    className={inputCls}
                    placeholder={t(F.namePh)}
                    value={values.name}
                    maxLength={100}
                    onChange={(e) => update('name', e.target.value)}
                    onBlur={() => onBlur('name')}
                    aria-invalid={!!err('name')}
                    aria-describedby="cf-name-error"
                    required
                  />
                </Field>
                <Field id="cf-email" label={t(F.email)} error={err('email')}>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className={inputCls}
                    placeholder={t(F.emailPh)}
                    value={values.email}
                    maxLength={150}
                    onChange={(e) => update('email', e.target.value)}
                    onBlur={() => onBlur('email')}
                    aria-invalid={!!err('email')}
                    aria-describedby="cf-email-error"
                    required
                  />
                </Field>
                <Field id="cf-message" label={t(F.message)} error={err('message')}>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    className={`${inputCls} resize-y`}
                    placeholder={t(F.messagePh)}
                    value={values.message}
                    maxLength={4000}
                    onChange={(e) => update('message', e.target.value)}
                    onBlur={() => onBlur('message')}
                    aria-invalid={!!err('message')}
                    aria-describedby="cf-message-error"
                    required
                  />
                </Field>

                {/* Honeypot: invisible para personas, tentador para bots */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="cf-gotcha">{t(F.honeypot)}</label>
                  <input
                    id="cf-gotcha"
                    name="_gotcha"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="anim-shake flex gap-3 rounded-2xl border border-danger/40 bg-danger/10 p-4 text-sm"
                  >
                    <CircleAlert className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden />
                    <div>
                      <p className="font-semibold">{t(F.errorTitle)}</p>
                      <p className="mt-1 text-muted">{t(F.errorBody)}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    data-magnetic
                    disabled={status === 'sending'}
                    className={`${buttonClasses('primary')} w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto`}
                  >
                    <span data-magnetic-inner className="inline-flex items-center gap-2">
                      {status === 'sending' ? (
                        <>
                          <LoaderCircle className="size-4 animate-spin" aria-hidden />{' '}
                          {t(F.sending)}
                        </>
                      ) : (
                        <>
                          {t(F.send)} <Send className="size-4" aria-hidden />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
