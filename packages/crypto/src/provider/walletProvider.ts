import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useOnChainChange } from '../wallet';

export const getWalletProvider = async () => {
  const injectedProvider: any = await detectEthereumProvider();
  if (injectedProvider) {
    return new ethers.providers.Web3Provider(injectedProvider);
  }
  return undefined;
};

//FIXME:there is infinite loop using useAsyncState.WHY
export const useWalletProvider = () => {
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>();

  const get = useCallback(async () => {
    getWalletProvider().then(x => x && setProvider(x));
  }, []);

  useOnChainChange(get); //TODO: is this nessary?

  useEffect(() => {
    console.log('provider', provider);
    // provider?.on('accountsChanged', () => console.log('----->account changed'));
    // provider?.on('chainChanged', () => console.log('----->chainChanged changed'));
  }, [provider]);

  useEffect(() => {
    get();
  }, [get]);
  return provider;
};
