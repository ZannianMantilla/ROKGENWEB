import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Subcarpeta de publicación: '/' por defecto; GitHub Pages usa '/rokgen/' (ver .github/workflows).
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
});
