export const BtcNetworkIds = {
  testnet: 100000101,
  mainnet: 100000001,
} as const;
export const BtcNetworkAppIds = {
  testnet: 101,
  mainnet: 1,
} as const;

export const btcChainList = [
  {
    name: "Bitcoin Testnet3",
    chain: "Bitcoin Testnet3",
    chainName: "Bitcoin Testnet3",
    nativeNetMode: "testnet",
    blockExplorerUrls: ["https://mempool.space/testnet"],
    chainId: BtcNetworkIds.testnet,
    shortName: "btc_test",
    nativeCurrency: {
      name: "BTC",
      symbol: "BTC",
      decimals: 8,
    },
  },
] as const;
