import { ethers } from 'ethers';
export type ContractAddress = string;

export type ContractCreateParam = {
  name: string;
  address: ContractAddress;
  abi: ethers.ContractInterface;
  provider: ethers.providers.JsonRpcProvider;
};

export type ContractConfigInfo = {
  name: string;
  abi: ethers.ContractInterface;
  address: {
    [chainId: number]: ContractAddress;
  };
  mainnetChainId: number;
  testnetChainId: number;
};
