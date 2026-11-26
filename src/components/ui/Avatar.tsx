import type { CSSProperties, ReactNode } from 'react';

/**
 * Ilustraciones del avatar con fondo recortado (generadas por scripts/avatars.mjs).
 * `eyes` y `crystal` son la posición (en % de la imagen) de los ojos y del cristal del colgante,
 * medidos sobre los PNG recortados: ahí se dibujan los brillos animados. `glow` y `eye` son su tamaño.
 */
const AVATARS = {
  intro: {
    w: 722,
    h: 1436,
    eyes: [
      [50.9, 10.6],
      [57.6, 10.4],
    ],
    crystal: [66.9, 29.2],
    glow: '26%',
    eye: '3%',
  },
  ram: {
    w: 959,
    h: 1279,
    eyes: [
      [42.4, 15.2],
      [50, 17.3],
    ],
    crystal: [52.4, 47.4],
    glow: '24%',
    eye: '2.4%',
  },
  metricas: {
    w: 965,
    h: 1428,
    eyes: [
      [44.4, 16.1],
      [51.8, 16.2],
    ],
    crystal: [59.7, 39.9],
    glow: '24%',
    eye: '2.4%',
  },
  checklist: {
    w: 1060,
    h: 1472,
    eyes: [
      [48.9, 22.2],
      [62.9, 24.5],
    ],
    crystal: [58.1, 64.3],
    glow: '38%',
    eye: '4.4%',
  },
  proyectos: {
    w: 1068,
    h: 1463,
    eyes: [
      [50.3, 24.6],
      [64.4, 23.4],
    ],
    crystal: [65.2, 71.7],
    glow: '38%',
    eye: '4.4%',
  },
  pulgar: {
    w: 970,
    h: 1472,
    eyes: [
      [53.8, 20.8],
      [68.8, 23.8],
    ],
    crystal: [69, 68.8],
    glow: '38%',
    eye: '4.4%',
  },
  contacto: {
    w: 1052,
    h: 1472,
    eyes: [
      [49.7, 22],
      [64.2, 24],
    ],
    crystal: [63.5, 72.8],
    glow: '38%',
    eye: '4.4%',
  },
} as const;

export type AvatarName = keyof typeof AVATARS;

/** Tamaño del recorte en px (para reservar su proporción). */
export const avatarSize = (name: AvatarName) => ({ w: AVATARS[name].w, h: AVATARS[name].h });

type Props = {
  name: AvatarName;
  /** Ancho mostrado, para que el navegador elija entre 360 y 720 px. */
  sizes: string;
  className?: string;
  /** Desvanece el borde inferior (para los bustos cortados). */
  fade?: boolean;
  /** Contenido anclado al cristal (p. ej. el botón del cristal en el hero). */
  children?: ReactNode;
};

const at = ([x, y]: readonly [number, number]) => ({ left: `${x}%`, top: `${y}%` });

/**
 * Capas, de fuera hacia dentro:
 * - data-avatar: entrada con GSAP.
 * - .avatar-rig: se inclina y mira hacia el cursor (initAvatarLife en enhance.ts).
 * - .avatar-float y .avatar-breathe: flotan y respiran con CSS, solo mientras se ve (.in-view).
 * - Brillos de ojos (miran hacia el cursor y parpadean) y latido del cristal.
 */
export function Avatar({ name, sizes, className = '', fade = false, children }: Props) {
  const { w, h, eyes, crystal, glow, eye } = AVATARS[name];
  const base = `${import.meta.env.BASE_URL}assets/generated/avatar-${name}`;
  const set = (ext: string) => `${base}-360.${ext} 360w, ${base}-720.${ext} 720w`;
  return (
    <div className={`pointer-events-none select-none ${className}`} data-avatar>
      <div className="avatar-rig">
        <div className="avatar-float">
          <div
            aria-hidden
            className="avatar-breathe"
            style={{ '--crystal-size': glow, '--eye': eye } as CSSProperties}
          >
            <picture>
              <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
              <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
              <img
                src={`${base}-360.webp`}
                width={w}
                height={h}
                alt=""
                loading="lazy"
                decoding="async"
                className={`h-auto w-full ${fade ? '[mask-image:linear-gradient(#000_70%,transparent)]' : ''}`}
              />
            </picture>
            <span className="avatar-crystal" style={at(crystal)} data-crystal />
            {eyes.map((eye, i) => (
              <span
                key={i}
                className="avatar-eye"
                style={{ ...at(eye), '--i': i } as CSSProperties}
              />
            ))}
          </div>
          {children && (
            <div className="absolute size-0" style={at(crystal)}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
