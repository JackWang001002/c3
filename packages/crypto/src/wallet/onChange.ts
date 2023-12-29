import { noop } from "@c3/utils";
import { useEffect } from "react";
import { Fn } from "@c3/types";
import { ethers } from "ethers";

export const useOnChainChanged = (
  provider: ethers.providers.Web3Provider | undefined,
  cb: (chaindId: number) => void
) => {
  useEffect(() => {
    if (!provider?.provider) {
      return;
    }
    //@ts-ignore
    provider.provider?.on("chainChanged", cb) || noop;
    //@ts-ignore
    provider.provider?.on("network", cb) || noop;
    return () => {
      //@ts-ignore
      const off = (provider?.provider?.off || provider?.provider?.removeListener || noop).bind(
        provider?.provider
      );
      off("chainChanged", cb);
      off("network", cb);
    };
  }, [cb, provider, provider?.provider]);
};

export const useOnAccountChanged = (
  provider: ethers.providers.Web3Provider | undefined,
  cb: (accounts: string[]) => void
) => {
  useEffect(() => {
    if (!provider?.provider) {
      return;
    }
    //@ts-ignore
    const on = (provider?.provider?.on || provider?.provider?.addListener || noop).bind(
      provider?.provider
    );
    on("accountsChanged", cb);
    return () => {
      //@ts-ignore
      const off = (provider?.provider?.off || provider?.provider?.removeListener || noop).bind(
        provider?.provider
      );
      off("accountsChanged", cb);
    };
  }, [cb, provider, provider?.provider]);
};

export const useOnDisconnect = (
  web3provider: ethers.providers.Web3Provider | undefined,
  cb: (accounts: string[]) => void
) => {
  useEffect(() => {
    if (!web3provider?.provider) {
      return;
    }
    //@ts-ignore
    const on = (web3provider?.provider?.on || web3provider?.provider?.addListener || noop).bind(
      web3provider?.provider
    );
    on("disconnect", cb);
    return () => {
      const off = //@ts-ignore
      (web3provider?.provider?.off || web3provider?.provider?.removeListener || noop).bind(
        web3provider?.provider
      );
      off("disconnect", cb);
    };
  }, [cb, web3provider, web3provider?.provider]);
};
