import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // NOTE: Change to 'hybrid' when adding the AI agent API routes
  // The src/pages/api/ directory is already reserved for that purpose.
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
