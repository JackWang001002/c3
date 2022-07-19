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
        'polished',
        'react',
        'js-cookie',
        'tslib',

        'dayjs',
        'react-dom',
        '@ant-design/icons',
        'lodash',
        'antd',
        '@c3/dom-1',
        '@c3/css',
        '@c3/uikits',
        '@c3/utils-1',
        'immer',
        'use-immer',
        'react-redux',
      ],
      plugins: [commonjs(), rollupTypescript()], // `commonjs` plugin include 'required' to single file
    },
  },
});
