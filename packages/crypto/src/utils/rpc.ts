import ethers from "ethers";
import { Chain } from "@c3/chain";

export type ProviderType =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.Web3Provider
  | ethers.providers.WebSocketProvider;

export const checkRpcValid = (url: string) => {
  if (url.startsWith("https://")) {
    const data = JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_chainId",
      params: [],
      id: 67,
    });
    return fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  } else if (url.startsWith("ws://") || url.startsWith("wss://")) {
    throw new Error("Not Support");
  }
};

export const retryRpc = (
  callback: (provider: ProviderType) => Promise<any>,
  chain: Chain,
  provider?: ProviderType
) => {
  const rpcUrls = chain.rpcUrls.filter(e => !e.includes("API_KEY"));
  return async (): Promise<any> => {
    async function inner(i: number): Promise<any> {
      console.log("try call rpc, i = ", i);
      if (i >= rpcUrls.length) {
        throw new Error("all rpc url useed!");
      }
      try {
        if (provider && i == -1) {
          return await callback(provider);
        } else {
          const rpcUrl = rpcUrls[i];
          await checkRpcValid(rpcUrl);
          const jsonRpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
          return await callback(jsonRpcProvider);
        }
      } catch (e) {
        if (e) {
          // todo 找到错误类型
          console.error(`call rpc${i} error, url = ${rpcUrls[i]}`, e);
          i++;
          return await inner(i);
        }
        throw e;
      }
    }
    if (provider) {
      return await inner(-1);
    }
    return await inner(0);
  };
};
