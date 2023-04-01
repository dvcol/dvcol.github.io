import { fileURLToPath, URL } from 'url';

import suidPlugin from '@suid/vite-plugin';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin()],
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
