import { useEffect } from 'react';
import { ui } from './data/content';
import { useT } from './hooks/useT';
import { followSystemTheme } from './lib/prefs';
import { loadAnalytics } from './lib/analytics';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Stack } from './components/sections/Stack';
import { Projects } from './components/sections/Projects';
import { Journey } from './components/sections/Journey';
import { Contact } from './components/sections/Contact';
import { BrandSprite } from './components/ui/BrandIcon';

const idle = (fn: () => void, timeout = 1500) =>
  typeof window.requestIdleCallback === 'function'
    ? window.requestIdleCallback(fn, { timeout })
    : window.setTimeout(fn, 300);

export function App() {
  const { t } = useT();

  useEffect(() => followSystemTheme(), []);

  // Animaciones, scroll suave y analítica se cargan cuando el navegador está libre.
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    idle(() => {
      import('./lib/enhance').then((m) => {
        if (!cancelled) cleanup = m.enhance();
      });
      if (!cancelled) loadAnalytics();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

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
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Services />
        <Stack />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden />
    </>
  );
}
