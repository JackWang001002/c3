import { IndexedType } from '@c3/utils';
import React, { useMemo } from 'react';
import { ContractPair, createContract } from '../contract/index';
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
  console.log('web3provider refreshed');

  //@ts-ignore
  window.__wallet = wallet;

  const contracts = useMemo(() => {
    const _contracts: IndexedType<ContractPair> = {};
    for (const ct of value.filter(Boolean)) {
      const contract = createContract(ct.address, ct.abi, ct.provider);
      contract && (_contracts[ct.name] = contract);
    }
    return _contracts;
  }, [value]);

  //@ts-ignore
  window.__contracts = contracts;

  return <Web3Context.Provider value={{ wallet, contracts }} {...restProps} />;
};
