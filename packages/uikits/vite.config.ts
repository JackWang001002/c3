import commonjs from '@rollup/plugin-commonjs';
import rollupTypescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'uikits',
      formats: ['iife', 'es', 'umd'],
    },
    rollupOptions: {
      external: [
        /node:*/,
        'styled-components',
        'polished',
        'tslib',

        'react',
        'react-dom',
        '@ant-design/icons',
        'antd',
        '@c3/css',
        '@c3/utils-1',
        '@c3/hooks-1',
        '@c3/dom-1',
        'echarts',
        'react-slick',
        'slick-carousel',
        'lodash',
        'deepmerge',
        'classnames',
      ],
      plugins: [commonjs(), rollupTypescript()], // `commonjs` plugin include 'required' to single file
    },
  },
});
