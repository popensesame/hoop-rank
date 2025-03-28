import { defineConfig } from 'vite';

export default defineConfig({
  base: '/hoop-rank/', // Replace <repository-name> with your GitHub repository name
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
