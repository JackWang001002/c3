import { getViteConfig } from '../../scripts/vite.config';

export default getViteConfig([
  'react',
  'lodash',
  'tslib',
  '@c3/utils',
  '@c3/hooks',
  'ethers',
  '@metamask/detect-provider',
]);
