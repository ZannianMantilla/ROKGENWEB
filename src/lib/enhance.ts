/**
 * Mejoras progresivas cargadas en diferido (chunk aparte): GSAP + ScrollTrigger, Lenis,
 * cursor, botones magnéticos y tilt. El sitio es 100 % usable sin este módulo.
 * enhanceGlobal() se inicia una vez; enhancePage() se reinicia en cada cambio de página.
 * Solo se animan transform y opacity. Nunca se usa visibility, para no romper el foco por teclado.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/** Cede el hilo principal entre pasos para que ninguna tarea supere ~50 ms (mejor INP/TBT). */
const yieldToMain = () => new Promise<void>((r) => setTimeout(r, 0));

type Kit = { ctx: gsap.Context; cleanups: (() => void)[]; finePointer: boolean };

/** Ejecuta los pasos cediendo el hilo entre cada uno y devuelve la función de limpieza. */
function run(build: (kit: Kit) => (() => void)[]): () => void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cleanups: (() => void)[] = [];
  let disposed = false;
  const ctx = gsap.context(() => {});
  cleanups.push(() => ctx.revert());
  const steps = build({ ctx, cleanups, finePointer });

  (async () => {
    for (const step of steps) {
      if (disposed) return;
      step();
      await yieldToMain();
    }
  })();

  return () => {
    disposed = true;
    cleanups.forEach((fn) => fn());
  };
}

/** Lo que vive mientras dura la visita: scroll suave, cursor y recálculo de posiciones. */
export function enhanceGlobal(): () => void {
  console.info(
    '%cʕ•ᴥ•ʔ %c¿Curioseando el código? Si te gusta lo que ves, hablemos: zanniancelis@gmail.com',
    'font-size:16px',
    'color:#c084fc',
  );
  return run(({ cleanups, finePointer }) => [
    /* Scroll suave: solo con mouse/trackpad; en táctil el scroll nativo es mejor. */
    () => {
      if (!finePointer) return;
      const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -64 }, autoRaf: false });
      const raf = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      // Al cambiar de página se empieza arriba o en el ancla de la URL: Lenis debe saberlo.
      const toTop = () => {
        const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
        lenis.scrollTo(target ?? 0, { immediate: true, force: true, offset: target ? -96 : 0 });
      };
      addEventListener('routechange', toTop);
      cleanups.push(() => {
        removeEventListener('routechange', toTop);
        gsap.ticker.remove(raf);
        lenis.destroy();
      });
    },

    /* Recalcula posiciones cuando cambian alturas (fuentes, cambio de idioma, imágenes). */
    () => {
      let t = 0;
      const ro = new ResizeObserver(() => {
        clearTimeout(t);
        t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      });
      ro.observe(document.body);
      cleanups.push(() => ro.disconnect());
    },

    () => {
      if (finePointer) cleanups.push(initCursor());
      cleanups.push(initPawTrail());
    },
  ]);
}

/** Animaciones de la página actual: se vuelven a crear en cada cambio de ruta. */
export function enhancePage(): () => void {
  return run(({ ctx, cleanups, finePointer }) => [
    /* Reveal al entrar en pantalla */
    () =>
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 94%', once: true },
          });
        });
      }),

    /* Títulos: cada palabra sube desde su máscara */
    () =>
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          gsap.from(el.querySelectorAll('.split-word > span'), {
            yPercent: 115,
            rotate: 7,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.07,
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });
      }),

    /* Stagger en grupos de tarjetas */
    () =>
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((el) => {
          gsap.from(el.children, {
            y: 60,
            scale: 0.94,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });
      }),

    /* Parallax, línea del timeline, contadores y salida del hero */
    () =>
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
          const speed = Number(el.dataset.speed) || 1;
          gsap.to(el, {
            y: -60 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-line]').forEach((el) => {
          gsap.fromTo(
            el,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement,
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: 0.6,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count) || 0;
          const state = { v: 0 };
          el.textContent = '0';
          gsap.to(state, {
            v: target,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = Math.round(state.v).toLocaleString(
                document.documentElement.lang === 'en' ? 'en-US' : 'es-CO',
              );
            },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });

        const heroContent = document.querySelector('[data-hero-content]');
        if (heroContent) {
          gsap.to(heroContent, {
            yPercent: -12,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true },
          });
        }
      }),

    /* Proyectos: cortina que destapa la vista y captura que entra con giro */
    () =>
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>('[data-curtain]').forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 1 },
            {
              scaleX: 0,
              duration: 1.3,
              ease: 'expo.inOut',
              scrollTrigger: { trigger: el.parentElement, start: 'top 85%', once: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>('[data-pop]').forEach((el) => {
          gsap.from(el, {
            scale: 0.75,
            rotate: -8,
            opacity: 0,
            duration: 1.4,
            delay: 0.35,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });
      }),

    /* Avatar: entra deslizándose, solo se anima mientras se ve y reacciona a la visita */
    () => {
      const els = gsap.utils.toArray<HTMLElement>('[data-avatar]');
      ctx.add(() => {
        els.forEach((el) => {
          gsap.from(el, {
            x: 70,
            rotate: 6,
            opacity: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });
      });
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) e.target.classList.toggle('in-view', e.isIntersecting);
      });
      els.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
      if (els.length) cleanups.push(initAvatarLife(els, finePointer));
    },

    /* Las animaciones CSS en bucle de un bloque se pausan mientras no se ve (ver .is-offscreen) */
    () => {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) e.target.classList.toggle('is-offscreen', !e.isIntersecting);
      });
      document.querySelectorAll('#main > *, #root > footer').forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    },

    /* Bandas de texto: se inclinan según la velocidad del scroll */
    () => {
      const els = gsap.utils.toArray<HTMLElement>('[data-skew]');
      if (!els.length) return;
      const setters = els.map((el) => gsap.quickTo(el, 'skewX', { duration: 0.5, ease: 'power3' }));
      let rest = 0;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = gsap.utils.clamp(-14, 14, self.getVelocity() / -250);
          setters.forEach((set) => set(skew));
          clearTimeout(rest);
          rest = window.setTimeout(() => setters.forEach((set) => set(0)), 120);
        },
      });
      cleanups.push(() => {
        clearTimeout(rest);
        st.kill();
      });
    },

    /* Micro-interacciones de escritorio */
    () => {
      if (finePointer) cleanups.push(initMagnetic(), initTilt());
    },
  ]);
}

