import { IndexedType } from '@c3/utils';
import { BigNumber, ethers } from 'ethers';
import React, { useCallback, useContext } from 'react';
import { Chain } from '../network';
import { useWallet_ } from '../wallet/useWallet_';

export type Web3ContextDataType = {
  wallet: ReturnType<typeof useWallet_>;
  contracts: IndexedType<[ethers.Contract, ethers.Contract]>;
};

export const Web3Context = React.createContext({
  wallet: {},
  contracts: {},
} as Web3ContextDataType);

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const useContract = (name: string) => {
  const { contracts } = useWeb3();
  if (name && name in contracts) {
    return contracts[name];
  }
  return [];
};

export const useWallet = () => {
  const { wallet } = useWeb3();
  return wallet;
};
