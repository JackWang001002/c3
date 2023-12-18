import { useLatest } from "@c3/react";
import { toHexString, waitFor } from "@c3/utils";
import { BigNumber, ethers } from "ethers";
import _ from "lodash";
import { useCallback, useState, useEffect } from "react";
import { Chain } from "../network/types";
import { toHexChain } from "../network/utils";
import { dbg } from "../utils";

import {
  WalletName,
  getInjectedWalletProvider,
  getWalletProvider,
  hasInjectedProvider,
} from "./injectedProviders";
import { useOnChainChanged } from "./onChange";
import { useAccount_ } from "./useAccount_";
import { jump2NativeAppOrDlPage } from "./utils";
declare global {
  interface Window {
    ethereum?: any;
  }
}

//TODO:TS2742
export type WalletType = {
  readonly provider: ethers.providers.Web3Provider | undefined;
  readonly name: WalletName | undefined;
  readonly addNetwork: (chain: Chain) => Promise<any>;
  readonly switchNetwork: (chain: Chain) => Promise<ethers.providers.Web3Provider>;
  readonly connectAccount: () => Promise<string>;
  readonly account: string | undefined;
  readonly getBalance: () => Promise<BigNumber>;
  readonly getNetwork: () => Promise<ethers.providers.Network>;
  readonly getChainId: () => Promise<number>;
  readonly connected: boolean;
  readonly switchProvider: (walletName: WalletName) => Promise<ethers.providers.Web3Provider>;
};

export const useMyWallet = (initialName: WalletName | undefined): WalletType => {
  const [name, setName] = useState(initialName);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>();
  useEffect(() => {
    if (initialName) {
      getWalletProvider(initialName).then(x => setProvider(x));
    }
  }, [initialName]);
  const providerRef = useLatest(provider);

  const onChainChanged = useCallback(
    async (chainId: number) => {
      console.log("chain changed. new chainId=", chainId);
      if (!name) {
        return;
      }
      setProvider(await getWalletProvider(name, chainId));
    },
    [name]
  );

  useOnChainChanged(provider, onChainChanged);
  const account = useAccount_(provider);
  const addNetwork = useCallback(
    async (chain: Chain) => {
      dbg("[addNetwork] chain=", chain);
      if (!provider) {
        throw new Error("provider is not ready");
      }
      return provider?.send("wallet_addEthereumChain", [_.omit(toHexChain(chain), "shortName")]);
    },
    [provider]
  );

  const switchProvider = useCallback(async (newName: WalletName) => {
    if (!newName) {
      throw new Error("please supply wallet name");
    }
    const injectedProvider = await getInjectedWalletProvider(newName);
    if (!injectedProvider) {
      jump2NativeAppOrDlPage(newName);
      throw new Error(`${newName} is not installed`);
    }
    // setInjectedProvider(injectedProvider);
    const provider = new ethers.providers.Web3Provider(injectedProvider);
    setProvider(provider);
    setName(newName);
    localStorage.setItem("walletName", newName || "");
    return provider;
  }, []);

  const connectAccount = useCallback(async () => {
    if (!hasInjectedProvider) {
      jump2NativeAppOrDlPage();
      return;
    }
    if (!provider) {
      throw new Error("provider is not ready");
    }
    const r = await provider?.send("eth_requestAccounts", []);
    return r[0];
  }, [provider]);

  const switchNetwork = useCallback(
    async (chain: Chain) => {
      if (!provider) {
        throw new Error("provider is null");
      }
      if (!account) {
        await connectAccount();
        // await waitFor(() => !!accountRef.current);
      }
      const chainId = await (await provider.getNetwork()).chainId;
      if (chainId === chain.chainId) {
        return provider;
      }
      try {
        dbg("[switchNetwork] chain=", chain);
        await provider.send("wallet_switchEthereumChain", [
          { chainId: toHexString(chain.chainId) },
        ]);
      } catch (e: any) {
        console.log("switchNetwork:", e);
        if (e.code === 4902 || e.code === -32603) {
          await addNetwork(chain);
        } else {
          throw e;
        }
      }
      // 等待ChainChanged事件完成
      await waitFor(() => providerRef.current !== provider);
      return providerRef.current!;
    },
    [account, addNetwork, connectAccount, provider, providerRef]
  );

  return {
    provider,
    // injectedProvider,
    name,
    account,
    connected: !!account,
    addNetwork,
    switchNetwork,
    switchProvider,
    connectAccount,

    getBalance: async () => {
      if (!account || !provider) {
        return BigNumber.from(0);
      }
      return provider?.getBalance(account);
    },
    getNetwork: async () => {
      if (!provider) {
        throw new Error("wallet provider is undefined");
      }
      return provider?.getNetwork();
    },
    getChainId: async () => {
      if (!provider) {
        throw new Error("wallet provider is undefined");
      }
      const network = await provider?.getNetwork();
      return network.chainId;
    },
  } as const;
};
