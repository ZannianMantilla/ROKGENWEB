import { renderToString } from 'react-dom/server';
import { App } from './App';

/** Usado por scripts/prerender.mjs para generar el HTML estático en el build. */
export function render() {
  return renderToString(<App />);
}
