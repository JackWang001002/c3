import { getViteConfig } from '../../scripts/vite.config';

export default getViteConfig([
  'react',
  'lodash',
  'tslib',
  '@c3/utils',
  '@c3/react',
  'ethers',
  '@metamask/detect-provider',
]);
