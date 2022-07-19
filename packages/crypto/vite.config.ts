import commonjs from '@rollup/plugin-commonjs';
import rollupTypescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'crypto',
      formats: ['iife', 'es', 'umd'],
    },
    rollupOptions: {
      external: [
        /node:*/,
        'react',
        'lodash',
        'tslib',
        '@c3/utils-1',
        '@c3/hooks-1',
        'ethers',
        '@metamask/detect-provider',
      ],
      plugins: [commonjs(), rollupTypescript()], // `commonjs` plugin include 'required' to single file
    },
  },
});
