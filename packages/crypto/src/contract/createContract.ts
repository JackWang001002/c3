import { ethers } from 'ethers';



export type ContractPair = [ethers.Contract, ethers.Contract];

export const createContract = (
  contractAddress: string,
  abi: ethers.ContractInterface,
  provider: ethers.providers.JsonRpcProvider
): ContractPair | undefined => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = contract.connect(provider.getSigner());
    return [contract, contractWithSigner];
  } catch (e) {
    console.error('createContract contract failed', e);
    return undefined;
  }
};
