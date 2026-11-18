import { brandPaths, type BrandName } from './brandPaths';

type Props = { name: BrandName; className?: string; colored?: boolean; title?: string };

/** Ícono de marca que referencia el sprite (<BrandSprite />): cada path viaja una sola vez en el HTML. */
export function BrandIcon({ name, className = 'size-5', colored = false, title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={colored ? brandPaths[name].hex : 'currentColor'}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <use href={`#brand-${name}`} />
    </svg>
  );
}

export function BrandSprite() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute" focusable="false">
      {(Object.keys(brandPaths) as BrandName[]).map((name) => (
        <symbol key={name} id={`brand-${name}`} viewBox="0 0 24 24">
          <path d={brandPaths[name].path} />
        </symbol>
      ))}
    </svg>
  );
}
