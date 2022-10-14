import { useCallback } from 'react';
import { useWallet } from '../context/hooks';
import { WalletContract } from '../context/types';
import { createContract } from '../contract';
import { ContractPair } from '../contract/createContract';

// export const getRecommendChainId = (cfg: WalletContract) => {
//   if (location.host.match(/^(www|overeality|preview)/)) {
//     return cfg['mainnetChainId'];
//   }
//   return cfg['testnetChainId'];
// };

export const useWalletContract = (
  contractInfo: WalletContract,
  action: (contracts: ContractPair, ...args: any[]) => Promise<any>,
) => {
  const wallet = useWallet();

  const work = useCallback(
    async (...args: any[]) => {
      if (!wallet.provider) {
        wallet.ssp.sspOn();
        return;
      }

      const chainId = await wallet.getChainId();
      // eslint-disable-next-line max-len
      const contractPair = createContract(contractInfo.address[chainId], contractInfo.abi, wallet.provider!) || [];

      return await action(contractPair, ...args);

    },
    [action, contractInfo.abi, contractInfo.address, wallet]
  );
  return work;
};
