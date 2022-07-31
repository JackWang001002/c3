import commonjs from '@rollup/plugin-commonjs';
import rollupTypescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'css',
      formats: ['iife', 'es', 'umd'],
    },
    rollupOptions: {
      external: [
        'react',
        'js-cookie',
        'tslib',
        'mitt',
        'dayjs',
        'react-dom',
        '@ant-design/icons',
        'lodash',
        '@c3/dom',
        '@c3/css',
        '@c3/utils',
        'immer',
        'use-immer',
      ],
      plugins: [commonjs(), rollupTypescript()], // `commonjs` plugin include 'required' to single file
    },
  },
});
