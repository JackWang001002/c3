import { toHexString } from '@c3/utils';
import { useCallback, useEffect } from 'react';
import { Chain, toHexChain } from '../network/chain';
import { useWalletProvider } from './../provider/index';
import { useAccount$ } from './useAccount';
import { useBalance$ } from './useBalance';

export const useWallet_ = (): any => {
  const provider = useWalletProvider();

  const [account] = useAccount$(provider);

  const addNetwork = useCallback(
    async (chain: Chain) => {
      return provider?.send('wallet_addEthereumChain', [toHexChain(chain)]);
    },
    [provider]
  );

  const switchNetwork = useCallback(
    async (chain: Chain) => {
      try {
        return await provider?.send('wallet_switchEthereumChain', [
          { chainId: toHexString(chain.chainId) },
        ]);
      } catch (e: any) {
        if (e.code === 4902) {
          return addNetwork(chain);
        }
        throw e;
      }
    },
    [addNetwork, provider]
  );

  const connect = useCallback(async () => {
    if (!provider) {
      console.error('provider is not defined');
    }
    await provider?.send('eth_requestAccounts', []);
    //TODO: should update wallet.account immediately?
  }, [provider]);
  const [balance, updateBalance] = useBalance$(account, provider);

  // useEffect(() => {
  //   window.ethereum?.on?.('accountsChanged', () => console.log('----->account changed'));
  //   return () => {
  //     window.ethereum?.off?.('accountsChanged');
  //   };
  // }, [provider, window.ethereum]);
  // useEffect(() => {
  //   window.ethereum?.on?.('chainChanged', () => console.log('----->chainChanged'));
  //   return () => {
  //     window.ethereum?.off?.('chainChanged');
  //   };
  // }, [provider, window.ethereum]);

  return {
    provider,
    addNetwork,
    switchNetwork,
    connect,
    account,
    balance,
    updateBalance,
  };
};
