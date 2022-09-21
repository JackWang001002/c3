import { toHexChain } from './../network/utils';
import { toHexString } from '@c3/utils';
import { BigNumber, ethers } from 'ethers';
import { useCallback } from 'react';
import { Chain } from '../network/types';
import { useAccount_ } from './useAccount_';
import { dbg } from '../utils';
import { useWalletProvider } from './walletProvider';

//TODO:TS2742
export type WalletType = {
  readonly provider: ethers.providers.JsonRpcProvider | undefined;
  readonly addNetwork: (chain: Chain) => Promise<any>;
  readonly switchNetwork: (chain: Chain) => Promise<null>;
  readonly connectWallet: () => Promise<string>;
  readonly account: string | undefined;
  readonly getBalance: () => Promise<BigNumber>;
  readonly getNetwork: () => Promise<ethers.providers.Network>;
  readonly getChainId: () => Promise<number>;
};

export const useWallet_ = (): WalletType => {
  const provider = useWalletProvider();

  const account = useAccount_();

  const addNetwork = useCallback(
    async (chain: Chain) => {
      dbg('[addNetwork] chain=', chain);
      return provider?.send('wallet_addEthereumChain', [toHexChain(chain)]);
    },
    [provider]
  );

  const switchNetwork = useCallback(
    async (chain: Chain) => {
      try {
        dbg('[switchNetwork] chain=', chain);
        await provider?.send('wallet_switchEthereumChain', [
          { chainId: toHexString(chain.chainId) },
        ]);
      } catch (e: any) {
        console.log('switchNetwork:', e);
        if (e.code === 4902 || e.code === -32603) {
          return addNetwork(chain);
        }
        throw e;
      }
    },
    [addNetwork, provider]
  );

  const connectWallet = useCallback(async () => {
    if (!provider) {
      console.error('provider is not defined');
    }
    const r = await provider?.send('eth_requestAccounts', []);
    return r[0];
  }, [provider]);

  return {
    provider,
    addNetwork,
    switchNetwork,
    connectWallet,
    account,
    getBalance: async () => {
      if (!account || !provider) {
        return BigNumber.from(0);
      }
      return provider?.getBalance(account);
    },
    getNetwork: async () => {
      if (!provider) {
        throw new Error('wallet provider is undefined');
      }
      return provider?.getNetwork();
    },
    getChainId: async () => {
      if (!provider) {
        throw new Error('wallet provider is undefined');
      }
      const network = await provider?.getNetwork();
      return network.chainId;
    },
  } as const;
};
