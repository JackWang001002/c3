import commonjs from "@rollup/plugin-commonjs";
import { defineConfig } from "vite";
import path from "node:path";

export const getViteConfig = (external: (string | RegExp)[]) => {
  const pkg = require(path.resolve("./package.json"));
  return defineConfig({
    build: {
      lib: {
        entry: "./src/index.ts",
        fileName: "index",
        name: pkg.name,
        formats: ["cjs", "es", "umd"],
      },
      rollupOptions: {
        external: external,
        plugins: [commonjs()],
      },
    },
  });
};
