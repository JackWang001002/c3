// import detectEthereumProvider from '@metamask/detect-provider';

import { getProvider as bnbGetProvider } from "@binance/w3w-ethereum-provider";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { CyberProvider, isCyberWallet } from "@cyberlab/cyber-app-sdk";
import { ParticleConnect } from "@particle-network/connect";
import { ParticleProvider } from "@particle-network/provider";
import { ethers } from "ethers";
import type { ChainShortNameType } from "../network";
import { ID2CHAIN_MAP, NAME2ID_MAP, Name2CHAIN_MAP } from "../network";
import { getValidRpc } from "./getValidRpc";
import { log } from "../utils";

declare let window: any;
export type WalletName =
  | "metamask"
  | "coinbase"
  | "okx"
  | "trustwallet"
  | "particle"
  | "bitkeep"
  | "cyber"
  | "bnbWallet"
  | "walletConnect";
export const walletName_Metamask: WalletName = "metamask";
export const walletName_Coinbase: WalletName = "coinbase";
export const walletName_OKX: WalletName = "okx";
export const walletName_TrustWallet: WalletName = "trustwallet";
export const walletName_Particle: WalletName = "particle";
export const walletName_BitKeep: WalletName = "bitkeep";
export const walletName_Cyber: WalletName = "cyber";
export const walletName_WalletConnect: WalletName = "walletConnect";
export const walletName_BNBWallet: WalletName = "bnbWallet";

const providerCache: { [name in WalletName]?: any } = {};

export type InjectedProviderInfo = {
  getDeeplink: (url: string) => string;
  pcDownloadUrl: string;
  getProvider: (chainId?: number) => Promise<any>;
  needConnectChain?: boolean;
  connectChain?: () => Promise<any>;
  disconnect?: () => Promise<any>;
};

export type InjectedProviderMap = {
  [name in WalletName]: InjectedProviderInfo;
};

