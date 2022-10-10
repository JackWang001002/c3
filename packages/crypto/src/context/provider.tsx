import React, { useMemo } from 'react';
import { createContract } from '../contract/index';
import { dbg } from '../utils';
import { useMyWallet } from '../wallet';
import { Web3Context } from './context';
import { Contract, WalletCfgInfo } from './types';

type Props = {
  value: { wallet?: WalletCfgInfo; restContracts?: Contract[] };
  children: React.ReactNode;
};

export const Web3Provider = (props: Props) => {
  const { value: { wallet: wi, restContracts } = { wallet: { contracts: [] } }, ...restProps } =
    props;
  const wallet = useMyWallet(wi!);
  dbg('web3provider refreshed');

  const contracts = useMemo(
    () =>
      (restContracts || []).reduce(
        (acc, cur) => ({ ...acc, [cur.name]: createContract(cur.address, cur.abi, cur.provider) }),
        {}
      ),
    [restContracts]
  );

  //@ts-ignore
  globalThis.__wallet = wallet;
  //@ts-ignore
  globalThis.__contracts = contracts;

  return <Web3Context.Provider value={{ wallet, contracts }} {...restProps} />;
};
