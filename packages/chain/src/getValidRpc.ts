import type { Chain } from "./types";
import { log } from "./log";

export const getValidRpc = (chain: Chain, httpOnly = true) => {
  if (chain.shortName === "eth") {
    return "https://cloudflare-eth.com";
  }
  if (chain.shortName === "gor") {
    return "https://rpc.ankr.com/eth_goerli";
  }
  if (chain.shortName === "sep") {
    return "https://rpc-sepolia.rockx.com";
  }

  const rpc = chain.rpcUrls.find(
    e => !e.includes("API_KEY") && !e.includes("${") && (httpOnly ? e.startsWith("http") : true)
  );
  if (!rpc) {
    log("chain=", chain.shortName, "has no rpc");
    return "";
  }
  return rpc;
};
