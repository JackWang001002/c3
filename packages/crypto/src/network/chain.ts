import { toHexString } from '@c3/utils';
import { cyptoDbg } from '../utils';
import { Currency } from './currency';

export type Chain = {
  readonly rpcUrls: string[];
  readonly chainId: number;
  readonly chainName: string;
  readonly nativeCurrency: Currency;
  readonly iconUrls?: string[];
  readonly blockExplorerUrls?: string[];
};

export const toHexChain = (chain: Chain) => ({
  ...chain,
  chainId: toHexString(chain.chainId),
});

