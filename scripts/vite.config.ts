import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'vite';

export const getViteConfig = (external: (string | RegExp)[]) =>
  defineConfig({
    build: {
      lib: {
        entry: './src/index.ts',
        fileName: 'index',
        formats: ['cjs', 'es'],
      },
      rollupOptions: {
        external: external,
        plugins: [commonjs()],
      },
    },
  });
