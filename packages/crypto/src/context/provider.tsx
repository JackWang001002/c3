import { IndexedType } from '@c3/utils';
import React, { useMemo } from 'react';
import { ContractInitInfo, ContractPair, createContract } from '../contract/index';
import { useWallet_ } from '../wallet';
import { Web3Context } from './context';

type Props = {
  value: ContractInitInfo[];
  children: React.ReactChild;
};

export const Web3Provider = (props: Props) => {
  const { value: contractInitInfos, ...restProps } = props;
  const wallet = useWallet_();
  console.log('web3provider refreshed');

  //@ts-ignore
  window.__wallet = wallet;

  const contracts = useMemo(() => {
    const contracts: IndexedType<ContractPair> = {};
    for (const e of contractInitInfos) {
      const contract = createContract(e.contractAddress, e.abi, e.provider);
      if (contract) {
        contracts[e.contractName] = contract;
      }
    }
    return contracts;
  }, [contractInitInfos]);

  //@ts-ignore
  window.__contracts = contracts;

  return <Web3Context.Provider value={{ wallet, contracts }} {...restProps}></Web3Context.Provider>;
};
