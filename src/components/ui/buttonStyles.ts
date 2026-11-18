export type Variant = 'primary' | 'ghost';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold transition-[background-color,border-color,color,box-shadow] duration-300 select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-strong text-on-accent shadow-[0_10px_40px_-10px_var(--accent-strong)] hover:shadow-[0_14px_50px_-8px_var(--accent-strong)]',
  ghost: 'border border-line-strong text-fg hover:border-accent hover:bg-surface/60',
};

export const buttonClasses = (variant: Variant = 'primary') => `${base} ${variants[variant]}`;
