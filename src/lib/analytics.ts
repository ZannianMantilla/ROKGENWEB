/**
 * Analítica opcional. Solo se carga si hay variables de entorno, y en diferido.
 * VITE_PLAUSIBLE_DOMAIN → Plausible (sin cookies). VITE_GA_ID → Google Analytics 4.
 */
type Win = Window & {
  plausible?: (event: string) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

const PLAUSIBLE = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

function inject(src: string, attrs: Record<string, string> = {}) {
  const s = document.createElement('script');
  s.src = src;
  s.defer = true;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.append(s);
}

export function loadAnalytics() {
  const w = window as Win;
  if (PLAUSIBLE) inject('https://plausible.io/js/script.js', { 'data-domain': PLAUSIBLE });
  if (GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID)) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag('js', new Date());
    w.gtag('config', GA_ID, { anonymize_ip: true });
    inject(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  }
}

export function trackEvent(name: string) {
  const w = window as Win;
  w.plausible?.(name);
  w.gtag?.('event', name);
}
