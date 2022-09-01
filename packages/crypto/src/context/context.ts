import { IndexedType } from '@c3/utils';
import React from 'react';
import { useWallet_ } from '../wallet/useWallet_';
import { ContractPair } from './../contract/createContract';

export type Web3ContextDataType = {
  wallet: ReturnType<typeof useWallet_>;
  contracts: IndexedType<ContractPair>;
};

export const Web3Context = React.createContext({
  wallet: {},
  contracts: {},
} as Web3ContextDataType);
