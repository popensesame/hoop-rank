import { defineConfig } from 'vite';

export default defineConfig({
  base: '/hoop-rank/', // Ensure this matches your GitHub Pages deployment path
  server: {
    proxy: {
      '/api': {
        target: 'https://v1.basketball.api-sports.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix
      },
    },
  },
  envPrefix: 'VITE_', // Ensure Vite uses variables prefixed with VITE_
});
