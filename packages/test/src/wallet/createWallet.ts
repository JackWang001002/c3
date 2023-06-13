import { ethers } from "ethers";

export const createWallet = (privateKey: string, rpc: string) => {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.connect(new ethers.providers.JsonRpcProvider(rpc));
};
