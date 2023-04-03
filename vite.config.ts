import { fileURLToPath, URL } from 'url';

import suidPlugin from '@suid/vite-plugin';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    suidPlugin(),
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.svg', 'pwa/icon.png'],
      manifest: {
        name: 'Dinh-Van Colomban',
        short_name: 'Dinh-Van',
        description: "Web app for Dinh-Van's projects",
        theme_color: '#282c34',
        icons: [
          {
            src: 'src/assets/pwa/icon/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'src/assets/pwa/icon/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'src/assets/pwa/icon/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: !!process.env.SERVICE_WOKER,
      },
      workbox: {
        sourcemap: !!process.env.SERVICE_WOKER,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        shell: 'index.html',
        'apps/synology-extension': 'apps/synology-extension/entry.ts',
      },
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
