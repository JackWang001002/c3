import { ethers } from 'ethers';
import { WalletName } from '../wallet';
export type ContractAddress = string;

export type WalletContract = {
  name: string;
  abi: ethers.ContractInterface;
  address: {
    [chainId: number]: ContractAddress;
  };
  // provider: ethers.providers.JsonRpcProvider;
  mainnetChainId: number;
  testnetChainId: number;
};

export type Contract = {
  name: string;
  abi: ethers.ContractInterface;
  address: string;
  provider: ethers.providers.JsonRpcProvider;
};

export type WalletCfgInfo = {
  contracts: WalletContract[];
  name?: WalletName;
};
