import { useCallback } from 'react';
import { WalletContract } from '../context/types';
import { createContract } from '../contract';
import { ID2CHAIN_MAP } from '../network';
import { dbg } from '../utils';
import { useContract, useWallet } from '../context/hooks';
import { ContractPair } from '../contract/createContract';

// export const getRecommendChainId = (cfg: WalletContract) => {
//   if (location.host.match(/^(www|overeality|preview)/)) {
//     return cfg['mainnetChainId'];
//   }
//   return cfg['testnetChainId'];
// };

export const useWalletContract = (
  cfg: WalletContract,
  action: (contracts: ContractPair, ...args: any[]) => Promise<any>,
  beforeAction?: (contracts: ContractPair, ...args: any[]) => Promise<any>
) => {
  const wallet = useWallet();
  // const contracts = useContract(cfg.name);

  return useCallback(
    async (...args: any[]) => {
      if (!wallet.connected) {
        throw new Error('wallet not connected');
      }
      // const chainId = await wallet.getChainId();
      const _contractPair = await wallet.getContract(cfg.name);
      // const isWrongChainId =
      //   _contractPair[0].address !== cfg.address[chainId];
      // dbg('isWrongChainId', isWrongChainId, _contractPair);
      // if (isWrongChainId) {
      //   const targetChainId = getRecommendChainId(cfg);
      //   //@ts-ignore
      //   await wallet.switchNetwork(ID2CHAIN_MAP[targetChainId]);
      //   _contractPair = createContract(cfg.address[targetChainId], cfg.abi, wallet.provider!) || [];
      // }
      // try {
      //FIXME: wallet is old one. to fix it
      //@ts-ignore
      beforeAction && (await beforeAction(_contractPair, ...args));
      //@ts-ignore
      return await action(_contractPair, ...args);
      // } catch (e) {
      //   console.error(e);
      //   throw new Error();
      // }
    },
    [action, beforeAction, cfg, wallet]
  );
};
