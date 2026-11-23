import { useEffect, useRef } from 'react';

/** Barra de progreso de lectura. Solo actualiza transform dentro de rAF. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let max = 0;
    // El alto se mide solo cuando cambia: leerlo en cada scroll fuerza un recálculo de estilos.
    const measure = () => {
      max = document.documentElement.scrollHeight - innerHeight;
      onScroll();
    };
    const update = () => {
      frame = 0;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--accent-strong),var(--accent-2),var(--accent-3))] shadow-[0_0_12px_var(--accent-2)] [view-transition-name:scroll-progress]"
    />
  );
}
