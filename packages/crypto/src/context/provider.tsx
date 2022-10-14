import React, { useMemo } from 'react';
import { createContract } from '../contract/index';
import { dbg } from '../utils';
import { useMyWallet } from '../wallet';
import { Web3Context } from './context';
import { useSwitch } from '@c3/hooks';
import { Contract, WalletCfgInfo } from './types';

type Props = {
  // value: { wallet?: WalletCfgInfo; restContracts?: Contract[] };
  children: React.ReactNode;
};

export const Web3Provider = (props: Props) => {
  const wallet = useMyWallet();
  dbg('web3provider refreshed');

  //@ts-ignore
  globalThis.__wallet = wallet;

  return (
    <Web3Context.Provider
      value={{
        wallet,
      }}
      {...props}
    />
  );
};
