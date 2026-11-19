export type Variant = 'primary' | 'ghost';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold transition-[background-color,border-color,color,box-shadow] duration-300 select-none';

const variants: Record<Variant, string> = {
  primary:
    'btn-shine bg-brand text-on-accent shadow-[0_10px_40px_-10px_var(--accent-strong)] hover:shadow-[0_16px_60px_-6px_var(--accent-strong)]',
  ghost:
    'btn-shine border border-line-strong text-fg hover:border-accent hover:bg-[color-mix(in_oklab,var(--accent-strong)_14%,transparent)]',
};

export const buttonClasses = (variant: Variant = 'primary') => `${base} ${variants[variant]}`;
