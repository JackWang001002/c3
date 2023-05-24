import { rawChainList } from "./rawChainData";
import type { Find } from "@c3/types";

export type RawChainListType = typeof rawChainList;
export type RawChainType = RawChainListType[number];

export type RawChain2Chain<RChain extends RawChainType> = {
  readonly chainId: RChain["chainId"];
  readonly rpcUrls: RChain["rpc"];
  readonly chainName: RChain["name"];
  readonly nativeCurrency: RChain["nativeCurrency"];
  readonly iconUrls?: string[];
  readonly blockExplorerUrls?: string[];
  readonly shortName: RChain["shortName"];
};

//=====================================================================================================
// Name2IdMapType
//=====================================================================================================
export type Name2IdMapType = {
  //@ts-ignore
  [shortName in RawChainType["shortName"]]: Find<
    "shortName",
    shortName,
    //@ts-ignore
    RawChainListType
  >["chainId"];
};

export const NAME2ID_MAP = rawChainList.reduce(
  (acc, e) => ({ ...acc, [e.shortName]: e.chainId }),
  {}
) as Name2IdMapType;

//=====================================================================================================
// Id2ChainType
//=====================================================================================================
export type Id2ChainType = {
  [chainId in RawChainType["chainId"]]: RawChain2Chain<
    Find<
      "chainId",
      chainId,
      //@ts-ignore
      RawChainListType
    >
  >;
};

export const ID2CHAIN_MAP = rawChainList.reduce((acc, e) => {
  return {
    ...acc,
    [e.chainId]: {
      chainId: e.chainId,
      rpcUrls: e.rpc,
      chainName: e.name,
      nativeCurrency: e.nativeCurrency,
      shortName: e.shortName,
      iconUrls: [],
      //@ts-ignore
      blockExplorerUrls: e.explorers?.map(e => e.url),
    },
  };
}, {}) as Id2ChainType;

//=====================================================================================================
// Name2ChainType
//=====================================================================================================
export type Name2ChainType = {
  [name in RawChainType["shortName"]]: RawChain2Chain<
    Find<
      "shortName",
      name,
      //@ts-ignore
      RawChainListType
    >
  >;
};

export const Name2CHAIN_MAP = rawChainList.reduce((acc, e) => {
  return {
    ...acc,
    [e.shortName]: {
      chainId: e.chainId,
      rpcUrls: e.rpc,
      chainName: e.name,
      nativeCurrency: e.nativeCurrency,
      iconUrls: [],
      shortName: e.shortName,
      //@ts-ignore
      blockExplorerUrls: e.explorers?.map(e => e.url),
    },
  };
}, {}) as Name2ChainType;

//@ts-ignore
globalThis.__chain_map = ID2CHAIN_MAP;
