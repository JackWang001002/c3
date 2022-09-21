import { ContractConfigInfo, ContractCreateParam } from './types';
import { useEffect, useMemo, useState } from 'react';
import { useWalletProvider } from '../wallet';

export const useGetContractParaForWalletProvider = (
  cfg: ContractConfigInfo
): ContractCreateParam | undefined => {
  const provider = useWalletProvider();
  const [chainId, setChainId] = useState(0);
  useEffect(() => {
    provider?.getNetwork().then(x => setChainId(x.chainId));
  }, [provider]);

  return useMemo(() => {
    if (!provider || !cfg.address[chainId]) {
      return undefined;
    }
    return {
      name: cfg.name,
      address: cfg.address[chainId],
      abi: cfg.abi,
      provider: provider,
    };
  }, [cfg, chainId, provider]);
};
