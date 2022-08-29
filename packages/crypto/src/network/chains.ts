import { Chain } from './types';
import { rawChainData } from './rawChainData';
import { cyptoDbg } from '../utils';

type RawChainListType = typeof rawChainData;
type RawChainType = RawChainListType[number];

export type ChainIdsType = { [key in RawChainType['shortName']]: RawChainType['chainId'] };
export const CHAINID_MAP: ChainIdsType = rawChainData.reduce(
  (acc, e) => ({ ...acc, [e.shortName]: e.chainId }),
  {} as ChainIdsType
);

export type ChainsType = { [chainId in RawChainType['chainId']]: Chain };
export const CHAIN_MAP: ChainsType = rawChainData.reduce((acc, e) => {
  return {
    ...acc,
    [e.chainId]: {
      chainId: e.chainId,
      rpcUrls: e.rpc,
      chainName: e.name,
      nativeCurrency: e.nativeCurrency,
      iconUrls: [],
      //@ts-ignore
      blockExplorerUrls: e.explorers && e.explorers.map(e => e.url),
    },
  };
}, {} as ChainsType);

//@ts-ignore
window.__chain_map = CHAIN_MAP;
