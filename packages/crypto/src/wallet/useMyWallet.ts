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
  getInjectedProviderInfo,
  getInjectedWalletProvider,
  getWeb3Provider,
} from "./injectedProviders";
import { useOnChainChanged } from "./onChange";
import { useAccount } from "./useAccount";
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
  readonly connectChainIfNeeded: (walletName: WalletName) => Promise<void>;
  readonly account: string | undefined;
  readonly getBalance: () => Promise<BigNumber>;
  readonly getNetwork: () => Promise<ethers.providers.Network>;
  readonly getChainId: () => Promise<number>;
  readonly connected: boolean;
  readonly switchProvider: (walletName: WalletName) => Promise<ethers.providers.Web3Provider>;
};

export const useMyWallet = (initialName: WalletName | undefined): WalletType => {
  const [name, setName] = useState(initialName);
  const [web3provider, setWeb3Provider] = useState<ethers.providers.Web3Provider | undefined>();
  const account = useAccount(web3provider);

  useEffect(() => {
    if (initialName) {
      console.log("===>wallet name changed");
      getWeb3Provider(initialName).then(x => setWeb3Provider(x));
    }
  }, [initialName]);
  const providerRef = useLatest(web3provider);

  useOnChainChanged(web3provider, async (chainId: number) => {
    console.log("===>chain changed. new chainId=", chainId);
    if (!name) {
      return;
    }
    setWeb3Provider(await getWeb3Provider(name, chainId));
  });

  const addNetwork = useCallback(
    async (chain: Chain) => {
      console.log("[addNetwork] chain=", chain);
      if (!web3provider) {
        throw new Error("provider is not ready");
      }
      return web3provider?.send("wallet_addEthereumChain", [
        _.omit(toHexChain(chain), "shortName"),
      ]);
    },
    [web3provider]
  );
  //connect to network
  const connectChainIfNeeded = useCallback(async (walletName: WalletName) => {
    const injectedProviderInfo = getInjectedProviderInfo(walletName);
    if (injectedProviderInfo.needConnectChain) {
      await injectedProviderInfo.connectChain?.();
    }
  }, []);

  const switchProvider = useCallback(
    async (walletName: WalletName) => {
      if (!walletName) {
        throw new Error("please supply wallet name");
      }
      const injectedProvider = await getInjectedWalletProvider(walletName);
      if (!injectedProvider) {
        jump2NativeAppOrDlPage(walletName);
        throw new Error(`${walletName} is not installed`);
      }
      await connectChainIfNeeded(walletName);
      const web3provider = new ethers.providers.Web3Provider(injectedProvider);
      setWeb3Provider(web3provider);
      setName(walletName);
      localStorage.setItem("walletName", walletName || "");
      return web3provider;
    },
    [connectChainIfNeeded]
  );

  const connectAccount = useCallback(async () => {
    if (!web3provider) {
      throw new Error("provider is not ready");
    }
    const r = await web3provider?.send("eth_requestAccounts", []);
    return r[0];
  }, [web3provider]);

  const switchNetwork = useCallback(
    async (chain: Chain) => {
      if (!web3provider) {
        throw new Error("provider is null");
      }
      if (!account) {
        await connectAccount();
        // await waitFor(() => !!accountRef.current);
      }
      const chainId = await (await web3provider.getNetwork()).chainId;
      if (chainId === chain.chainId) {
        return web3provider;
      }
      try {
        console.log("[switchNetwork] chain=", chain);
        await web3provider.send("wallet_switchEthereumChain", [
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
      await waitFor(() => providerRef.current !== web3provider);
      return providerRef.current!;
    },
    [account, addNetwork, connectAccount, web3provider, providerRef]
  );

  return {
    provider: web3provider,
    name,
    account,
    connected: !!account,
    addNetwork,
    switchNetwork,
    switchProvider,
    connectAccount,
    connectChainIfNeeded,

    getBalance: async () => {
      if (!account || !web3provider) {
        return BigNumber.from(0);
      }
      return web3provider?.getBalance(account);
    },
    getNetwork: async () => {
      if (!web3provider) {
        throw new Error("wallet provider is undefined");
      }
      return web3provider?.getNetwork();
    },
    getChainId: async () => {
      if (!web3provider) {
        throw new Error("wallet provider is undefined");
      }
      const network = await web3provider?.getNetwork();
      return network.chainId;
    },
  } as const;
};
