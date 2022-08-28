import { ethers } from 'ethers';
import { useCallback } from 'react';
import { ContractConfigInfo } from '../context/types';
import { CHAINS } from '../network';
import { useWallet, useContract } from './../context/context';
import { WalletType } from './useWallet_';

export const getRecommendChainId = (cfg: ContractConfigInfo) => {
  if (import.meta.env.MODE === 'production') {
    return cfg['mainnetChainId'];
  }
  return cfg['mainnetChainId'];
};

export const useContractViaWallet = (
  cfg: ContractConfigInfo,
  action: (
    wallet: WalletType,
    contracts: [ethers.Contract, ethers.Contract],
    ...args: any[]
  ) => Promise<any>,
  beforeAction?: (
    wallet: WalletType,
    contracts: [ethers.Contract, ethers.Contract],
    ...args: any[]
  ) => Promise<any>
) => {
  const wallet = useWallet();
  const contracts = useContract(cfg.name);

  return useCallback(
    async (...args: any[]) => {
      const chainId = await wallet.getChainId();
      if (contracts.length === 0) {
        return;
      }
      if (!wallet.account) {
        await wallet.connectWallet();
        return;
      }

      const isWrongChainId = contracts[0].address !== cfg.address[chainId];

      if (isWrongChainId) {
        //@ts-ignore
        await wallet.switchNetwork(CHAINS[getRecommendChainId(cfg)]);
        //TODO: how to do action after switchnetwork directly
        return;
      }
      //@ts-ignore
      beforeAction && beforeAction(wallet, contracts, ...args);
      //@ts-ignore
      return action(wallet, contracts, ...args);
    },
    [action, beforeAction, cfg, contracts, wallet]
  );
};
