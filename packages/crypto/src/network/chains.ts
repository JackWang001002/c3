import { Chain, ChainFullInfo } from './types';
import { rawChainData } from './rawChainData';
import type { Find } from '@c3/types';

type RawChainListType = typeof rawChainData;
type RawChainUnionType = RawChainListType[number];

export type Name2IdMapType = {
  //@ts-ignore
  [shortName in RawChainUnionType['shortName']]: Find<
    'shortName',
    shortName,
    //@ts-ignore
    RawChainListType
  >['chainId'];
};

// @ts-ignore
export const NAME2ID_MAP: Name2IdMapType = rawChainData.reduce(
  // @ts-ignore
  (acc, e) => ({ ...acc, [e.shortName]: e.chainId }),
  {} as Name2IdMapType
);

// export type ID2FullChainTypeX<T extends number> = Find<
//   'chainId',
//   T,
//   //@ts-ignore
//   RawChainListType
// >;

export type ID2FullChainType = {
  [chainId in RawChainUnionType['chainId']]: Find<
    'chainId',
    chainId,
    //@ts-ignore
    RawChainListType
  >;
};

export type FullChain2Chain<T extends ChainFullInfo> = {
  chainId: T['chainId'];
  rpcUrls: T['rpc'];
  chainName: T['name'];
  nativeCurrency: T['nativeCurrency'];
  iconUrls: [];
  blockExplorerUrls: string[];
};

export type Id2ChainType = {
  //@ts-ignore
  [chainId in RawChainUnionType['chainId']]: FullChain2Chain<ID2FullChainType[chainId]>;
};

export const ID2CHAIN_MAP: Id2ChainType = rawChainData.reduce((acc, e) => {
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
}, {} as Id2ChainType);

//@ts-ignore
globalThis.__chain_map = ID2CHAIN_MAP;

