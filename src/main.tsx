import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML viene prerenderizado (scripts/prerender.mjs) → hidratamos.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);

// El preloader es CSS puro; lo quitamos del DOM cuando termina.
const preloader = document.getElementById('preloader');
if (preloader) {
  preloader.addEventListener('animationend', (e) => {
    if (e.target === preloader) preloader.remove();
  });
  setTimeout(() => preloader.remove(), 2500);
}
