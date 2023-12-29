import { env } from "@c3/utils";
import { ethers } from "ethers";
import { injectedProviders, WalletName } from "./injectedProviders";
import { log } from "../utils/dbg";

export const jump2NativeAppOrDlPage = (name: WalletName = "metamask") => {
  if (env.mobile) {
    const target = injectedProviders[name].getDeeplink(window.location.href);
    log("jump2to", target);
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
