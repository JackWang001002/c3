import { ethers } from 'ethers';

export type ContractPair<T extends ethers.Contract = ethers.Contract> = readonly [T, T];

export const createContract = <T extends ethers.Contract = ethers.Contract>(
  contractAddress: string,
  abi: ethers.ContractInterface,
  provider: ethers.providers.JsonRpcProvider
) => {
  if (!provider) {
    throw new Error('provider is undefined');
  }
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const contractWithSigner = contract.connect(provider.getSigner());
  return [contract, contractWithSigner] as unknown as ContractPair<T>;
};
