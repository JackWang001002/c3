import { useLatest } from "@c3/react";
import { useCallback } from "react";
import { useWallet } from "../context/hooks";
import { WalletContract } from "../context/types";
import { createContract } from "../contract";
import { ContractPair } from "../contract/createContract";
import { ID2CHAIN_MAP } from "../network";
import { getWalletProvider } from "./injectedProviders";

export const getRecommendChainId = (cfg: WalletContract) => {
  //@ts-ignore
  if (window.__env.PROD) {
    return cfg["mainnetChainId"];
  }
  return cfg["testnetChainId"];
};

export const useWalletContract = (
  cfg: WalletContract,
  action: (contracts: ContractPair, account: string, ...args: any[]) => Promise<any>
) => {
  const wallet = useWallet();
  const walletRef = useLatest(wallet);

  return useCallback(
    async (...args: any[]) => {
      const newWallet = walletRef.current!;

      if (!newWallet.provider) {
        throw new Error("provider is not ready");
      }
      let account = newWallet.account || "  ";
      if (!newWallet.account) {
        account = await newWallet.connectAccount();
      }
      const chainId = await newWallet.getChainId();
      const recommendChainId = getRecommendChainId(cfg);
      if (chainId !== recommendChainId) {
        //@ts-ignore
        await newWallet.switchNetwork(ID2CHAIN_MAP[recommendChainId]);
      }
      // eslint-disable-next-line max-len
      const name = newWallet.name!;
      const contractPair =
        createContract(cfg.address[recommendChainId], cfg.abi, getWalletProvider(name)!) || [];

      return await action(contractPair, account, ...args);
    },
    [action, cfg, walletRef]
  );
};
