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
  shortName: 'Zannián',
  initials: 'ZM',
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
    base: '/assets/generated/foto',
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
  themeToLight: { es: 'Cambiar a tema claro', en: 'Switch to light theme' },
  themeToDark: { es: 'Cambiar a tema oscuro', en: 'Switch to dark theme' },
  langSwitch: { es: 'Switch to English', en: 'Cambiar a español' },
  home: { es: 'Inicio', en: 'Home' },
} satisfies Record<string, Localized | Record<string, Localized>>;

/* ------------------------------------------------------------------ */
/* SEO                                                                  */
/* ------------------------------------------------------------------ */
export const seo = {
  title: {
    es: 'Zannián Mantilla Celis · Desarrollador de software freelance',
    en: 'Zannián Mantilla Celis · Freelance software developer',
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
    es: ['Desarrollo apps móviles', 'Creo sitios web modernos', 'Convierto datos en decisiones'],
    en: ['I build mobile apps', 'I craft modern websites', 'I turn data into decisions'],
  },
  intro: {
    es: 'Soy Zannián Mantilla Celis, desarrollador de software en Colombia. Trabajo en mobile, frontend y análisis de datos, y cuido cada proyecto desde la idea hasta la entrega.',
    en: 'I’m Zannián Mantilla Celis, a software developer based in Colombia. I work across mobile, frontend and data analysis, and I look after every project from idea to delivery.',
  },
  ctaPrimary: { es: 'Hablemos', en: 'Let’s talk' },
  ctaSecondary: { es: 'Ver proyectos', en: 'See projects' },
  whatsappText: {
    es: 'Hola Zannián, vi tu portafolio y me gustaría hablar sobre un proyecto.',
    en: 'Hi Zannián, I saw your portfolio and I’d like to talk about a project.',
  },
  scroll: { es: 'Desliza', en: 'Scroll' },
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
      'Soy Tecnólogo en Análisis y Desarrollo de Software del SENA y estudio Ingeniería de Software en la UTO. Desde 2022 trabajo en soporte, desarrollo frontend y apps móviles, tanto en proyectos independientes como en equipos multidisciplinarios y entornos organizacionales.',
      'Construyo apps con Flutter, FlutterFlow y Firebase, sitios con HTML, CSS, JavaScript y WordPress, y analizo datos con Python. También diseño interfaces en Figma y produzco piezas visuales con Photoshop, Illustrator y CapCut.',
      'Me considero adaptable, creativo y analítico: primero entiendo el problema y después elijo la herramienta.',
    ],
    en: [
      'I hold a Software Analysis and Development technologist degree from SENA and I’m studying Software Engineering at UTO. Since 2022 I’ve worked in IT support, frontend development and mobile apps, both on independent projects and in multidisciplinary teams and organizations.',
      'I build apps with Flutter, FlutterFlow and Firebase, websites with HTML, CSS, JavaScript and WordPress, and I analyze data with Python. I also design interfaces in Figma and produce visual content with Photoshop, Illustrator and CapCut.',
      'I’m adaptable, creative and analytical: I understand the problem first, then pick the tool.',
    ],
  },
  photoAlt: {
    es: 'Retrato de Zannián Mantilla Celis',
    en: 'Portrait of Zannián Mantilla Celis',
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
    { value: 3, suffix: '', label: { es: 'proyectos destacados', en: 'featured projects' } },
    { value: 6, suffix: '', label: { es: 'servicios freelance', en: 'freelance services' } },
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
      tags: ['Flutter', 'FlutterFlow', 'Firebase'],
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
        es: 'Soporte técnico, mantenimiento y soluciones tecnológicas, incluidas intranets en SharePoint.',
        en: 'Technical support, maintenance and tech solutions, including SharePoint intranets.',
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
      tags: ['SEO', 'CapCut', 'Social media'],
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Stack tecnológico                                                    */
/* ------------------------------------------------------------------ */
export type StackItem = { name: string | Localized; brand?: BrandName; mono?: string };

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
        { name: { es: 'Análisis exploratorio', en: 'Exploratory analysis' }, mono: 'EDA' },
        { name: { es: 'Machine Learning (básico)', en: 'Machine Learning (basic)' }, mono: 'ML' },
        { name: { es: 'Cómputo en la nube (básico)', en: 'Cloud computing (basic)' }, mono: 'CL' },
        { name: { es: 'Networking (básico)', en: 'Networking (basic)' }, mono: 'NW' },
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
export type MockupKind = 'triage' | 'math' | 'fitness';

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
  /** Captura real (ruta en /public). Si no hay, se muestra un mockup ilustrativo. */
  image?: { src: string; width: number; height: number };
  mockup: MockupKind;
};

