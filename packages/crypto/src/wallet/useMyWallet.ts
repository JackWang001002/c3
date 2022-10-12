import { IndexedType } from '@c3/types';
import { noop, toHexString } from '@c3/utils';
import { BigNumber, ethers } from 'ethers';
import { env } from '@c3/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { WalletCfgInfo } from '../context';
import { Chain } from '../network/types';
import { toHexChain } from '../network/utils';
import { dbg } from '../utils';
import { ContractPair, createContract } from './../contract/createContract';
import { getWalletProvider, injectedProviders, WalletName } from './injectedProviders';
import { useAccount_ } from './useAccount_';
import { getWalletName, jump2NativeAppOrDlPage } from './utils';
import { useOnChainChange } from './useOnChainChange';

//TODO:TS2742
export type WalletType = {
  readonly provider: ethers.providers.JsonRpcProvider | undefined;
  readonly name: WalletName | undefined;
  readonly addNetwork: (chain: Chain) => Promise<any>;
  readonly switchNetwork: (chain: Chain) => Promise<null>;
  readonly connectAccount: () => Promise<string>;
  readonly account: string | undefined;
  readonly getBalance: () => Promise<BigNumber>;
  readonly getNetwork: () => Promise<ethers.providers.Network>;
  readonly getChainId: () => Promise<number>;
  readonly connected: boolean;
  readonly getContract: (name: string) => Promise<ContractPair>;
  readonly getContracts: () => Promise<IndexedType>;
  readonly switchProvider: (walletName: WalletName) => void;
};

export const useMyWallet = (wallet: WalletCfgInfo = {} as WalletCfgInfo): WalletType => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(
    getWalletProvider(wallet.name)
  );
  const [name, setName] = useState<WalletName>();

  const onChainChanged = useCallback(() => {
    const provider = getWalletProvider(name);
    setProvider(provider);
  }, [name]);

  useOnChainChange(name, onChainChanged);

  const account = useAccount_(provider);
  useEffect(() => {
    if (!provider) {
      return;
    }
    setName(getWalletName(provider));
  }, [provider]);

  const contracts = useMemo(async () => {
    if (!provider) {
      return {};
    }
    const chainId = (await provider.getNetwork()).chainId;
    return (wallet.contracts || []).reduce(
      (acc, cur) => ({
        ...acc,
        [cur.name]: createContract(cur.address[chainId], cur.abi, provider),
      }),
      {}
    );
  }, [provider, wallet.contracts]);

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
  const switchProvider = useCallback((name: WalletName) => {
    const injectedProvider = injectedProviders[name].getProvider();
    if (!injectedProvider) {
      jump2NativeAppOrDlPage(name);
      return;
    }
    const provider = new ethers.providers.Web3Provider(injectedProvider);
    setProvider(provider);
  }, []);

  const connectAccount = useCallback(async () => {
    if (!provider) {
      jump2NativeAppOrDlPage();
      return;
    }
    const r = await provider?.send('eth_requestAccounts', []);
    return r[0];
  }, [provider]);

  return {
    provider,
    name,
    account,
    connected: !!account,
    addNetwork,
    switchNetwork,
    switchProvider,
    connectAccount,
    getContracts: async () => contracts,
    getContract: async (name: string) => {
      //@ts-ignore
      return contracts[name];
    },

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
