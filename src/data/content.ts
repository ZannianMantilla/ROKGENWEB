/**
 * Contenido del sitio. Edita aquí textos, enlaces, proyectos y experiencia sin tocar componentes.
 * Cada texto traducible es un objeto { es, en }. Los campos marcados con TODO son pendientes reales.
 */
import type { BrandName } from '../components/ui/brandPaths';

export type Lang = 'es' | 'en';
export type Localized<T = string> = Record<Lang, T>;

/* ------------------------------------------------------------------ */
/* Datos de contacto y enlaces                                         */
/* ------------------------------------------------------------------ */
export const profile = {
  name: 'Zannián Mantilla Celis',
  /** Nombre de marca. El nombre completo solo se usa en la presentación (hero). */
  shortName: 'Zannián MC',
  email: 'zanniancelis@gmail.com',
  phoneDisplay: '+57 324 603 3634',
  /** Número en formato internacional sin "+" para wa.me */
  whatsapp: '573246033634',
  github: 'https://github.com/ZannianMantilla',
  linkedin: '' as string, // TODO: pega la URL de tu perfil de LinkedIn. Si queda vacío, el botón no aparece.
  locations: ['Girón, Santander', 'Bucaramanga, Santander', 'Líbano, Tolima'],
  country: 'Colombia',
  /** Año desde el que se cuentan los años de experiencia (Técnico en Sistemas / Soporte, 2022). */
  careerStartYear: 2022,
  photo: {
    /** Generado por `npm run images` a partir de public/assets/foto.jpg */
    base: `${import.meta.env.BASE_URL}assets/generated/foto`,
    widths: [320, 640, 960],
    width: 960,
    height: 1200,
  },
} as const;

/** Ayuda de tipos: valida cada elemento contra T sin perder el tipo general. */
const list = <T>(items: T[]) => items;

