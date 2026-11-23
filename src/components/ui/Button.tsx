import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { buttonClasses, type Variant } from './buttonStyles';
import { handleLinkClick, withBase } from '../../lib/router';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
};

/** Enlace con apariencia de botón. `data-magnetic` activa el efecto magnético en desktop. */
export function ButtonLink({
  variant = 'primary',
  icon,
  external,
  className = '',
  href = '',
  children,
  ...rest
}: Props) {
  return (
    <a
      data-magnetic
      href={withBase(href)}
      className={`${buttonClasses(variant)} ${className}`}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : { onClick: handleLinkClick })}
      {...rest}
    >
      <span className="inline-flex items-center gap-2" data-magnetic-inner>
        {children}
        {icon}
      </span>
    </a>
  );
}
