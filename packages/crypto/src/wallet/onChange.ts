import { noop } from '@c3/utils';
import { useEffect } from 'react';
import { Fn } from '@c3/types';
import { ethers } from 'ethers';

export const useOnChainChanged = (provider: ethers.providers.Web3Provider | undefined, cb: Fn) => {
  useEffect(() => {
    if (!provider?.provider) {
      return;
    }
    //@ts-ignore
    provider.provider?.on('chainChanged', cb) || noop;
    return () => {
      //@ts-ignore
      provider?.provider?.removeListener('chainChanged', cb);

    };
  }, [cb, provider, provider?.provider]);
};

export const useOnAccountChanged = (
  provider: ethers.providers.Web3Provider | undefined,
  cb: Fn
) => {
  useEffect(() => {
    if (!provider?.provider) {
      return;
    }
    //@ts-ignore
    provider?.provider?.on('accountsChanged', cb) || noop;
    return () => {
      //@ts-ignore
      provider?.provider?.removeListener('accountsChanged', cb);
    };
  }, [cb, provider, provider?.provider]);
};
