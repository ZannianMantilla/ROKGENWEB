/** Huella de oso: guiño a la marca (el oso del logo) en separadores y viñetas. */
export function Paw({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <ellipse cx="12" cy="16.5" rx="5.6" ry="4.6" />
      <ellipse cx="5" cy="10.5" rx="2.1" ry="2.7" transform="rotate(-18 5 10.5)" />
      <ellipse cx="9.4" cy="6.6" rx="2.2" ry="2.9" transform="rotate(-6 9.4 6.6)" />
      <ellipse cx="14.6" cy="6.6" rx="2.2" ry="2.9" transform="rotate(6 14.6 6.6)" />
      <ellipse cx="19" cy="10.5" rx="2.1" ry="2.7" transform="rotate(18 19 10.5)" />
    </svg>
  );
}
