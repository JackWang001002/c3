import { getViteConfig } from "../../scripts/vite.config";

export default getViteConfig([
  "dayjs",
  "axios",
  "qs",
  "lodash",
  "numeral",
  "tslib",
  "dayjs/plugin/utc",
]);
