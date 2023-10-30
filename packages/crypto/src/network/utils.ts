import { toHexString } from "@c3/utils";
import { Chain } from "./types";

export const toHexChain = (chain: Chain) => ({
  ...chain,
  chainId: toHexString(chain.chainId),
  rpcUrls: chain.rpcUrls.filter(e => !e.includes("API_KEY")),
});
