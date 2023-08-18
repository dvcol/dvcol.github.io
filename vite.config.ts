import { fileURLToPath, URL } from 'url';

import { viteI18nPlugin } from '@dvcol/vite-plugin-i18n';
import suidPlugin from '@suid/vite-plugin';
import devtoolsPlugin from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';
import solidSVGPlugin from 'vite-plugin-solid-svg';

export default defineConfig({
  plugins: [
    viteI18nPlugin({
      path: 'src/i18n',
      out: true,
    }),
    devtoolsPlugin({
      autoname: true,
      locator: {
        targetIDE: 'webstorm',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    suidPlugin(),
    solidPlugin(),
    solidSVGPlugin({
      defaultAsComponent: true,
    }),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['**/favicon.ico', '**/icon.svg', '**/icon*.png'],
      manifest: {
        name: 'Dinh-Van Colomban',
        short_name: 'Dinh-Van',
        description: "Web app for Dinh-Van's projects",
        theme_color: '#2a2b30',
        background_color: '#1d1e21',
        display: 'standalone',
        icons: [
          {
            src: 'assets/png/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/png/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'assets/png/512.png',
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
        importScripts: [process.env.SERVICE_WOKER ? 'src/sw/worker.ts' : 'entry/worker.entry.js'],
        globIgnores: ['entry/worker.entry.js'],
        navigateFallbackDenylist: [/[^#]*\/about-me\/.*/, /[^#]*\/synology-download\/.*/],
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3002,
    host: true,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: {
        shell: 'index.html',
        worker: 'src/sw/worker.ts',
        lottie: 'src/apps/lottie/entry.ts',
        'about-me': 'src/apps/about-me/entry.ts',
        synology: 'src/apps/synology-extension/entry.ts',
      },
      output: {
        manualChunks: {},
        chunkFileNames: 'chunks/[name].chunk.[hash].js',
        entryFileNames: entry => `entry/[name].entry${entry.name !== 'worker' ? '.[hash]' : ''}.js`,
        assetFileNames: asset => {
          const format = '[name][extname]';
          if (asset.name?.endsWith('.png')) return `assets/png/${format}`;
          if (asset.name?.endsWith('.gif')) return `assets/gif/${format}`;
          if (asset.name?.endsWith('.lottie')) return `assets/lottie/${format}`;
          if (asset.name?.endsWith('css')) return `styles/${format}`;
          return `assets/[name][extname]`;
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