/* ---------- Cursor: huella de oso que gira hacia donde se mueve, y resplandor (el cursor nativo se mantiene) ---------- */
function initCursor() {
  const make = (cls: string) => {
    const el = document.createElement('div');
    el.className = cls;
    el.setAttribute('aria-hidden', 'true');
    document.body.append(el);
    return el;
  };
  const glow = make('cursor-glow');
  const paw = make('cursor-paw');
  const follow = (el: HTMLElement, duration: number) => ({
    x: gsap.quickTo(el, 'x', { duration, ease: 'power3' }),
    y: gsap.quickTo(el, 'y', { duration, ease: 'power3' }),
  });
  const parts = [follow(paw, 0.12), follow(glow, 0.9)];
  const turn = gsap.quickTo(paw, 'rotation', { duration: 0.4, ease: 'power3' });
  const all = [glow, paw];
  let last = { x: 0, y: 0 };
  let angle = 0;

  const onMove = (e: PointerEvent) => {
    parts.forEach((p) => {
      p.x(e.clientX);
      p.y(e.clientY);
    });
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    if (dx * dx + dy * dy > 64) {
      // Los dedos apuntan hacia donde avanza (la huella dibujada mira hacia arriba = -90°).
      const target = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      angle += ((((target - angle) % 360) + 540) % 360) - 180; // por el giro más corto
      turn(angle);
      last = { x: e.clientX, y: e.clientY };
    }
    all.forEach((el) => el.classList.add('is-visible'));
    const interactive = (e.target as Element).closest?.(
      'a, button, [data-tilt], input, textarea, label',
    );
    paw.classList.toggle('is-hover', !!interactive);
  };
  const onLeave = () => all.forEach((el) => el.classList.remove('is-visible'));
  const onDown = () => paw.classList.add('is-down');
  const onUp = () => paw.classList.remove('is-down');

  addEventListener('pointermove', onMove, { passive: true });
  addEventListener('pointerdown', onDown);
  addEventListener('pointerup', onUp);
  document.documentElement.addEventListener('pointerleave', onLeave);
  return () => {
    removeEventListener('pointermove', onMove);
    removeEventListener('pointerdown', onDown);
    removeEventListener('pointerup', onUp);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    all.forEach((el) => el.remove());
  };
}

/* ---------- Huellas de oso bajando (o subiendo) por el borde izquierdo mientras se hace scroll ---------- */
function initPawTrail() {
  const STRIDE = 110; // px de scroll por paso
  let lastY = scrollY;
  let travelled = 0;
  let stepY = 90; // posición en pantalla del siguiente paso
  let left = true;

  const onScroll = () => {
    const dy = scrollY - lastY;
    lastY = scrollY;
    travelled += Math.abs(dy);
    if (travelled < STRIDE || !dy) return;
    travelled = 0;
    const down = dy > 0;
    stepY += down ? 56 : -56;
    if (stepY > innerHeight - 60) stepY = 90;
    if (stepY < 90) stepY = innerHeight - 60;
    left = !left;
    const print = document.createElement('span');
    print.className = 'paw-print';
    print.setAttribute('aria-hidden', 'true');
    // En móvil caben en el margen de 20 px de .shell, sin tapar el texto.
    const [x, gap] = innerWidth < 640 ? [3, 6] : [18, 14];
    print.style.transform = `translate(${x + (left ? 0 : gap)}px, ${stepY}px) rotate(${down ? 180 + (left ? 8 : -8) : left ? -8 : 8}deg)`;
    print.addEventListener('animationend', () => print.remove(), { once: true });
    document.body.append(print);
  };
  addEventListener('scroll', onScroll, { passive: true });
  return () => {
    removeEventListener('scroll', onScroll);
    document.querySelectorAll('.paw-print').forEach((el) => el.remove());
  };
}

