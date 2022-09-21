export type Currency = {
  name: string;
  symbol: string;
  decimals: number;
};

export type Chain = {
  readonly rpcUrls: string[];
  readonly chainId: number;
  readonly chainName: string;
  readonly nativeCurrency: Currency;
  readonly iconUrls?: string[];
  readonly blockExplorerUrls?: string[];
};

export type ChainFullInfo = {
  name: string;
  chain: string;
  icon: string;
  rpc: string[];
  faucets: [];
  nativeCurrency: Currency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44: number;
  ens: {
    registry: string;
  };
  explorers: { name: string; url: string; standard: string }[];
};
