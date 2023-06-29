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
    return () => {
      //@ts-ignore
      const off = (provider?.provider?.off || provider?.provider?.removeListener || noop).bind(
        provider?.provider
      );
      off("chainChanged", cb);
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
    provider?.provider?.on("accountsChanged", cb) || noop;
    return () => {
      //@ts-ignore
      const off = (provider?.provider?.off || provider?.provider?.removeListener || noop).bind(
        provider?.provider
      );
      off("accountsChanged", cb);
    };
  }, [cb, provider, provider?.provider]);
};
