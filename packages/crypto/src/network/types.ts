export type Currency = {
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
};

export type Chain = {
  readonly rpcUrls: readonly string[];
  readonly chainId: number;
  readonly chainName: string;
  readonly nativeCurrency: Currency;
  readonly iconUrls?: readonly string[];
  readonly blockExplorerUrls?: readonly string[];
};
export type Exporer = {
  name: string; url: string; standard: string
}

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
  explorers?: Exporer[];
};
