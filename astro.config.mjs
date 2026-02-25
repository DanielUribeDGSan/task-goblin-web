// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const SITE = 'https://task-goblin.netlify.app';

export default defineConfig({
  site: SITE,
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});