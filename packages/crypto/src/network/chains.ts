import { GetValue } from '@c3/utils';
import { Chain } from './chain';
import { ChainId } from './chainIds';

export const CHAINS: { [k in GetValue<typeof ChainId>]?: Chain } = {
  [ChainId.OasisEmeraldTestnet]: {
    chainId: ChainId.OasisEmeraldTestnet,
    chainName: 'OasisEmeraldTestnet',
    rpcUrls: ['https://testnet.emerald.oasis.dev'],
    nativeCurrency: {
      name: 'ROSE',
      symbol: 'ROSE',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.explorer.emerald.oasis.dev'],
  },
  [ChainId.OasisEmerald]: {
    chainId: ChainId.OasisEmerald,
    chainName: 'OasisEmeraldMainnet',
    rpcUrls: ['https://emerald.oasis.dev'],
    nativeCurrency: {
      name: 'ROSE',
      symbol: 'ROSE',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.emerald.oasis.dev'],
  },
  [ChainId.Rinkeby]: {
    chainId: ChainId.Rinkeby,
    chainName: 'Rinkeby Test Network',
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
    nativeCurrency: {
      name: 'RinkebyETH',
      symbol: 'RinkebyETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  [ChainId.BSC]: {
    chainId: ChainId.BSC,
    chainName: 'BSC Network',
    rpcUrls: ['https://bsc-dataseed1.binance.org', 'https://bsc-dataseed2.binance.org'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [ChainId.BSCTestnet]: {
    chainId: ChainId.BSCTestnet,
    chainName: 'BSC Test Network',
    rpcUrls: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  [ChainId.Goerli]: {
    chainId: ChainId.Goerli,
    chainName: 'Goerli Test Network',
    rpcUrls: ['https://goerli.infura.io/v3/'],
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'GoerliETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
};
