// import detectEthereumProvider from '@metamask/detect-provider';

import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
const APP_NAME = "My Awesome App";
const APP_LOGO_URL = "https://example.com/logo.png";
const DEFAULT_ETH_JSONRPC_URL = "xxxx";
const DEFAULT_CHAIN_ID = 1;

declare let window: any;
export type WalletName = "metamask" | "coinbase" | "okx" | "trustwallet";
export const walletName_Metamask: WalletName = "metamask";
export const walletName_Coinbase: WalletName = "coinbase";
export const walletName_OKX: WalletName = "okx";
export const walletName_TrustWallet: WalletName = "trustwallet";
// export type MetaMaskProvider = IndexedType;
// export type CoinbaseProvider = IndexedType;

export type InjectedProvider = {
  [name in WalletName]: {
    getDeeplink: (url: string) => string;
    pcDownloadUrl: string;
    getProvider: () => any; //TODO:
  };
};

export const injectedProviders: InjectedProvider = {
  metamask: {
    // entry: window.ethereum,
    getDeeplink: url => `https://metamask.app.link/dapp/${url}`,
    pcDownloadUrl: "https://metamask.io/download/",
    getProvider: () => {
      if (typeof window.ethereum === "undefined") {
        return undefined;
      }
      const providers = window.ethereum.providers || [];
      const isMultiProvider = !!providers.length;
      if (!isMultiProvider && window.ethereum.isMetaMask) {
        return window.ethereum;
      }

      // edge case if MM and CBW are both installed
      if (isMultiProvider) {
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
    getProvider: () => {
      if (window.coinbaseWalletExtension) {
        const coinbaseWallet = new CoinbaseWalletSDK({
          appName: APP_NAME,
          appLogoUrl: APP_LOGO_URL,
          darkMode: false,
        });
        return coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID);
      }
      return undefined;
    },
  },
  okx: {
    getDeeplink: (url: string) => `okx://wallet/dapp/details?dappUrl=${url}`,
    pcDownloadUrl: "https://www.okx.com/web3",
    getProvider: () => {
      if (window.okxwallet) {
        return window.okxwallet;
      }
      return undefined;
    },
  },
  trustwallet: {
    getDeeplink: (url: string) => `https://link.trustwallet.com/open_url?coin_id=60&url=${url}`,
    pcDownloadUrl: "https://trustwallet.com/",
    getProvider: () => {
      if (window.trustwallet) {
        return window.trustwallet;
      }
      return undefined;
    },
  },
};

export const getInjectedWalletProvider = (name: WalletName) => {
  if (name && injectedProviders[name]) {
    return injectedProviders[name].getProvider();
  }

  return undefined;
};

export const getWalletProvider = (walletName: WalletName | undefined) => {
  if (!walletName) {
    return undefined;
  }
  const provider = getInjectedWalletProvider(walletName);
  if (!provider) {
    return undefined;
  }
  return new ethers.providers.Web3Provider(provider);
};

//@ts-ignore
globalThis.__injectedProviders = injectedProviders;

export const hasInjectedProvider = () => {
  return window.ethereum;
};
