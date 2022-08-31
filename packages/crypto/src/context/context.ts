import { IndexedType, isEmpty } from '@c3/utils';
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
