import {babel} from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import path from "path";
import { fileURLToPath } from "url";
console.log("babel==", babel);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
//add .ts extension
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const babelConfigFile = path.join(__dirname, "../babel.config.cjs");

const config = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "es",
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15,
      __DEV__: process.env.NODE_ENV === "development",
    }),

    resolve({
      jsnext: true,
      extensions: extensions,
    }),
    commonjs(),
    json(),
    babel({ babelHelpers: "bundled", extensions, configFile: babelConfigFile }),
    // strip({ include: /src\/.*\.[mc]?[jt]sx?$/ }),
  ],
  external: [
    "react",
    "react-dom",
    "lodash",
    "react/jsx-runtime",
    "react-dom/client",
    "picomatch",
    "lodash",
    "npmlog",
    "resolve",
    "qs",
    /@yuejs\//,
    /@babel\//,
    /@rollup\//,
    "react-dom",
    "react-router-dom",
    "dayjs",
    "axios",
    "qs",
    "lodash",
    "numeral",
    "tslib",
    "dayjs/plugin/utc",
  ],
};

export default config;