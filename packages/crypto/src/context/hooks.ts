import { isEmpty } from '@c3/utils';
import { useContext } from 'react';
import { Web3Context } from './context';

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const useContract = (name: string) => {
  const { contracts } = useWeb3();
  if (isEmpty(contracts)) {
    return [];
  }
  if (!(name in contracts)) {
    throw new Error(`${name} doesnt existed in contracts`);
  }
  return contracts[name];
};

export const useWallet = () => {
  const { wallet } = useWeb3();
  return wallet;
};