export const injectedProviders: InjectedProviderMap = {
  metamask: {
    // entry: window.ethereum,
    getDeeplink: url => `https://metamask.app.link/dapp/${url}`, //不需要encodeURIComponent
    pcDownloadUrl: "https://metamask.io/download/",
    getProvider: async () => {
      if (typeof window.ethereum === "undefined") {
        return undefined;
      }
      const providers = window.ethereum?.providers || [];
      const providerMap = window.ethereum?.providerMap;
      const isMultiProvider = !!providers.length || !!providerMap;
      if (!isMultiProvider && window.ethereum?.isMetaMask) {
        return window.ethereum;
      }

      // edge case if MM and CBW are both installed
      if (isMultiProvider) {
        if (providerMap) {
          const provider = providerMap.get("MetaMask");
          if (provider) {
            return provider;
          }
        }
        for (const e of providers) {
          if (e.isMetaMask) {
            return e;
          }
        }
      }
      return null;
    },
  },
  coinbase: {
    getDeeplink: (url: string) => `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`,
    pcDownloadUrl: "https://www.coinbase.com/wallet",
    getProvider: async () => {
      if (window.coinbaseWalletExtension) {
        const coinbaseWallet = new CoinbaseWalletSDK({
          appName: "My Awesome App",
          appLogoUrl: "https://example.com/logo.png",
          darkMode: false,
        });
        return coinbaseWallet.makeWeb3Provider(getValidRpc(Name2CHAIN_MAP["eth"]), 1);
      }
      return undefined;
    },
  },
  okx: {
    getDeeplink: (url: string) => `okx://wallet/dapp/details?dappUrl=${encodeURIComponent(url)}`,
    pcDownloadUrl: "https://www.okx.com/web3",
    getProvider: async () => {
      if (window.okxwallet) {
        return window.okxwallet;
      }
      return undefined;
    },
  },
  trustwallet: {
    getDeeplink: (url: string) =>
      `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(url)}`,
    pcDownloadUrl: "https://trustwallet.com/",
    getProvider: async () => {
      //处理移动端window.trustwallet不是proxy，不提供功能的问题
      if (window.ethereum?.isTrust) {
        return window.ethereum;
      }
      if (window.trustwallet) {
        return window.trustwallet;
      }
      return undefined;
    },
  },
  particle: {
    getDeeplink: (url: string) => "",
    pcDownloadUrl: "",
    getProvider: async () => {
      const particle = new ParticleConnect({
        projectId: "a6991b19-e1d9-4da0-a8ff-1928d4651cc6",
        clientKey: "cLxYtnw4BIiwoV7zkjNOXMHVFD04QgC2k6Opm1VM",
        appId: "269e4911-b398-4699-a2a2-fe2fd78a335c",
        chains: [
          {
            id: 1,
            name: "Ethereum",
          },
          {
            id: 97,
            name: "bsc testnet",
          },
          {
            id: 56,
            name: "bsc mainnet",
          },
        ],
      });
      window.__particalNetwork = particle;

      return new ParticleProvider(particle.particle.auth);
    },
  },
  bitkeep: {
    getDeeplink: (url: string) => `https://bkcode.vip?action=dapp&url=${encodeURIComponent(url)}`,
    pcDownloadUrl: "https://web3.bitget.com/en/wallet-download",
    getProvider: async () => {
      return window.bitkeep && window.bitkeep.ethereum;
    },
  },
  cyber: {
    getDeeplink: (url: string) => "",
    pcDownloadUrl: "https://wallet.cyber.co/apps/",
    getProvider: async () => {
      if (providerCache["cyber"]) {
        return providerCache["cyber"];
      }

      const inInCyberWallet = isCyberWallet();
      if (!inInCyberWallet) {
        return null;
      }
      const app = window.__cyberApp;
      const cyberChainName: ChainShortNameType = window.__cyberChainId;
      let DEFAULT_CHAIN_ID = NAME2ID_MAP[cyberChainName];
      if (!app) {
        return null;
      }
      if (!DEFAULT_CHAIN_ID) {
        DEFAULT_CHAIN_ID = 1;
      }
      providerCache["cyber"] = new CyberProvider({
        app,
        chainId: DEFAULT_CHAIN_ID,
      });
      return providerCache["cyber"];
    },
  },
  walletConnect: {
    getDeeplink: (url: string) => "",
    pcDownloadUrl: "",
    needConnectChain: true,
    connectChain: async function (this: InjectedProviderInfo) {
      const provider = await this?.getProvider();
      if (!provider) {
        return;
      }
      await provider.connect();
    },
    getProvider: async () => {
      log("====>getprovider walletconnect");
      const walletConnectName = "walletConnect";
      if (providerCache[walletConnectName]) {
        return providerCache[walletConnectName];
      }
      const { EthereumProvider } = await import("@walletconnect/ethereum-provider");
      providerCache[walletConnectName] = await EthereumProvider.init({
        projectId: "33d371b82f65791565cca81fbbb595a1", // REQUIRED your projectId
        // chains: [56], // REQUIRED chain ids
        optionalChains: [56], //56 bnb
        // optionalChains: [], // OPTIONAL chains
        showQrModal: true, // REQUIRED set to "true" to use @walletconnect/modal
        // methods, // REQUIRED ethereum methods
        // optionalMethods, // OPTIONAL ethereum methods
        // events, // REQUIRED ethereum events
        // optionalEvents, // OPTIONAL ethereum events
        // rpcMap: {
        // 5000: "https://rpc.mantle.xyz",
        // [NAME2ID_MAP["combo_mainnet"]]: getValidRpc(Name2CHAIN_MAP["combo_mainnet"]),
        // },
        // OPTIONAL rpc urls for each chain
        // metadata, // OPTIONAL metadata of your app
        // qrModalOptions, // OPTIONAL - `undefined` by default, see https://docs.walletconnect.com/web3modal/options
      });
      return providerCache[walletConnectName];
    },
    disconnect: async () => {
      const provider = await this?.getProvider();
      provider?.disconnect();
    },
  },
  bnbWallet: {
    getDeeplink: (url: string) => "",
    pcDownloadUrl: "",
    getProvider: async (chainId?: number) => {
      if (providerCache["bnbWallet"]) {
        return providerCache["bnbWallet"];
      }
      providerCache["bnbWallet"] = bnbGetProvider({
        chainId: chainId || 56,
        rpc: Object.values(ID2CHAIN_MAP).reduce((acc, cur) => {
          acc[cur.chainId] = getValidRpc(cur);
          return acc;
        }, {} as any),

        infuraId: "",
        lng: "en",
      });
      return providerCache["bnbWallet"];
    },
  },
};

export const getInjectedProviderInfo = (name: WalletName) => {
  return injectedProviders[name];
};
export const getInjectedWalletProvider = async (name: WalletName, chainId?: number) => {
  if (name && injectedProviders[name]) {
    return injectedProviders[name].getProvider(chainId);
  }
  return undefined;
};

export const getWeb3Provider = async (walletName: WalletName | undefined, chainId?: number) => {
  if (!walletName) {
    return undefined;
  }
  const provider = await getInjectedWalletProvider(walletName, chainId);
  if (!provider) {
    return undefined;
  }
  return new ethers.providers.Web3Provider(provider);
};

//@ts-ignore
globalThis.__injectedProviders = injectedProviders;
