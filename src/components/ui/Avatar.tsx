/** Ilustraciones del avatar con fondo recortado (generadas por scripts/avatars.mjs). Decorativas. */
const AVATARS = {
  intro: { w: 722, h: 1436 },
  checklist: { w: 1060, h: 1472 },
  proyectos: { w: 1068, h: 1463 },
  pulgar: { w: 970, h: 1472 },
  contacto: { w: 1052, h: 1472 },
} as const;

export type AvatarName = keyof typeof AVATARS;

type Props = {
  name: AvatarName;
  /** Ancho mostrado, para que el navegador elija entre 360 y 720 px. */
  sizes: string;
  className?: string;
  /** Desvanece el borde inferior (para los bustos cortados). */
  fade?: boolean;
};

/**
 * El contenedor externo recibe la entrada con GSAP (data-avatar) y el interno flota con CSS.
 * La flotación solo corre mientras el avatar está en pantalla (.in-view, ver enhance.ts).
 */
export function Avatar({ name, sizes, className = '', fade = false }: Props) {
  const { w, h } = AVATARS[name];
  const base = `/assets/generated/avatar-${name}`;
  const set = (ext: string) => `${base}-360.${ext} 360w, ${base}-720.${ext} 720w`;
  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`} data-avatar>
      <div className="avatar-float">
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
      </div>
    </div>
  );
}