export const whatsappLink = (text: string) =>
  `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/* Interfaz (navegación, botones, etiquetas)                           */
/* ------------------------------------------------------------------ */
export const ui = {
  skip: { es: 'Saltar al contenido', en: 'Skip to content' },
  nav: {
    about: { es: 'Sobre mí', en: 'About' },
    services: { es: 'Servicios', en: 'Services' },
    stack: { es: 'Stack', en: 'Stack' },
    projects: { es: 'Proyectos', en: 'Projects' },
    experience: { es: 'Trayectoria', en: 'Journey' },
    contact: { es: 'Contacto', en: 'Contact' },
  },
  openMenu: { es: 'Abrir menú', en: 'Open menu' },
  closeMenu: { es: 'Cerrar menú', en: 'Close menu' },
  mainNav: { es: 'Navegación principal', en: 'Main navigation' },
  langSwitch: { es: 'Switch to English', en: 'Cambiar a español' },
  sound: { es: 'Sonidos de la web', en: 'Site sounds' },
  home: { es: 'Inicio', en: 'Home' },
  footerNav: { es: 'Páginas del sitio', en: 'Site pages' },
} satisfies Record<string, Localized | Record<string, Localized>>;

/* ------------------------------------------------------------------ */
/* SEO                                                                  */
/* ------------------------------------------------------------------ */
export const seo = {
  title: {
    es: 'Zannián MC · Desarrollador de software freelance',
    en: 'Zannián MC · Freelance software developer',
  },
  description: {
    es: 'Desarrollador freelance en Colombia: apps móviles con Flutter y Firebase, sitios web a medida y WordPress, diseño UI/UX y análisis de datos con Python.',
    en: 'Freelance developer based in Colombia: Flutter & Firebase mobile apps, custom websites and WordPress, UI/UX design and data analysis with Python.',
  },
};

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
export const hero = {
  kicker: { es: 'Disponible para proyectos freelance', en: 'Available for freelance projects' },
  headline: {
    es: ['Software que', 'resuelve problemas', 'reales.'],
    en: ['Software that', 'solves real', 'problems.'],
  },
  roles: {
    es: [
      'Desarrollo apps móviles',
      'Creo sitios web modernos',
      'Gestiono redes de marcas',
      'Convierto datos en decisiones',
    ],
    en: [
      'I build mobile apps',
      'I craft modern websites',
      'I run brands’ social media',
      'I turn data into decisions',
    ],
  },
  intro: {
    es: 'Soy Zannián Mantilla Celis, desarrollador de software y community manager en Colombia. Trabajo en mobile, frontend, redes sociales y análisis de datos, y cuido cada proyecto desde la idea hasta la entrega.',
    en: 'I’m Zannián Mantilla Celis, a software developer and community manager based in Colombia. I work across mobile, frontend, social media and data analysis, and I look after every project from idea to delivery.',
  },
  ctaPrimary: { es: 'Hablemos', en: 'Let’s talk' },
  ctaSecondary: { es: 'Ver proyectos', en: 'See projects' },
  whatsappText: {
    es: 'Hola Zannián, vi tu portafolio y me gustaría hablar sobre un proyecto.',
    en: 'Hi Zannián, I saw your portfolio and I’d like to talk about a project.',
  },
  scroll: { es: 'Desliza', en: 'Scroll' },
  /** Lo que dice el avatar al tocar su cristal. */
  crystal: {
    label: { es: 'Tocar el cristal del avatar', en: 'Tap the avatar’s crystal' },
    line: { es: '¿Qué hay pa’ hacer?', en: 'So, what are we building?' },
  },
  headlineLabel: {
    es: 'Zannián Mantilla Celis — Desarrollador de Software | Frontend | Mobile | Análisis de Datos | Soporte TI',
    en: 'Zannián Mantilla Celis — Software Developer | Frontend | Mobile | Data Analysis | IT Support',
  },
};

/* ------------------------------------------------------------------ */
/* Sobre mí                                                             */
/* ------------------------------------------------------------------ */
export const about = {
  kicker: { es: '01 · Sobre mí', en: '01 · About' },
  title: {
    es: 'Código, diseño y datos en la misma conversación.',
    en: 'Code, design and data in the same conversation.',
  },
  bio: {
    es: [
      'Soy Tecnólogo en Análisis y Desarrollo de Software del SENA y estudio Ingeniería de Software en la UTO. Desde 2022 trabajo en soporte técnico y mantenimiento de equipos, desarrollo frontend, apps móviles y gestión de redes sociales, tanto en proyectos independientes como en equipos multidisciplinarios y entornos organizacionales.',
      'Construyo apps con Flutter, FlutterFlow y Firebase, sitios con HTML, CSS, JavaScript y WordPress, y analizo datos con Python. También diseño interfaces en Figma y produzco piezas visuales con Photoshop, Illustrator y CapCut.',
      'Me considero adaptable, creativo y analítico: primero entiendo el problema y después elijo la herramienta.',
    ],
    en: [
      'I hold a Software Analysis and Development technologist degree from SENA and I’m studying Software Engineering at UTO. Since 2022 I’ve worked in IT support and hardware maintenance, frontend development, mobile apps and social media management, both on independent projects and in multidisciplinary teams and organizations.',
      'I build apps with Flutter, FlutterFlow and Firebase, websites with HTML, CSS, JavaScript and WordPress, and I analyze data with Python. I also design interfaces in Figma and produce visual content with Photoshop, Illustrator and CapCut.',
      'I’m adaptable, creative and analytical: I understand the problem first, then pick the tool.',
    ],
  },
  photoAlt: {
    es: 'Retrato de Zannián MC',
    en: 'Portrait of Zannián MC',
  },
  facts: [
    {
      label: { es: 'Ubicación', en: 'Location' },
      value: {
        es: 'Girón y Bucaramanga, Santander · Líbano, Tolima',
        en: 'Girón & Bucaramanga, Santander · Líbano, Tolima',
      },
    },
    {
      label: { es: 'Idiomas', en: 'Languages' },
      value: {
        es: 'Español nativo · Inglés B1 · Ruso básico',
        en: 'Spanish (native) · English B1 · Russian (basic)',
      },
    },
    {
      label: { es: 'Formación', en: 'Education' },
      value: {
        es: 'Tecnólogo ADSO (SENA) · Ing. de Software (UTO, en curso)',
        en: 'Software Dev. Technologist (SENA) · Software Eng. (UTO, ongoing)',
      },
    },
  ],
  /** Solo cifras verificables. `value: 'years'` se calcula desde profile.careerStartYear. */
  stats: [
    {
      value: 'years',
      suffix: '+',
      label: { es: 'años de experiencia (desde 2022)', en: 'years of experience (since 2022)' },
    },
    {
      value: 'projects',
      suffix: '',
      label: { es: 'proyectos destacados', en: 'featured projects' },
    },
    {
      value: 'services',
      suffix: '',
      label: { es: 'servicios freelance', en: 'freelance services' },
    },
    { value: 3, suffix: '', label: { es: 'idiomas', en: 'languages' } },
  ] as const,
};

/* ------------------------------------------------------------------ */
/* Servicios                                                            */
/* ------------------------------------------------------------------ */
export type ServiceIcon = 'mobile' | 'web' | 'design' | 'data' | 'support' | 'content';

export const services = {
  kicker: { es: '02 · Servicios', en: '02 · Services' },
  title: { es: 'En qué te puedo ayudar', en: 'How I can help' },
  intro: {
    es: 'Servicios pensados para emprendedores, pymes y equipos que necesitan a alguien que entienda tanto la tecnología como el negocio.',
    en: 'Services for entrepreneurs, small businesses and teams that need someone who understands both the technology and the business.',
  },
  items: list<{ icon: ServiceIcon; title: Localized; description: Localized; tags: string[] }>([
    {
      icon: 'mobile',
      title: { es: 'Apps móviles', en: 'Mobile apps' },
      description: {
        es: 'Apps multiplataforma con Flutter y FlutterFlow, con autenticación y datos en Firebase.',
        en: 'Cross-platform apps with Flutter and FlutterFlow, with authentication and data on Firebase.',
      },
      tags: ['Flutter', 'Dart', 'FlutterFlow', 'Firebase'],
    },
    {
      icon: 'web',
      title: { es: 'Sitios web y WordPress', en: 'Websites & WordPress' },
      description: {
        es: 'Landing pages y sitios a medida, rápidos, responsivos y fáciles de administrar.',
        en: 'Custom landing pages and websites that are fast, responsive and easy to manage.',
      },
      tags: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    },
    {
      icon: 'design',
      title: { es: 'Diseño UI/UX', en: 'UI/UX design' },
      description: {
        es: 'Interfaces claras y prototipos navegables en Figma para validar ideas antes de programarlas.',
        en: 'Clear interfaces and clickable Figma prototypes to validate ideas before building them.',
      },
      tags: ['Figma', 'UI', 'UX'],
    },
    {
      icon: 'data',
      title: { es: 'Análisis de datos', en: 'Data analysis' },
      description: {
        es: 'Análisis exploratorio con Python y dashboards que convierten información en decisiones.',
        en: 'Exploratory analysis with Python and dashboards that turn information into decisions.',
      },
      tags: ['Python', 'Dashboards'],
    },
    {
      icon: 'support',
      title: { es: 'Soporte TI', en: 'IT support' },
      description: {
        es: 'Soporte presencial y remoto, mantenimiento preventivo de equipos e impresoras, e intranets en SharePoint.',
        en: 'On-site and remote support, preventive maintenance of computers and printers, and SharePoint intranets.',
      },
      tags: ['SharePoint', 'Helpdesk'],
    },
    {
      icon: 'content',
      title: { es: 'Contenido digital', en: 'Digital content' },
      description: {
        es: 'Gestión de redes, SEO y edición de video para que tu marca se vea y se encuentre.',
        en: 'Social media, SEO and video editing so your brand gets seen and found.',
      },
      tags: ['SEO', 'CapCut', 'Photoshop', 'Illustrator', 'Social media'],
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Stack tecnológico                                                    */
/* ------------------------------------------------------------------ */
/** Cursos complementarios (se listan en Trayectoria y se enlazan desde el Stack). */
const COURSES = {
  eda: {
    es: 'Análisis exploratorio de datos en Python',
    en: 'Exploratory data analysis in Python',
  },
  networking: { es: 'Networking básico', en: 'Networking basics' },
  cloud: { es: 'Cómputo en la nube', en: 'Cloud computing' },
  ml: { es: 'Machine Learning básico', en: 'Machine Learning basics' },
  english: { es: 'English Does Work L2', en: 'English Does Work L2' },
} satisfies Record<string, Localized>;

export type StackItem = {
  name: string | Localized;
  brand?: BrandName;
  mono?: string;
  /** Curso en el que se aprendió (se muestra en la página del stack). */
  course?: Localized;
};

export const stack = {
  kicker: { es: '03 · Stack', en: '03 · Stack' },
  title: { es: 'Herramientas con las que trabajo', en: 'Tools I work with' },
  intro: {
    es: 'Elijo la herramienta según el proyecto, no al revés.',
    en: 'I pick the tool for the project, not the other way around.',
  },
  groups: list<{ id: string; name: Localized; items: StackItem[] }>([
    {
      id: 'dev',
      name: { es: 'Desarrollo', en: 'Development' },
      items: [
        { name: 'Flutter', brand: 'flutter' },
        { name: 'Dart', brand: 'dart' },
        { name: 'FlutterFlow', mono: 'FF' },
        { name: 'Firebase', brand: 'firebase' },
        { name: 'HTML', brand: 'html' },
        { name: 'CSS', brand: 'css' },
        { name: 'JavaScript', brand: 'javascript' },
        { name: 'WordPress', brand: 'wordpress' },
        { name: 'SharePoint', mono: 'SP' },
      ],
    },
    {
      id: 'data',
      name: { es: 'Datos', en: 'Data' },
      items: [
        { name: 'Python', brand: 'python' },
        {
          name: { es: 'Análisis exploratorio', en: 'Exploratory analysis' },
          mono: 'EDA',
          course: COURSES.eda,
        },
        {
          name: { es: 'Machine Learning (básico)', en: 'Machine Learning (basic)' },
          mono: 'ML',
          course: COURSES.ml,
        },
        {
          name: { es: 'Cómputo en la nube (básico)', en: 'Cloud computing (basic)' },
          mono: 'CL',
          course: COURSES.cloud,
        },
        {
          name: { es: 'Networking (básico)', en: 'Networking (basic)' },
          mono: 'NW',
          course: COURSES.networking,
        },
      ],
    },
    {
      id: 'design',
      name: { es: 'Diseño y contenido', en: 'Design & content' },
      items: [
        { name: 'Figma', brand: 'figma' },
        { name: 'Photoshop', mono: 'Ps' },
        { name: 'Illustrator', mono: 'Ai' },
        { name: 'CapCut', mono: 'Cc' },
        { name: 'SEO', mono: 'SEO' },
        { name: { es: 'Redes sociales', en: 'Social media' }, mono: '#' },
      ],
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Proyectos                                                            */
/* ------------------------------------------------------------------ */
export type Project = {
  id: string;
  title: string;
  year: number;
  type: Localized;
  summary: Localized;
  description: Localized;
  highlights: Localized<string[]>;
  /** Tecnologías confirmadas. */
  stack: string[];
  role?: Localized;
  demoUrl?: string;
  repoUrl?: string;
  /** Captura principal (tarjeta del inicio). */
  image: Shot;
  /** Capturas que se ven en el detalle del proyecto. */
  gallery?: Shot[];
  /** Servicios a los que corresponde (se cruzan en la página de servicios). */
  services?: ServiceIcon[];
};

/** Captura de pantalla real, en /public. Se sirve `${base}-${ancho}.webp` para cada ancho. */
export type Shot = {
  base: string;
  widths: number[];
  /** Tamaño de la versión más grande. */
  width: number;
  height: number;
  alt: Localized;
  device: 'desktop' | 'mobile';
};

/** Sitio web en producción para un cliente (capturas tomadas del sitio publicado). */
export type ClientSite = {
  id: string;
  name: string;
  url: string;
  summary: Localized;
  role: Localized;
  desktop: Shot;
  mobile: Shot;
  services: ServiceIcon[];
  /** Tecnologías confirmadas en el sitio publicado. */
  stack: string[];
};

const siteShots = (id: string, name: string) => ({
  desktop: {
    base: `${import.meta.env.BASE_URL}assets/projects/${id}`,
    widths: [720, 1440],
    width: 1440,
    height: 900,
    alt: { es: `Página de inicio de ${name}`, en: `${name} home page` },
    device: 'desktop' as const,
  },
  mobile: {
    base: `${import.meta.env.BASE_URL}assets/projects/${id}-movil`,
    widths: [390, 780],
    width: 780,
    height: 1688,
    alt: { es: `${name} en móvil`, en: `${name} on mobile` },
    device: 'mobile' as const,
  },
});

const frontAndBack: Localized = {
  es: 'Desarrollo front-end y back-end',
  en: 'Front-end and back-end development',
};

const projectShot = (
  project: string,
  name: string,
  alt: Localized,
  device: Shot['device'] = 'desktop',
): Shot =>
  device === 'desktop'
    ? {
        base: `${import.meta.env.BASE_URL}assets/projects/${project}-${name}`,
        widths: [720, 1440],
        width: 1440,
        height: 900,
        alt,
        device,
      }
    : {
        base: `${import.meta.env.BASE_URL}assets/projects/${project}-${name}`,
        widths: [390, 780],
        width: 780,
        height: 1688,
        alt,
        device,
      };

const gymrockShots = {
  inicio: projectShot('gymrock', 'inicio', {
    es: 'Inicio de GymRock con el próximo entrenamiento, sus ejercicios y el botón para empezar',
    en: 'GymRock home with the next workout, its exercises and a start button',
  }),
  entrenar: projectShot('gymrock', 'entrenar', {
    es: 'Sesión de entrenamiento con kilos y repeticiones por serie, carga sugerida desde el 1RM y temporizador de descanso',
    en: 'Workout session with weight and reps per set, suggested load from 1RM and a rest timer',
  }),
  programa: projectShot('gymrock', 'programa', {
    es: 'Programa de fuerza intermedia por días, con series, %RM y kilos calculados',
    en: 'Intermediate strength program by day, with sets, %1RM and calculated weights',
  }),
  herramientas: projectShot('gymrock', 'herramientas', {
    es: 'Calculadoras de IMC y calorías diarias con los datos del usuario',
    en: 'BMI and daily calorie calculators using the user’s data',
  }),
  progreso: projectShot('gymrock', 'progreso', {
    es: 'Progreso con sesiones, racha, series, volumen, gráfico semanal y 1RM estimado',
    en: 'Progress with sessions, streak, sets, volume, weekly chart and estimated 1RM',
  }),
  bienvenida: projectShot('gymrock', 'bienvenida', {
    es: 'Pantalla de bienvenida de GymRock con el logo de Rock Fitness',
    en: 'GymRock welcome screen with the Rock Fitness logo',
  }),
  movil: projectShot(
    'gymrock',
    'movil',
    {
      es: 'Vista móvil del inicio con barra de navegación inferior',
      en: 'Mobile view of the home screen with bottom navigation bar',
    },
    'mobile',
  ),
};

const matemageShots = {
  inicio: projectShot('matemage', 'inicio', {
    es: 'Inicio de MATEMAGE: elegir operación (sumas, restas, multiplicar o dividir) y nivel',
    en: 'MATEMAGE start screen: pick an operation (add, subtract, multiply or divide) and a level',
  }),
  acierto: projectShot('matemage', 'acierto', {
    es: 'Pregunta de multiplicación respondida bien, con el mago frente al monstruo',
    en: 'Multiplication question answered correctly, with the wizard facing the monster',
  }),
  error: projectShot('matemage', 'error', {
    es: 'Respuesta equivocada: se marca la correcta y una pista explica por qué',
    en: 'Wrong answer: the right one is highlighted and a hint explains why',
  }),
  final: projectShot('matemage', 'final', {
    es: 'Fin de la ronda con estrellas, repaso de los errores y opción de practicarlos',
    en: 'End of the round with stars, a review of the mistakes and an option to practice them',
  }),
  movil: projectShot(
    'matemage',
    'movil',
    {
      es: 'Vista móvil de una pregunta con la pista tras un error',
      en: 'Mobile view of a question with the hint after a mistake',
    },
    'mobile',
  ),
};

const maxtriageShots = {
  bienvenida: projectShot('maxtriage', 'bienvenida', {
    es: 'Portada de MAXTRIAGE con los cinco niveles de triage, sus tiempos de atención y el aviso para llamar al 123',
    en: 'MAXTRIAGE landing page with the five triage levels, their target times and a call-123 notice',
  }),
  selector: projectShot('maxtriage', 'selector', {
    es: 'Selector de nivel de triage para el paciente, del I al V',
    en: 'Triage level picker for the patient, from I to V',
  }),
  nivel: projectShot('maxtriage', 'nivel', {
    es: 'Detalle del triage III con ejemplos y el formulario para describir el estado de salud',
    en: 'Triage III details with examples and the form to describe the health condition',
  }),
  espera: projectShot('maxtriage', 'espera', {
    es: 'Pantalla de espera del paciente con cuenta regresiva y resumen de su solicitud',
    en: 'Patient waiting screen with a countdown and a summary of the request',
  }),
  panel: projectShot('maxtriage', 'panel', {
    es: 'Cola de atención del personal de salud con el conteo por nivel y la solicitud del paciente',
    en: 'Healthcare staff queue with counts per level and the patient’s request',
  }),
  atendiendo: projectShot('maxtriage', 'panel-atendiendo', {
    es: 'Paciente en atención, con opciones para finalizar o reclasificar el nivel',
    en: 'Patient being attended, with options to finish or reclassify the level',
  }),
  movil: projectShot(
    'maxtriage',
    'movil',
    {
      es: 'Vista móvil del selector de triage con el aviso de emergencia y la barra inferior',
      en: 'Mobile view of the triage picker with the emergency notice and bottom bar',
    },
    'mobile',
  ),
};

const adsolearnShots = {
  inicio: projectShot('adsolearn', 'inicio', {
    es: 'Portada de ADSOLEARN con el titular “Freelancing para aprendices ADSO” y una oferta de ejemplo',
    en: 'ADSOLEARN landing page with the headline “Freelancing for ADSO apprentices” and a sample job offer',
  }),
  ofertas: projectShot('adsolearn', 'ofertas', {
    es: 'Buscador de ofertas del aprendiz, con rango de pago, cupos libres y botón para postularse',
    en: 'Apprentice job search with pay range, open spots and an apply button',
  }),
  misOfertas: projectShot('adsolearn', 'mis-ofertas', {
    es: 'Panel del contratista con sus ofertas activas, postulados y opción de cerrar cada oferta',
    en: 'Contractor dashboard with active offers, applicants and an option to close each offer',
  }),
  nueva: projectShot('adsolearn', 'nueva', {
    es: 'Formulario para publicar una oferta con título, descripción, pago en COP y cupos',
    en: 'Form to publish an offer with title, description, pay in COP and spots',
  }),
  postulados: projectShot('adsolearn', 'postulados', {
    es: 'Lista de aprendices postulados a una oferta, con enlace a su perfil',
    en: 'List of apprentices who applied to an offer, with a link to their profile',
  }),
  movil: projectShot(
    'adsolearn',
    'movil',
    {
      es: 'Vista móvil del buscador de ofertas con barra de navegación inferior',
      en: 'Mobile view of the job search with bottom navigation bar',
    },
    'mobile',
  ),
};

export const projects = {
  kicker: { es: '04 · Proyectos', en: '04 · Projects' },
  areaKicker: { es: 'Área 01 · Desarrollo de software', en: 'Area 01 · Software development' },
  title: { es: 'Proyectos destacados', en: 'Featured projects' },
  intro: {
    es: 'Una selección de lo que he construido: educación, empleo, salud y fitness.',
    en: 'A selection of what I’ve built: education, jobs, health and fitness.',
  },
  labels: {
    details: { es: 'Ver detalle', en: 'View details' },
    close: { es: 'Cerrar', en: 'Close' },
    year: { es: 'Año', en: 'Year' },
    type: { es: 'Tipo', en: 'Type' },
    role: { es: 'Mi rol', en: 'My role' },
    stack: { es: 'Stack', en: 'Stack' },
    highlights: { es: 'Puntos clave', en: 'Highlights' },
    demo: { es: 'Ver demo', en: 'Live demo' },
    repo: { es: 'Ver código', en: 'Source code' },
    screenshots: { es: 'Capturas', en: 'Screenshots' },
    showShot: { es: 'Ver captura', en: 'Show screenshot' },
    sitesTitle: { es: 'Sitios web para clientes', en: 'Client websites' },
    sitesIntro: {
      es: 'Sitios en producción en los que participé en el desarrollo front-end y back-end.',
      en: 'Live websites where I worked on both front-end and back-end development.',
    },
    visit: { es: 'Visitar sitio', en: 'Visit site' },
    talk: { es: '¿Quieres algo así? Hablemos', en: 'Want something like this? Let’s talk' },
  },
  items: list<Project>([
    {
      id: 'adsolearn',
      title: 'ADSOLEARN',
      year: 2024,
      type: { es: 'Web app · Educación y empleo', en: 'Web app · Education & jobs' },
      summary: {
        es: 'Plataforma de freelancing que conecta a aprendices ADSO del SENA con personas y empresas que necesitan proyectos de software.',
        en: 'Freelancing platform that connects SENA software development apprentices with people and companies that need software projects.',
      },
      description: {
        es: 'ADSOLEARN sirve para que los aprendices del programa Análisis y Desarrollo de Software (ADSO) del SENA ganen experiencia, ingresos y portafolio con trabajos reales. Los contratistas publican ofertas con rango de pago y cupos; los aprendices las buscan y se postulan, y el contratista revisa a los postulados y su perfil. Nació en 2024 como proyecto formativo con JSP, Servlets y MySQL, y lo rehice como web app moderna: validación en el cliente y en el servidor, recuperación de contraseña segura y una interfaz responsiva y accesible.',
        en: 'ADSOLEARN helps apprentices in SENA’s Software Analysis and Development (ADSO) program gain experience, income and portfolio pieces through real jobs. Contractors post offers with a pay range and a number of spots; apprentices search and apply, and the contractor reviews the applicants and their profiles. It started in 2024 as a training project built with JSP, Servlets and MySQL, and I rebuilt it as a modern web app: client- and server-side validation, secure password recovery and a responsive, accessible interface.',
      },
      highlights: {
        es: [
          'Roles de aprendiz y contratista',
          'Búsqueda de ofertas y postulación con control de cupos',
          'Validación con Zod y reglas de Firestore',
          'Responsiva y accesible',
        ],
        en: [
          'Apprentice and contractor roles',
          'Job search and applications with spot limits',
          'Validation with Zod and Firestore rules',
          'Responsive and accessible',
        ],
      },
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Zod', 'Firebase'],
      services: ['web'],
      // demoUrl: 'TODO', — aún no está desplegada
      // repoUrl: 'TODO',
      image: adsolearnShots.inicio,
      gallery: [
        adsolearnShots.inicio,
        adsolearnShots.ofertas,
        adsolearnShots.misOfertas,
        adsolearnShots.nueva,
        adsolearnShots.postulados,
        adsolearnShots.movil,
      ],
    },
    {
      id: 'gymrock',
      title: 'GYMROCK',
      year: 2023,
      type: { es: 'Web app y escritorio · Fitness', en: 'Web & desktop app · Fitness' },
      summary: {
        es: 'App de entrenamiento con planes por nivel y objetivo, registro de cada serie, calculadoras y seguimiento del progreso.',
        en: 'Training app with plans by level and goal, per-set logging, calculators and progress tracking.',
      },
      description: {
        es: 'GYMROCK sirve para entrenar con un plan. Según tu nivel y tu objetivo te asigna uno de 7 programas de fuerza e hipertrofia, registra los kilos y repeticiones de cada serie, sugiere la carga a partir de tu 1RM y controla el descanso con un temporizador. Incluye calentamiento guiado, calculadoras de IMC, calorías y 1RM, y estadísticas de progreso. Nació en 2023 como app móvil con FlutterFlow y Firebase, y la rehice como web app y app de escritorio para Windows que funciona sin internet y guarda los datos en el propio equipo.',
        en: 'GYMROCK helps you train with a plan. Based on your level and goal it assigns one of 7 strength and hypertrophy programs, logs the weight and reps of every set, suggests loads from your 1RM and times your rest. It includes a guided warm-up, BMI, calorie and 1RM calculators, and progress stats. It started in 2023 as a mobile app built with FlutterFlow and Firebase, and I rebuilt it as a web app and a Windows desktop app that works offline and keeps data on the device.',
      },
      highlights: {
        es: [
          '7 programas según nivel y objetivo',
          'Registro por serie con carga sugerida desde el 1RM',
          'Calculadoras de IMC, calorías y 1RM',
          'Progreso, racha e historial',
          'Funciona sin internet, también como .exe',
        ],
        en: [
          '7 programs by level and goal',
          'Per-set logging with load suggested from 1RM',
          'BMI, calorie and 1RM calculators',
          'Progress, streak and history',
          'Works offline, also as an .exe',
        ],
      },
      stack: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'React Router',
        'Zod',
        'FlutterFlow',
        'Firebase',
      ],
      // demoUrl: 'TODO', — aún no está publicada
      // repoUrl: 'TODO',
      image: gymrockShots.inicio,
      gallery: [
        gymrockShots.inicio,
        gymrockShots.entrenar,
        gymrockShots.programa,
        gymrockShots.herramientas,
        gymrockShots.progreso,
        gymrockShots.bienvenida,
        gymrockShots.movil,
      ],
      services: ['mobile', 'web'],
    },
    {
      id: 'maxtriage',
      title: 'MAXTRIAGE',
      year: 2024,
      type: { es: 'Web app y escritorio · Salud', en: 'Web & desktop app · Health' },
      summary: {
        es: 'Clasificación de triage en cinco niveles: el paciente elige su nivel y sigue su tiempo de espera, y el personal de salud atiende una cola ordenada por gravedad.',
        en: 'Five-level triage classification: patients pick their level and track their wait time, and healthcare staff work through a queue ordered by severity.',
      },
      description: {
        es: 'MAXTRIAGE sirve para organizar la atención según la urgencia. El paciente elige uno de los cinco niveles de triage, con su definición, ejemplos y tiempo de referencia; describe su estado y sigue la cuenta regresiva de su espera, y si no está conforme puede dejar un reporte. El personal de salud ve la cola ordenada por gravedad y por llegada, con las solicitudes fuera de tiempo resaltadas, y puede atender, finalizar y reclasificar el nivel. Nació en 2025 como app en FlutterFlow que enviaba la solicitud por correo, y la rehice como web app y app de escritorio para Windows, con panel para el personal y reglas de acceso por rol.',
        en: 'MAXTRIAGE organizes care by urgency. Patients pick one of five triage levels, each with its definition, examples and target time; they describe their condition and follow a countdown of their wait, and can file a report if they are not satisfied. Healthcare staff see the queue ordered by severity and arrival, with overdue requests highlighted, and can attend, finish and reclassify the level. It started in 2025 as a FlutterFlow app that sent requests by email, and I rebuilt it as a web app and a Windows desktop app, with a staff panel and role-based access rules.',
      },
      highlights: {
        es: [
          'Cinco niveles con ejemplos y tiempos de referencia',
          'Tiempo de espera en vivo para el paciente',
          'Cola priorizada y reclasificación para el personal',
          'Reglas de acceso por rol en Firestore',
          'Aviso para llamar al 123 en emergencias',
        ],
        en: [
          'Five levels with examples and target times',
          'Live wait time for the patient',
          'Prioritized queue and reclassification for staff',
          'Role-based access rules in Firestore',
          'Call-123 notice for emergencies',
        ],
      },
      stack: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'React Router',
        'Zod',
        'Firebase',
        'FlutterFlow',
      ],
      // demoUrl: 'TODO', — aún no está publicada
      // repoUrl: 'TODO',
      image: maxtriageShots.bienvenida,
      gallery: [
        maxtriageShots.bienvenida,
        maxtriageShots.selector,
        maxtriageShots.nivel,
        maxtriageShots.espera,
        maxtriageShots.panel,
        maxtriageShots.atendiendo,
        maxtriageShots.movil,
      ],
      services: ['mobile', 'web'],
    },
    {
      id: 'matemage',
      title: 'MATEMAGE',
      year: 2024,
      type: { es: 'Videojuego educativo', en: 'Educational game' },
      summary: {
        es: 'Juego web para que niñas y niños practiquen las cuatro operaciones lanzando hechizos contra un monstruo.',
        en: 'Web game where kids practice the four basic operations by casting spells at a monster.',
      },
      description: {
        es: 'MATEMAGE es un videojuego para que niñas y niños practiquen matemáticas jugando. Se elige la operación (sumas, restas, multiplicaciones o divisiones) y el nivel (Aprendiz, Hechicero o Archimago), y cada ronda trae diez operaciones con cuatro opciones. Si la respuesta es incorrecta, el juego muestra la correcta y explica cómo llegar a ella. Al final da estrellas según los aciertos, repasa los errores y permite practicar solo esos.',
        en: 'MATEMAGE is a game that lets kids practice math while playing. They pick an operation (addition, subtraction, multiplication or division) and a level (Apprentice, Sorcerer or Archmage), and each round brings ten problems with four choices. After a wrong answer, the game shows the right one and explains how to get there. At the end it awards stars based on correct answers, reviews the mistakes and lets kids practice just those.',
      },
      highlights: {
        es: [
          'Cuatro operaciones y tres niveles',
          'Pistas que explican cada error',
          'Repaso y práctica de los errores',
          'Sin restas negativas ni divisiones con decimales',
          'Se juega solo con el teclado',
        ],
        en: [
          'Four operations and three levels',
          'Hints that explain every mistake',
          'Review and practice of mistakes',
          'No negative subtractions or decimal divisions',
          'Fully playable with the keyboard',
        ],
      },
      stack: ['HTML', 'CSS', 'JavaScript'],
      services: ['web'],
      image: matemageShots.inicio,
      gallery: [
        matemageShots.inicio,
        matemageShots.acierto,
        matemageShots.error,
        matemageShots.final,
        matemageShots.movil,
      ],
    },
  ]),
};

/** Sitios de clientes. Descripciones tomadas del contenido de cada sitio publicado. */
export const clientSites = list<ClientSite>([
  {
    id: 'solcaribe',
    name: 'Transporte Sol Caribe',
    url: 'https://www.transportesolcaribe.com/',
    summary: {
      es: 'Sitio de una empresa de transporte escolar, empresarial y turístico con sede en Bucaramanga: servicios, cotización de viajes, empleo, noticias y canal de denuncias.',
      en: 'Website for a school, corporate and tourist transport company based in Bucaramanga: services, trip quotes, jobs, news and a reporting channel.',
    },
    role: frontAndBack,
    ...siteShots('solcaribe', 'Transporte Sol Caribe'),
    services: ['web'],
    stack: [],
  },
  {
    id: 'systemred',
    name: 'SYSTEMRED GPS',
    url: 'https://systemred.com.co/',
    summary: {
      es: 'Sitio de una empresa de rastreo satelital y gestión de flotas (GPS, videotelemática, control de combustible y cumplimiento PESV), con planes, solicitud de demo y acceso a la plataforma.',
      en: 'Website for a satellite tracking and fleet management company (GPS, video telematics, fuel control and road-safety compliance), with plans, demo requests and platform access.',
    },
    role: frontAndBack,
    ...siteShots('systemred', 'SYSTEMRED GPS'),
    services: ['web'],
    stack: ['WordPress'],
  },
  {
    id: 'solusystem',
    name: 'Solusystem',
    url: 'https://solusystem.co/',
    summary: {
      es: 'Sitio de una empresa de soluciones tecnológicas (soporte, desarrollo web, ciberseguridad, CCTV, cloud y licencias Microsoft), con asistente para elegir servicio, ofertas y tienda.',
      en: 'Website for a tech solutions company (support, web development, cybersecurity, CCTV, cloud and Microsoft licenses), with a service picker, offers and a store.',
    },
    role: frontAndBack,
    ...siteShots('solusystem', 'Solusystem'),
    services: ['web'],
    stack: [],
  },
  {
    id: 'cherryhot',
    name: 'Motel Cherry Hot',
    url: 'https://motelcherryhot.com/',
    summary: {
      es: 'Sitio de un motel con catálogo de suites y tarifas, planes románticos, tienda de productos y reservas.',
      en: 'Website for a motel with a catalog of suites and rates, romantic packages, a product store and bookings.',
    },
    role: frontAndBack,
    ...siteShots('cherryhot', 'Motel Cherry Hot'),
    services: ['web'],
    stack: ['WordPress'],
  },
  {
    id: 'serfu',
    name: 'SERFU HSEQ & Transporte',
    url: 'https://serfu.co/',
    summary: {
      es: 'Sitio de una empresa de seguridad y salud en el trabajo (HSEQ) y transporte en Girón: servicios, capacitaciones y consulta de certificados.',
      en: 'Website for an occupational health and safety (HSEQ) and transport company in Girón: services, training courses and certificate lookup.',
    },
    role: frontAndBack,
    ...siteShots('serfu', 'SERFU'),
    services: ['web'],
    stack: [],
  },
]);

/* ------------------------------------------------------------------ */
/* Experiencia y educación                                              */
/* ------------------------------------------------------------------ */
export type TimelineEntry = {
  period: Localized;
  title: Localized;
  org: string;
  description?: Localized;
};

export const journey = {
  kicker: { es: '05 · Trayectoria', en: '05 · Journey' },
  title: { es: 'Experiencia y educación', en: 'Experience & education' },
  experienceTitle: { es: 'Experiencia', en: 'Experience' },
  educationTitle: { es: 'Educación', en: 'Education' },
  coursesTitle: { es: 'Formación complementaria', en: 'Additional training' },
  languagesTitle: { es: 'Idiomas', en: 'Languages' },
  // Fechas y funciones según el CV 2027.
  experience: list<TimelineEntry>([
    {
      period: { es: 'Oct 2025 – Dic 2025', en: 'Oct 2025 – Dec 2025' },
      title: { es: 'Monitor', en: 'Monitor' },
      org: 'ANDES · Programa MinTIC / Talento Tech',
      description: {
        es: 'Acompañamiento a beneficiarios, mentores y ejecutores en el proceso de formación y en el uso de las plataformas tecnológicas; seguimiento al plan de estudios.',
        en: 'Supported learners, mentors and instructors through the training process and the use of its tech platforms; tracked the study plan.',
      },
    },
    {
      period: { es: '2025 – 2026', en: '2025 – 2026' },
      title: { es: 'Community Manager', en: 'Community Manager' },
      org: 'Solusystem',
      description: {
        es: 'Gestión de redes sociales para varios clientes, creación de contenido e informes de crecimiento.',
        en: 'Social media management for several clients, content creation and growth reports.',
      },
    },
    {
      period: { es: 'Feb 2025 – Sep 2025', en: 'Feb 2025 – Sep 2025' },
      title: {
        es: 'Auxiliar de Sistemas / Soporte Técnico',
        en: 'IT Assistant / Technical Support',
      },
      org: 'Organización Servicios y Asesorías S.A.S. · Compañía Pesquera del Mar',
      description: {
        es: 'Soporte TI, mantenimiento de equipos e impresoras, análisis de datos operativos e intranet corporativa en SharePoint.',
        en: 'IT support, computer and printer maintenance, operational data analysis and a corporate SharePoint intranet.',
      },
    },
    {
      period: { es: 'May 2024 – Oct 2024', en: 'May 2024 – Oct 2024' },
      title: { es: 'Community Manager', en: 'Community Manager' },
      org: 'Pomposa Zapatos',
      description: {
        es: 'Redes sociales, SEO, producción y edición de contenido audiovisual, y análisis de métricas de audiencia.',
        en: 'Social media, SEO, audiovisual content production and editing, and audience metrics analysis.',
      },
    },
    {
      period: { es: 'Ene 2023 – Nov 2025', en: 'Jan 2023 – Nov 2025' },
      title: { es: 'Desarrollador de Apps Freelance', en: 'Freelance App Developer' },
      org: 'Independiente',
      description: {
        es: 'Apps móviles con Flutter y Dart, interfaces UI/UX y aplicaciones educativas e interactivas.',
        en: 'Mobile apps with Flutter and Dart, UI/UX interfaces and educational, interactive apps.',
      },
    },
    {
      period: { es: 'May 2023 – Nov 2024', en: 'May 2023 – Nov 2024' },
      title: { es: 'Desarrollador de Software Freelance', en: 'Freelance Software Developer' },
      org: 'Independiente',
      description: {
        es: 'Interfaces frontend, desarrollo full-stack, bases de datos y optimización de rendimiento.',
        en: 'Frontend interfaces, full-stack development, databases and performance optimization.',
      },
    },
    {
      period: { es: '2023 – 2026', en: '2023 – 2026' },
      title: { es: 'Desarrollador Web', en: 'Web Developer' },
      org: 'Solusystem',
      description: {
        es: 'Sitios web a medida, interfaces frontend y optimización de código en equipos multidisciplinarios.',
        en: 'Custom websites, frontend interfaces and code optimization in multidisciplinary teams.',
      },
    },
    {
      period: { es: 'Sep 2022 – Abr 2026', en: 'Sep 2022 – Apr 2026' },
      title: {
        es: 'Auxiliar de Sistemas / Soporte Técnico',
        en: 'IT Assistant / Technical Support',
      },
      org: 'Solusystem',
      description: {
        es: 'Soporte presencial y remoto, mantenimiento preventivo de equipos y solución de incidencias.',
        en: 'On-site and remote support, preventive maintenance and incident resolution.',
      },
    },
  ]),
  education: list<TimelineEntry>([
    {
      period: { es: 'Feb 2026 – presente', en: 'Feb 2026 – present' },
      title: { es: 'Ingeniería de Software', en: 'Software Engineering' },
      org: 'Universidad Tecnológica del Oriente (UTO)',
      description: { es: 'Séptimo semestre en curso.', en: 'Currently in 7th semester.' },
    },
    {
      period: { es: '2023 – 2025', en: '2023 – 2025' },
      title: {
        es: 'Tecnología en Análisis y Desarrollo de Software',
        en: 'Technologist in Software Analysis and Development',
      },
      org: 'CIMI · SENA',
    },
    {
      period: { es: '2021 – 2022', en: '2021 – 2022' },
      title: { es: 'Técnico en Sistemas', en: 'Systems Technician' },
      org: 'SENA',
    },
    {
      period: { es: '2021 – 2022', en: '2021 – 2022' },
      title: { es: 'Técnico en Criminalística', en: 'Criminalistics Technician' },
      org: 'FUNDAMIR',
    },
    {
      period: { es: '2014 – 2022', en: '2014 – 2022' },
      title: { es: 'Bachiller Académico', en: 'High school diploma' },
      org: 'Colegio Militar General Santander',
    },
  ]),
  courses: list<Localized>([
    COURSES.eda,
    COURSES.networking,
    COURSES.cloud,
    COURSES.ml,
    COURSES.english,
  ]),
  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
    { name: { es: 'Inglés', en: 'English' }, level: { es: 'B1 certificado', en: 'B1 certified' } },
    { name: { es: 'Ruso', en: 'Russian' }, level: { es: 'Básico', en: 'Basic' } },
  ],
};

/* ------------------------------------------------------------------ */
/* Áreas del inicio: software, community manager y otros conocimientos  */
/* ------------------------------------------------------------------ */
export type SocialAccount = {
  name: string;
  handle: string;
  /** Imágenes en public/assets/social: `${handle}-avatar` y `${handle}-1..n`. 0 = sin imágenes. */
  shots: number;
  /** Cifras del perfil público el día de `community.measuredAt`. */
  followers?: number;
  posts?: number;
};

export const areas = {
  kicker: { es: 'Lo que hago', en: 'What I do' },
  title: { es: 'Tres áreas de trabajo', en: 'Three areas of work' },
  items: [
    {
      id: 'projects',
      title: { es: 'Desarrollo de software', en: 'Software development' },
      description: {
        es: 'Apps móviles, sitios web y software a medida: proyectos propios y sitios en producción para clientes.',
        en: 'Mobile apps, websites and custom software: my own projects and live client websites.',
      },
    },
    {
      id: 'community',
      title: { es: 'Community manager', en: 'Community manager' },
      description: {
        es: 'Gestión de redes sociales para marcas de transporte, salud, calzado y tecnología.',
        en: 'Social media management for transport, healthcare, footwear and tech brands.',
      },
    },
    {
      id: 'other',
      title: { es: 'Otros conocimientos', en: 'Other skills' },
      description: {
        es: 'Análisis de datos, diseño UI/UX, soporte TI, nube y redes.',
        en: 'Data analysis, UI/UX design, IT support, cloud and networking.',
      },
    },
  ] as const,
  go: { es: 'Ir a la sección', en: 'Go to section' },
};

/** Cuentas que he gestionado como community manager. Imágenes y cifras tomadas del perfil público. */
export const community = {
  kicker: { es: 'Área 02 · Community manager', en: 'Area 02 · Community manager' },
  title: { es: 'Redes que he gestionado', en: 'Social media I’ve managed' },
  intro: {
    es: 'Marcas para las que he trabajado como community manager, con algunas de sus publicaciones y las cifras de cada perfil.',
    en: 'Brands I’ve worked with as a community manager, with some of their posts and each profile’s numbers.',
  },
  measuredAt: {
    es: 'Cifras de Instagram a noviembre de 2026.',
    en: 'Instagram figures as of November 2026.',
  },
  // TODO: periodo con cada marca (la línea de tiempo tiene Pomposa Zapatos y Community Manager en Solusystem).
  accounts: list<SocialAccount>([
    {
      name: 'Transporte Sol Caribe',
      handle: 'solcaribe.sas24',
      shots: 3,
      followers: 548,
      posts: 184,
    },
    {
      name: 'Cooperativa Prosacoop',
      handle: 'cooperativaprosacoop',
      shots: 3,
      followers: 387,
      posts: 229,
    },
    // El perfil no está disponible públicamente en Instagram: va sin imágenes ni cifras.
    { name: 'SYSTEMRED GPS', handle: 'systemredgps', shots: 0 },
    { name: 'Pomposa Zapatos', handle: 'pomposazapatos', shots: 3, followers: 1784, posts: 65 },
    { name: 'Neurotrauma Center', handle: 'neurotrauma.co', shots: 3, followers: 3483, posts: 787 },
    { name: 'Solusystem', handle: 'solusystem', shots: 3, followers: 127, posts: 54 },
  ]),
  labels: {
    brands: { es: 'marcas gestionadas', en: 'brands managed' },
    followers: { es: 'seguidores', en: 'followers' },
    followersTotal: { es: 'seguidores sumando todas', en: 'followers across all' },
    posts: { es: 'publicaciones', en: 'posts' },
    postsTotal: { es: 'publicaciones en sus perfiles', en: 'posts on their profiles' },
    post: { es: 'Publicación de', en: 'Post by' },
    open: { es: 'Ver en Instagram', en: 'View on Instagram' },
    private: { es: 'Perfil no disponible públicamente', en: 'Profile not publicly available' },
  },
};

/** Lo que sé fuera del desarrollo y las redes (sale de servicios, cursos e idiomas). */
export const otherSkills = {
  kicker: { es: 'Área 03 · Otros conocimientos', en: 'Area 03 · Other skills' },
  title: { es: 'Más allá del código', en: 'Beyond code' },
  intro: {
    es: 'Datos, diseño, soporte e infraestructura: lo que complementa mi trabajo de desarrollo.',
    en: 'Data, design, support and infrastructure: what rounds out my development work.',
  },
  services: ['data', 'design', 'support'] as ServiceIcon[],
  stackLink: { es: 'Ver todas las herramientas', en: 'See all tools' },
};

/* ------------------------------------------------------------------ */
/* Contacto                                                             */
/* ------------------------------------------------------------------ */
export const contact = {
  kicker: { es: '06 · Contacto', en: '06 · Contact' },
  title: { es: '¿Tienes un proyecto en mente?', en: 'Got a project in mind?' },
  intro: {
    es: 'Cuéntame qué necesitas y te respondo con una propuesta clara. Si prefieres algo más directo, escríbeme por WhatsApp.',
    en: 'Tell me what you need and I’ll get back to you with a clear proposal. If you prefer something quicker, message me on WhatsApp.',
  },
  form: {
    name: { es: 'Nombre', en: 'Name' },
    email: { es: 'Correo', en: 'Email' },
    message: { es: 'Mensaje', en: 'Message' },
    namePh: { es: 'Tu nombre', en: 'Your name' },
    emailPh: { es: 'tu@correo.com', en: 'you@email.com' },
    messagePh: {
      es: 'Cuéntame sobre tu proyecto, plazos y presupuesto aproximado.',
      en: 'Tell me about your project, timeline and approximate budget.',
    },
    send: { es: 'Enviar mensaje', en: 'Send message' },
    sending: { es: 'Enviando…', en: 'Sending…' },
    successTitle: { es: '¡Mensaje enviado!', en: 'Message sent!' },
    successBody: {
      es: 'Gracias por escribir. El oso ya lo tiene entre sus patas: te responderé lo antes posible.',
      en: 'Thanks for reaching out. The bear has it in its paws: I’ll get back to you soon.',
    },
    errorTitle: { es: 'No se pudo enviar', en: 'Couldn’t send it' },
    errorBody: {
      es: 'Algo falló. Inténtalo de nuevo o escríbeme directamente por correo o WhatsApp.',
      en: 'Something went wrong. Try again or reach me directly by email or WhatsApp.',
    },
    fallbackBody: {
      es: 'Abrí tu cliente de correo con el mensaje listo para enviar.',
      en: 'I opened your email client with the message ready to send.',
    },
    again: { es: 'Enviar otro mensaje', en: 'Send another message' },
    errors: {
      nameRequired: { es: 'Escribe tu nombre.', en: 'Please enter your name.' },
      emailRequired: { es: 'Escribe tu correo.', en: 'Please enter your email.' },
      emailInvalid: { es: 'Ese correo no parece válido.', en: 'That email doesn’t look valid.' },
      messageShort: {
        es: 'Cuéntame un poco más (mínimo 10 caracteres).',
        en: 'Tell me a bit more (at least 10 characters).',
      },
    },
    honeypot: { es: 'No llenes este campo', en: 'Leave this field empty' },
  },
  direct: {
    title: { es: 'O escríbeme directo', en: 'Or reach me directly' },
    whatsapp: { es: 'WhatsApp', en: 'WhatsApp' },
    email: { es: 'Correo', en: 'Email' },
    github: { es: 'GitHub', en: 'GitHub' },
    linkedin: { es: 'LinkedIn', en: 'LinkedIn' },
  },
  emailSubject: { es: 'Contacto desde tu portafolio', en: 'Contact from your portfolio' },
};

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
export const footer = {
  tagline: {
    es: 'Desarrollo de software desde Santander, Colombia.',
    en: 'Software development from Santander, Colombia.',
  },
  backToTop: { es: 'Volver arriba', en: 'Back to top' },
};

/* ------------------------------------------------------------------ */
/* Páginas: textos de navegación, SEO por ruta y páginas de detalle     */
/* ------------------------------------------------------------------ */
type PageId = 'about' | 'services' | 'stack' | 'projects' | 'experience' | 'contact';

const brand = profile.shortName;
const pageTitle = (es: string, en: string): Localized => ({
  es: `${es} · ${brand}`,
  en: `${en} · ${brand}`,
});

/** Título y descripción de cada página (pestaña del navegador, buscadores y redes). */
export const pageSeo: Record<
  PageId | 'home' | 'notFound',
  { title: Localized; description: Localized }
> = {
  home: seo,
  about: {
    title: pageTitle('Sobre mí', 'About'),
    description: {
      es: 'Tecnólogo en Análisis y Desarrollo de Software del SENA y estudiante de Ingeniería de Software. Desde 2022 trabajo en soporte, desarrollo frontend y apps móviles.',
      en: 'Software Analysis and Development technologist (SENA) and Software Engineering student. Since 2022 I’ve worked in IT support, frontend development and mobile apps.',
    },
  },
  services: { title: pageTitle('Servicios', 'Services'), description: services.intro },
  stack: { title: pageTitle('Stack', 'Stack'), description: stack.intro },
  projects: {
    title: pageTitle('Proyectos', 'Projects'),
    description: {
      es: `Proyectos destacados (${projects.items.map((p) => p.title).join(', ')}) y sitios web para clientes como ${clientSites.map((s) => s.name).join(', ')}.`,
      en: `Featured projects (${projects.items.map((p) => p.title).join(', ')}) and client websites such as ${clientSites.map((s) => s.name).join(', ')}.`,
    },
  },
  experience: {
    title: pageTitle('Trayectoria', 'Journey'),
    description: {
      es: 'Experiencia laboral, educación, cursos e idiomas de Zannián MC.',
      en: 'Work experience, education, courses and languages of Zannián MC.',
    },
  },
  contact: { title: pageTitle('Contacto', 'Contact'), description: contact.intro },
  notFound: {
    title: pageTitle('Página no encontrada', 'Page not found'),
    description: seo.description,
  },
};

export const pageNav = {
  next: { es: 'Siguiente', en: 'Next' },
  notFound: {
    title: { es: 'Esta página no existe', en: 'This page doesn’t exist' },
    body: {
      es: 'El oso la buscó por todo el bosque y no la encontró. Puede que el enlace esté mal escrito o que la página se haya movido.',
      en: 'The bear searched the whole forest and couldn’t find it. The link may be mistyped or the page may have moved.',
    },
    cta: { es: 'Volver al inicio', en: 'Back to home' },
  },
};

/** Etiquetas de las páginas de detalle (todo el contenido sale de las secciones de arriba). */
export const detail = {
  more: { es: 'Ver más', en: 'See more' },
  tools: { es: 'Herramientas', en: 'Tools' },
  relatedProjects: { es: 'Proyectos relacionados', en: 'Related projects' },
  quote: { es: 'Cotizar por WhatsApp', en: 'Get a quote on WhatsApp' },
  quoteText: {
    es: 'Hola Zannián, vi tu portafolio y me interesa el servicio de',
    en: 'Hi Zannián, I saw your portfolio and I’m interested in your service:',
  },
  usedIn: { es: 'Lo uso en', en: 'Used in' },
  relatedService: { es: 'Servicio', en: 'Service' },
  learnedIn: { es: 'Formación', en: 'Training' },
  education: { es: 'Formación', en: 'Education' },
  mainTools: { es: 'Herramientas principales', en: 'Main tools' },
  whereIAm: { es: 'Dónde estoy', en: 'Where I am' },
  seeJourney: { es: 'Ver trayectoria completa', en: 'See full journey' },
  seeStack: { es: 'Ver todo el stack', en: 'See full stack' },
  inNumbers: { es: 'En números', en: 'By the numbers' },
  numbers: {
    years: { es: 'años de experiencia', en: 'years of experience' },
    roles: { es: 'cargos y proyectos laborales', en: 'roles and jobs' },
    education: { es: 'títulos y estudios', en: 'degrees and studies' },
    courses: { es: 'cursos complementarios', en: 'additional courses' },
    languages: { es: 'idiomas', en: 'languages' },
  },
  ctaGoContact: { es: 'Ir al formulario', en: 'Go to the form' },
  byService: { es: '¿Ya sabes qué necesitas?', en: 'Already know what you need?' },
  byServiceIntro: {
    es: 'Elige un servicio y se abre WhatsApp con el mensaje listo.',
    en: 'Pick a service and WhatsApp opens with the message ready.',
  },
};
