import { ethers } from 'ethers';
import { useCallback } from 'react';
import { ContractConfigInfo } from '../context/types';
import { createContract } from '../contract';
import { CHAIN_MAP } from '../network';
import { dbg } from '../utils';
import { useWallet, useContract } from './../context/hooks';
import { getWalletProvider } from './walletProvider';

export const getRecommendChainId = (cfg: ContractConfigInfo) => {
  if (location.host.match(/^(www|overeality|preview)/)) {
    return cfg['mainnetChainId'];
  }
  return cfg['testnetChainId'];
};


//@ts-ignore
window.__getRecommendChainId = getRecommendChainId;

export const useContractViaWallet = (
  cfg: ContractConfigInfo,
  action: (contracts: [ethers.Contract, ethers.Contract], ...args: any[]) => Promise<any>,
  beforeAction?: (contracts: [ethers.Contract, ethers.Contract], ...args: any[]) => Promise<any>
) => {
  const wallet = useWallet();
  const contracts = useContract(cfg.name);

  return useCallback(
    async (...args: any[]) => {
      const chainId = await wallet.getChainId();
      let _contractPair = contracts;
      if (!wallet.account) {
        await wallet.connectWallet();
      }

      const isWrongChainId =
        _contractPair.length === 0 || _contractPair[0].address !== cfg.address[chainId];
      dbg('isWrongChainId', isWrongChainId,_contractPair);
      if (isWrongChainId) {
        const targetChainId = getRecommendChainId(cfg);
        //@ts-ignore
        await wallet.switchNetwork(CHAIN_MAP[targetChainId]);
        const provider = await getWalletProvider();
        if (!provider) {
          throw new Error('getWalletProvider failed');
        }
        _contractPair = createContract(cfg.address[targetChainId], cfg.abi, provider) || [];
      }
      //FIXME: wallet is old one. to fix it
      //@ts-ignore
      beforeAction && await beforeAction(_contractPair, ...args);
      //@ts-ignore
      return action(_contractPair, ...args);
    },
    [action, beforeAction, cfg, contracts, wallet]
  );
};
