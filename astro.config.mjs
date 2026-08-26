import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Keep static output until a real use case requires on-demand rendering.
  // Then add the deployment adapter and opt out per route with `prerender = false`.
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
