/** Una sección se muestra como resumen en el inicio (nivel 2) o como página propia (nivel 1). */
export type SectionProps = {
  level?: 1 | 2;
  /** Muestra "Ver más" hacia la página completa (solo en el inicio). */
  more?: boolean;
};

/** Etiquetas de los subtítulos según el nivel del título principal, para no saltar niveles. */
export const subHeadings = (level: 1 | 2) =>
  level === 1 ? (['h2', 'h3'] as const) : (['h3', 'h4'] as const);

/** En su propia página la sección deja espacio arriba para la barra fija. */
export const sectionPadding = (level: 1 | 2) =>
  level === 1 ? 'pt-32 pb-24 md:pt-40 md:pb-36' : 'py-24 md:py-36';
