import { useEffect, useRef, type ComponentType } from 'react';
import { pageSeo, ui } from './data/content';
import { useT } from './hooks/useT';
import { loadAnalytics } from './lib/analytics';
import { ROUTES, useRoute, type RouteId } from './lib/router';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { StackPage } from './components/pages/StackPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { JourneyPage } from './components/pages/JourneyPage';
import { ContactPage } from './components/pages/ContactPage';
import { NextPage, NotFound, PageCta } from './components/pages/PageExtras';
import { BrandSprite } from './components/ui/BrandIcon';
import { TONES } from './lib/section';

const PAGES: Record<RouteId, ComponentType> = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  stack: StackPage,
  projects: ProjectsPage,
  experience: JourneyPage,
  contact: ContactPage,
  notFound: NotFound,
};

const idle = (fn: () => void, timeout = 1500) =>
  typeof window.requestIdleCallback === 'function'
    ? window.requestIdleCallback(fn, { timeout })
    : window.setTimeout(fn, 300);

const loadEnhance = () => import('./lib/enhance');

export function App() {
  const { t, lang } = useT();
  const route = useRoute();
  const Page = PAGES[route];
  const firstRender = useRef(true);

  // Título, descripción y canonical de la página actual (el HTML prerenderizado ya los trae).
  useEffect(() => {
    const meta = pageSeo[route];
    document.title = t(meta.title);
    for (const sel of ['meta[name="description"]', 'meta[property="og:description"]'])
      document.querySelector(sel)?.setAttribute('content', t(meta.description));
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t(meta.title));
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical && route !== 'notFound')
      canonical.href = new URL(ROUTES[route], canonical.href).href;
  }, [route, lang, t]);

  // Al navegar, el foco pasa al contenido nuevo para lectores de pantalla y teclado.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [route]);

  // Scroll suave, cursor y analítica: una vez, cuando el navegador está libre.
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    idle(() => {
      loadEnhance().then((m) => {
        if (!cancelled) cleanup = m.enhanceGlobal();
      });
      if (!cancelled) loadAnalytics();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // Animaciones de la página: se rehacen en cada cambio de ruta.
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    idle(() =>
      loadEnhance().then((m) => {
        if (!cancelled) cleanup = m.enhancePage();
      }),
    );
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [route]);

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-accent-strong px-5 py-3 font-semibold text-on-accent transition-transform focus:translate-y-0"
      >
        {t(ui.skip)}
      </a>
      <BrandSprite />
      <ScrollProgress />
      <Navbar route={route} />
      <main id="main" tabIndex={-1} className="outline-none" key={route} data-tone={TONES[route]}>
        <Page />
        {!['home', 'contact', 'notFound'].includes(route) && <PageCta />}
        <NextPage current={route} />
      </main>
      <Footer />
      <div className="grain" aria-hidden />
    </>
  );
}
