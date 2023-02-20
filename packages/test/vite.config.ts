import { getViteConfig } from "../../scripts/vite.config";

export default getViteConfig([
  "@c3/types",
  "@c3/utils",
  "lodash",
  /node:*/,
  "ethers",
  "react",
  "@stitches/react",
]);
