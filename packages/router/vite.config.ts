import commonjs from "@rollup/plugin-commonjs";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "css",
      formats: ["iife", "es", "umd"],
    },
    rollupOptions: {
      external: ["react", "tslib", "react-dom", "react-router-dom", "@ant-design/icons"],
      plugins: [commonjs()],
    },
  },
});
