import { env } from "@c3/utils";
import { ethers } from "ethers";
import { injectedProviders, WalletName } from "./injectedProviders";

// export const getWalletName = (provider: ethers.providers.Web3Provider) => {
//   const rawProvider = provider?.provider;
//   if (!rawProvider) {
//     throw new Error("provider is not ready");
//   }
//   if (rawProvider.isMetaMask) {
//     return "metamask";
//   }
//   //@ts-ignore
//   if (rawProvider.isCoinbaseWallet) {
//     return "coinbase";
//   }
//   if (rawProvider === injectedProviders["coinbase"].getProvider()) {
//     return "coinbase";
//   }

//   // throw new Error("unknown wallet");
// };

export const jump2NativeAppOrDlPage = (name: WalletName = "metamask") => {
  if (env.mobile) {
    const target = injectedProviders[name].getDeeplink(window.location.href);
    console.log("jump2to", target);
    window.open(target, "_blank");
  } else if (!env.mobile && !env.tablet) {
    window.open(injectedProviders[name].pcDownloadUrl, "_blank");
  }
};

export const resolveIfNeed = async <T>(value: Promise<T> | T) => {
  if (value instanceof Promise) {
    return await value;
  }
  return value;
};

