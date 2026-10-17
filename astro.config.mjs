// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.ericruelas.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/notes'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});