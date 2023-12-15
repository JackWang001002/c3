import { Chain } from "../network";
export const getValidRpc = (chain: Chain) => {
  if (chain.shortName === "eth") {
    return "https://cloudflare-eth.com";
  }
  if (chain.shortName === "gor") {
    return "https://rpc.ankr.com/eth_goerli";
  }
  if (chain.shortName === "sep") {
    return "https://rpc-sepolia.rockx.com";
  }

  const rpc = chain.rpcUrls.find(e => !e.includes("API_KEY") && !e.includes("${"));
  if (!rpc) {
    console.log("chain=", chain.shortName);
    // throw new Error("rpc is undefined");
    return "";
  }
  return rpc;
};