export const projects = {
  kicker: { es: '04 · Proyectos', en: '04 · Projects' },
  title: { es: 'Proyectos destacados', en: 'Featured projects' },
  intro: {
    es: 'Una selección de lo que he construido: salud, educación y fitness.',
    en: 'A selection of what I’ve built: health, education and fitness.',
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
    illustrative: { es: 'Vista ilustrativa', en: 'Illustrative preview' },
    talk: { es: '¿Quieres algo así? Hablemos', en: 'Want something like this? Let’s talk' },
  },
  items: list<Project>([
    {
      id: 'maxtriage',
      title: 'MAXTRIAGE',
      year: 2025,
      type: { es: 'App móvil · Salud', en: 'Mobile app · Health' },
      summary: {
        es: 'Sistema móvil de triaje con integración a Gmail y gestión eficiente de datos clínicos.',
        en: 'Mobile triage system with Gmail integration and efficient clinical data management.',
      },
      description: {
        es: 'MAXTRIAGE es un sistema móvil de triaje enfocado en gestionar datos clínicos de forma eficiente. Se integra con Gmail para la comunicación de la información.',
        en: 'MAXTRIAGE is a mobile triage system focused on managing clinical data efficiently. It integrates with Gmail to communicate information.',
      },
      highlights: {
        es: ['Integración con Gmail', 'Gestión eficiente de datos clínicos', 'Experiencia móvil'],
        en: ['Gmail integration', 'Efficient clinical data management', 'Mobile experience'],
      },
      stack: ['Gmail'], // TODO: agrega las tecnologías usadas (p. ej. Flutter, Firebase…)
      // role: { es: 'TODO', en: 'TODO' },
      // demoUrl: 'TODO',
      // repoUrl: 'TODO',
      mockup: 'triage',
    },
    {
      id: 'mategame',
      title: 'MATEGAME',
      year: 2024,
      type: { es: 'Videojuego educativo', en: 'Educational game' },
      summary: {
        es: 'Videojuego matemático educativo para niños, con interfaz amigable y enfoque pedagógico.',
        en: 'Educational math game for kids, with a friendly interface and a pedagogical approach.',
      },
      description: {
        es: 'MATEGAME es un videojuego para que niñas y niños practiquen matemáticas jugando. La interfaz se diseñó para ser amigable y el contenido sigue un enfoque pedagógico.',
        en: 'MATEGAME is a game that lets kids practice math while playing. The interface was designed to be friendly and the content follows a pedagogical approach.',
      },
      highlights: {
        es: ['Enfoque pedagógico', 'Interfaz amigable para niños', 'Aprender jugando'],
        en: ['Pedagogical approach', 'Kid-friendly interface', 'Learning through play'],
      },
      stack: [], // TODO: agrega las tecnologías usadas
      mockup: 'math',
    },
    {
      id: 'gymrock',
      title: 'GYMROCK',
      year: 2023,
      type: { es: 'App fitness', en: 'Fitness app' },
      summary: {
        es: 'App fitness con FlutterFlow y Firebase: calculadoras funcionales y gestión de usuarios.',
        en: 'Fitness app built with FlutterFlow and Firebase: working calculators and user management.',
      },
      description: {
        es: 'GYMROCK es una app fitness construida con FlutterFlow y Firebase. Incluye calculadoras funcionales y gestión de usuarios.',
        en: 'GYMROCK is a fitness app built with FlutterFlow and Firebase. It includes working calculators and user management.',
      },
      highlights: {
        es: ['Calculadoras funcionales', 'Gestión de usuarios', 'Backend en Firebase'],
        en: ['Working calculators', 'User management', 'Firebase backend'],
      },
      stack: ['FlutterFlow', 'Firebase'],
      mockup: 'fitness',
    },
  ]),
};

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
  experience: list<TimelineEntry>([
    {
      period: { es: 'Oct 2025 – Dic 2025', en: 'Oct 2025 – Dec 2025' },
      title: { es: 'Monitor', en: 'Monitor' },
      org: 'ANDES · Programa MinTIC / Talento Tech',
      // TODO: describe tus funciones como monitor.
    },
    {
      period: { es: 'Ago 2025 – Sep 2025', en: 'Aug 2025 – Sep 2025' },
      title: { es: 'Auxiliar de Sistemas', en: 'IT Assistant' },
      org: 'Organización Servicios y Asesorías S.A.S. · Compañía Pesquera del Mar',
      description: {
        es: 'Soporte TI, análisis de datos operativos e intranet corporativa en SharePoint.',
        en: 'IT support, operational data analysis and a corporate SharePoint intranet.',
      },
    },
    {
      period: { es: '2024', en: '2024' },
      title: { es: 'Community Manager', en: 'Community Manager' },
      org: 'Pomposa Zapatos',
      description: {
        es: 'Gestión de redes, SEO, contenido audiovisual y seguimiento de métricas.',
        en: 'Social media management, SEO, audiovisual content and metrics tracking.',
      },
    },
    {
      period: { es: '2023 – 2024', en: '2023 – 2024' },
      title: { es: 'Desarrollador de Software Freelancer', en: 'Freelance Software Developer' },
      org: 'Independiente',
      description: {
        es: 'Apps en Flutter, soluciones web y software a medida para clientes.',
        en: 'Flutter apps, web solutions and custom software for clients.',
      },
    },
    {
      period: { es: '2023 – 2024', en: '2023 – 2024' },
      title: { es: 'Desarrollador Frontend', en: 'Frontend Developer' },
      org: 'Solusystem',
      description: {
        es: 'Sitios web a medida, optimización de código y rendimiento.',
        en: 'Custom websites, code optimization and performance.',
      },
    },
    {
      period: { es: '2022 – 2024', en: '2022 – 2024' },
      title: { es: 'Soporte Técnico', en: 'Technical Support' },
      org: 'Solusystem',
      // TODO: describe tus funciones de soporte técnico.
    },
  ]),
  education: list<TimelineEntry>([
    {
      period: { es: '2026 – presente', en: '2026 – present' },
      title: { es: 'Ingeniería de Software', en: 'Software Engineering' },
      org: 'UTO',
      description: { es: 'En curso.', en: 'In progress.' },
    },
    {
      period: { es: '2023 – 2025', en: '2023 – 2025' },
      title: {
        es: 'Tecnología en Análisis y Desarrollo de Software',
        en: 'Technologist in Software Analysis and Development',
      },
      org: 'SENA',
    },
    {
      period: { es: '2022', en: '2022' },
      title: { es: 'Técnico en Sistemas', en: 'Systems Technician' },
      org: 'SENA',
    },
    {
      period: { es: 'Bachillerato', en: 'High school' },
      title: { es: 'Bachiller', en: 'High school diploma' },
      org: 'Colegio Militar General Santander',
    },
  ]),
  courses: list<Localized>([
    { es: 'Análisis exploratorio de datos en Python', en: 'Exploratory data analysis in Python' },
    { es: 'Networking básico', en: 'Networking basics' },
    { es: 'Cómputo en la nube', en: 'Cloud computing' },
    { es: 'Machine Learning básico', en: 'Machine Learning basics' },
    { es: 'English Does Work L2', en: 'English Does Work L2' },
  ]),
  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
    { name: { es: 'Inglés', en: 'English' }, level: { es: 'B1', en: 'B1' } },
    { name: { es: 'Ruso', en: 'Russian' }, level: { es: 'Básico', en: 'Basic' } },
  ],
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
      es: 'Gracias por escribir. Te responderé lo antes posible.',
      en: 'Thanks for reaching out. I’ll get back to you soon.',
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
