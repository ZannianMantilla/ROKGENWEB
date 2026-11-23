import type { AnchorHTMLAttributes } from 'react';
import { handleLinkClick, withBase } from '../../lib/router';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Enlace interno: navega sin recargar la página (y sigue siendo un <a> normal sin JS). */
export function Link({ to, onClick, ...rest }: Props) {
  return (
    <a
      href={withBase(to)}
      onClick={(e) => {
        onClick?.(e);
        handleLinkClick(e);
      }}
      {...rest}
    />
  );
}
