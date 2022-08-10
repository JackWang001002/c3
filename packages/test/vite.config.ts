import commonjs from '@rollup/plugin-commonjs';
import rollupTypescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'test',
      formats: ['iife', 'es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'tslib', /@c3\/*/, 'lodash'],
      plugins: [commonjs()],
    },
  },
});
