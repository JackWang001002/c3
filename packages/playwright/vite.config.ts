
import { getViteConfig } from '../../scripts/vite.config';

export default getViteConfig([
  'tslib',
  /@c3\/*/,
  'lodash',
  /node:*/,
  'playwright',
  '@playwright/test',
  'ethers',
]);
