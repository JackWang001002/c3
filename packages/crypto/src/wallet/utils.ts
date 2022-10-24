import { ethers } from 'ethers';
import { injectedProviders, WalletName } from './injectedProviders';
import { env } from '@c3/utils';

export const getWalletName = (provider: ethers.providers.Web3Provider) => {
  const rawProvider = provider?.provider;
  if (!rawProvider) {
    throw new Error('provider not ready');
  }
  if (rawProvider.isMetaMask) {
    return 'metamask';
  }
  if (rawProvider === injectedProviders['coinbase'].getProvider()) {
    return 'coinbase';
  }
  throw new Error('unknown wallet');
};

export const jump2NativeAppOrDlPage = (name: WalletName = 'metamask') => {
  if (env.mobile) {
    window.open(injectedProviders[name].getDeeplink(window.location.href), '_blank');
  } else if (!env.mobile && !env.tablet) {
    window.open(injectedProviders[name].pcDownloadUrl, '_blank');
  }
};
