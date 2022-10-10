// import detectEthereumProvider from '@metamask/detect-provider';

import { Fn, IndexedType } from '@c3/types';
import { noop } from '@c3/utils';
import { ethers } from 'ethers';

declare let window: any;
export type WalletName = 'metamask' | 'coinbase';
export const walletName_Metamask: WalletName = 'metamask';
export const walletName_Coinbase: WalletName = 'coinbase';
// export type MetaMaskProvider = IndexedType;
// export type CoinbaseProvider = IndexedType;

export type InjectedProvider = {
  [name in WalletName]: {
    getDeeplink: (url: string) => string;
    pcDownloadUrl: string;
    getProvider: () => any; //TODO:
    onAccountChange?: (cb: (account: string[]) => void) => Fn;
    onChainChange: (cb: (chainId: number) => void) => Fn;
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

      let provider = window.ethereum;
      // edge case if MM and CBW are both installed
      if (window.ethereum?.providers?.length) {
        window.ethereum.providers.forEach((p: any) => {
          if (p.isMetaMask) {
            provider = p;
          }
        });
      }
      return provider;
    },
    onAccountChange: (cb: (account: string[]) => void) => {
      const provider = injectedProviders['metamask'].getProvider();
      provider.on('accountsChanged', cb);
      return () => {
        provider.removeListener('accountsChanged', cb);
      };
    },
    onChainChange: (cb: (chainId: number) => void) => {
      const provider = injectedProviders['metamask'].getProvider();
      provider.on('chainChanged', cb);
      return () => {
        provider.removeListener('chainChanged', cb);
      };
    },
  },
  coinbase: {
    getDeeplink: (url: string) => `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`,
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
      return undefined;
    },
    onChainChange: (cb: (chainId: number) => void) => {
      console.log('coinbase onChainChange. but do nothing');
      return noop;
    },
  },
};

export const getInjectedWalletProvider = (name?: WalletName) => {
  if (name && injectedProviders[name]) {
    return injectedProviders[name].getProvider();
  }
  const provider =
    injectedProviders.metamask.getProvider() || injectedProviders.coinbase.getProvider();
  if (provider) {
    return provider;
  }
  return undefined;
};

export const getWalletProvider = (walletName?: WalletName) => {
  return new ethers.providers.Web3Provider(getInjectedWalletProvider(walletName));
};

//@ts-ignore
window.__injectedProviders = injectedProviders;
