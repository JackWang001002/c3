import { IndexedType } from '@c3/types';
import React from 'react';
import { useMyWallet } from '../wallet/useMyWallet';
import { ContractPair } from './../contract/createContract';

export type Web3ContextDataType = {
  wallet: ReturnType<typeof useMyWallet>;
  contracts: IndexedType<ContractPair>;
};

export const Web3Context = React.createContext({
  wallet: {},
  contracts: {},
} as Web3ContextDataType);
