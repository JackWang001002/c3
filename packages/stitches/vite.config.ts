import commonjs from '@rollup/plugin-commonjs';
import rollupTypescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: 'inline',
    minify: true,
    lib: {
      entry: './src/index.ts',
      name: 'stitches',
      formats: ['iife', 'es', 'umd'],
    },
    rollupOptions: {
      external: [/node:*/,  'tslib', '@stitches/core', 'react'],
      plugins: [commonjs(), rollupTypescript()],
    },
  },
});
