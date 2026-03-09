// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
const SITE = 'https://task-goblin.com';

export default defineConfig({
  site: SITE,
  integrations: [react(), sitemap()],
  output: 'server',
  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()]
  }
});