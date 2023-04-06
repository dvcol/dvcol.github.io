import { fileURLToPath, URL } from 'url';

import { viteI18nPlugin } from '@dvcol/vite-plugin-i18n';
import suidPlugin from '@suid/vite-plugin';
import devtoolsPlugin from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';

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
            src: 'assets/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'assets/pwa-icon-512.png',
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
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: {
        shell: 'index.html',
        worker: 'src/sw/worker.ts',
        synology: 'src/apps/synology-extension/entry.ts',
      },
      output: {
        assetFileNames: 'assets/[name].[extname]',
        chunkFileNames: 'chunks/[name].chunk.[hash].js',
        entryFileNames: entry => `entry/[name].entry${entry.name !== 'worker' ? '.[hash]' : ''}.js`,
      },
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
