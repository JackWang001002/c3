// import detectEthereumProvider from '@metamask/detect-provider';

import { Fn } from '@c3/types';
import { ethers } from 'ethers';

declare let window: any;
export type WalletName = 'metamask' | 'coinbase' ;
export const walletName_Metamask: WalletName = 'metamask';
export const walletName_Coinbase: WalletName = 'coinbase';
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
    pcDownloadUrl: 'https://metamask.io/download/',
    getProvider: () => {
      if (typeof window.ethereum === 'undefined') {
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
      // return window.ethereum;
      return null;
    },
  },
  coinbase: {
    getDeeplink: (url: string) =>
      `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`,
    pcDownloadUrl: 'https://www.coinbase.com/wallet',

    getProvider: () => {
      if (window.ethereum?.isCoinbaseWallet) {
        return window.ethereum;
      }
      if (window.ethereum?.providers?.length) {
        for (const e of window.ethereum.providers) {
          if (e.isCoinbaseWallet) {
            return e;
          }
        }
      }
      // return window.coinbaseSolana || window.ethereum;
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
