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
  integrations: [
    react(),
    sitemap({
      customPages: [
        'https://task-goblin.com/',
        'https://task-goblin.com/task-goblin-app',
        'https://task-goblin.com/floaty-app',
        'https://task-goblin.com/nexo-app',
        'https://task-goblin.com/apps',
        'https://task-goblin.com/license',
      ],
      serialize(item) {
        // Boost homepage priority for task notch / notch searches
        if (item.url === 'https://task-goblin.com/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        if (
          item.url === 'https://task-goblin.com/task-goblin-app' ||
          item.url === 'https://task-goblin.com/floaty-app'
        ) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        return { ...item, priority: 0.7, changefreq: 'monthly' };
      },
    }),
  ],
  output: 'server',
  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()]
  }
});