/**
 * Cruces entre servicios, herramientas y proyectos para las páginas de detalle.
 * No agrega datos: solo relaciona lo que ya está en content.ts.
 */
import {
  ChartColumn,
  Globe,
  Headset,
  Megaphone,
  PenTool,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import {
  clientSites,
  projects,
  services,
  stack,
  type Lang,
  type ServiceIcon,
  type StackItem,
} from '../data/content';

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  mobile: Smartphone,
  web: Globe,
  design: PenTool,
  data: ChartColumn,
  support: Headset,
  content: Megaphone,
};

export const toolName = (item: StackItem, lang: Lang) =>
  typeof item.name === 'string' ? item.name : item.name[lang];

const names = (item: StackItem) =>
  typeof item.name === 'string' ? [item.name] : [item.name.es, item.name.en];

/** Busca una herramienta del stack por su nombre en cualquier idioma. */
export const findTool = (name: string) =>
  stack.groups.flatMap((g) => g.items).find((it) => names(it).includes(name));

export const projectsForService = (icon: ServiceIcon) =>
  projects.items.filter((p) => p.services?.includes(icon));

export const servicesForTool = (item: StackItem) =>
  services.items.filter((s) => s.tags.some((tag) => names(item).includes(tag)));

export const projectsForTool = (item: StackItem) =>
  projects.items.filter((p) => p.stack.some((tech) => names(item).includes(tech)));

export const sitesForService = (icon: ServiceIcon) =>
  clientSites.filter((s) => s.services.includes(icon));

export const sitesForTool = (item: StackItem) =>
  clientSites.filter((s) => s.stack.some((tech) => names(item).includes(tech)));

/** Ancla de cada servicio dentro de /servicios. */
export const serviceAnchor = (icon: ServiceIcon) => `servicio-${icon}`;