/* ---------- Avatar vivo ----------
 * - Con mouse: la mirada y el cuerpo siguen al cursor, y el cristal se enciende al acercarse.
 * - Sin mouse (o con el cursor quieto): mira a su alrededor cada pocos segundos.
 * - Al pasar por un enlace o botón (o enfocarlo con teclado) el cristal late más rápido.
 * Solo escribe variables CSS y transform en los avatares visibles (ver "Avatar vivo" en index.css). */
function initAvatarLife(avatars: HTMLElement[], finePointer: boolean) {
  const rigs = avatars.map((el) => {
    const rig = el.querySelector<HTMLElement>('.avatar-rig')!;
    const crystal = el.querySelector<HTMLElement>('[data-crystal]')!;
    gsap.set(rig, { transformPerspective: 800 });
    // Las variables se escriben directo y las suaviza CSS: animarlas con GSAP lee getComputedStyle
    // en cada cambio y fuerza un recálculo de estilos por frame.
    const set = (name: string, value: number) => rig.style.setProperty(name, value.toFixed(3));
    return {
      el,
      crystal,
      near: 0,
      charge: -1,
      look(lx: number, ly: number) {
        set('--lx', lx);
        set('--ly', ly);
      },
      rx: gsap.quickTo(rig, 'rotationX', { duration: 1.1, ease: 'power3' }),
      ry: gsap.quickTo(rig, 'rotationY', { duration: 1.1, ease: 'power3' }),
      setCharge(v: number) {
        if (v === this.charge) return;
        this.charge = v;
        set('--charge', v);
      },
    };
  });
  const live = () => rigs.filter((r) => r.el.classList.contains('in-view'));
  const clamp = gsap.utils.clamp(-1, 1);
  let hover = 0;
  const applyCharge = () =>
    live().forEach((r) => r.setCharge(Math.round(Math.max(hover, r.near) * 20) / 20));

  /* Mira hacia un punto de la pantalla */
  const lookAt = (x: number, y: number) => {
    for (const r of live()) {
      const box = r.crystal.getBoundingClientRect();
      const dx = x - (box.left + box.width / 2);
      const dy = y - (box.top + box.height / 2);
      r.look(clamp(dx / 320), clamp(dy / 320));
      r.ry(clamp(dx / 900) * 9);
      r.rx(clamp(dy / 900) * -6);
      r.near = gsap.utils.clamp(0, 1, 1 - Math.hypot(dx, dy) / 280);
    }
    applyCharge();
  };

  /* Mirada ociosa: elige un punto al azar cerca de sí mismo */
  let idle: gsap.core.Tween | undefined;
  const wander = () => {
    for (const r of live()) {
      const lx = gsap.utils.random(-0.8, 0.8);
      const ly = gsap.utils.random(-0.5, 0.6);
      r.look(lx, ly);
      r.ry(lx * 5);
      r.rx(ly * -3);
    }
    idle = gsap.delayedCall(gsap.utils.random(2.2, 4.5), wander);
  };
  const restartIdle = () => {
    idle?.kill();
    idle = gsap.delayedCall(3, wander);
  };
  restartIdle();

  let frame = 0;
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => lookAt(e.clientX, e.clientY));
    restartIdle();
  };
  const interactive = 'a, button, input, textarea, select, [data-tilt]';
  const onOver = (e: Event) => {
    hover = (e.target as Element).closest?.(interactive) ? 1 : 0;
    applyCharge();
  };

  if (finePointer) addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerover', onOver, { passive: true });
  document.addEventListener('focusin', onOver);
  return () => {
    idle?.kill();
    cancelAnimationFrame(frame);
    removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerover', onOver);
    document.removeEventListener('focusin', onOver);
  };
}

/* ---------- Botones magnéticos ---------- */
function initMagnetic() {
  const els = gsap.utils.toArray<HTMLElement>('[data-magnetic]');
  const offs = els.map((el) => {
    const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const ixTo = inner && gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const iyTo = inner && gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    let rect: DOMRect | null = null;

    const enter = () => (rect = el.getBoundingClientRect());
    const move = (e: PointerEvent) => {
      if (!rect) return;
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * 0.25);
      yTo(dy * 0.3);
      ixTo?.(dx * 0.12);
      iyTo?.(dy * 0.15);
    };
    const leave = () => {
      rect = null;
      xTo(0);
      yTo(0);
      ixTo?.(0);
      iyTo?.(0);
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.set([el, inner], { clearProps: 'transform' });
    };
  });
  return () => offs.forEach((fn) => fn());
}

/* ---------- Tarjetas con tilt 3D + spotlight ---------- */
function initTilt() {
  const els = gsap.utils.toArray<HTMLElement>('[data-tilt]');
  const offs = els.map((el) => {
    let rect: DOMRect | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!rect || !last) return;
      const px = (last.clientX - rect.left) / rect.width;
      const py = (last.clientY - rect.top) / rect.height;
      el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
      el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    };
    const enter = () => {
      rect = el.getBoundingClientRect();
      el.classList.add('is-tilting');
    };
    const move = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const leave = () => {
      rect = null;
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  });
  return () => offs.forEach((fn) => fn());
}
