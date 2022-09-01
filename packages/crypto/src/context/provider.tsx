import { IndexedType } from '@c3/utils';
import React, { useMemo } from 'react';
import { ContractPair, createContract } from '../contract/index';
import { dbg } from '../utils';
import { useWallet_ } from '../wallet';
import { Web3Context } from './context';
import { ContractCreateParam } from './types';

type Props = {
  value: ContractCreateParam[];
  children: React.ReactChild;
};

export const Web3Provider = (props: Props) => {
  const { value, ...restProps } = props;
  const wallet = useWallet_();
  dbg('web3provider refreshed');

  //@ts-ignore
  globalThis.__wallet = wallet;

  const contracts = useMemo(() => {
    const _contracts: IndexedType<ContractPair> = {};
    for (const ct of value.filter(Boolean)) {
      const contract = createContract(ct.address, ct.abi, ct.provider);
      contract && (_contracts[ct.name] = contract);
    }
    return _contracts;
  }, [value]);

  //@ts-ignore
  globalThis.__contracts = contracts;

  return <Web3Context.Provider value={{ wallet, contracts }} {...restProps} />;
};
