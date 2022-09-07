import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'test',
      formats: ['iife', 'es', 'umd'],
    },
    rollupOptions: {
      external: ['tslib', /@c3\/*/, 'lodash', /node:*/, 'playwright', '@playwright/test'],
      plugins: [commonjs()],
    },
  },
});
