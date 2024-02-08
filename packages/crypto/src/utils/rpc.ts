import { ethers, providers } from "ethers";
import { Chain } from "@c3/chain";

export type ProviderType =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.Web3Provider
  | ethers.providers.WebSocketProvider;

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit & { timeout?: number }
): Promise<Response | Error> => {
  const controller = new AbortController();
  return Promise.race([
    fetch(url, {
      ...options,
      signal: controller.signal,
    }),
    new Promise((_, reject) =>
      setTimeout(() => {
        controller.abort();
        reject(new Error("Request timed out"));
      }, options.timeout || 5000)
    ) as Promise<Error>,
  ]);
};

/**
 * 验证rpc的可用性
 * @param url
 * @returns
 */
export const checkRpcValid = async (url: string) => {
  if (url.startsWith("https://")) {
    const data = JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_chainId",
      params: [],
      id: 67,
    });
    return fetchWithTimeout(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then(response => {
        if (response instanceof Response) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        console.warn(error);
        throw error;
      });
  } else if (url.startsWith("ws://") || url.startsWith("wss://")) {
    // throw new Error('Not Support');
    const wsProvider = new providers.WebSocketProvider(url);
    try {
      return await wsProvider.getNetwork();
    } catch (e) {
      console.warn(e);
      throw e;
    }
  }
};

/**
 * 重试rpc
 * @param callback
 * @param chain
 * @param provider
 * @returns
 */
export const retryRpc = <T>(
  callback: (provider: ProviderType) => Promise<T>,
  chain: Chain,
  provider?: ProviderType
) => {
  const rpcUrls = chain.rpcUrls.filter(e => !e.includes("API_KEY"));
  return async (): Promise<T> => {
    async function inner(i: number): Promise<T> {
      if (i >= rpcUrls.length) {
        throw new Error("all rpc url useed!");
      }
      try {
        if (provider && i == -1) {
          // -1代表使用传入的provider
          return await callback(provider);
        } else {
          const rpcUrl = rpcUrls[i];
          console.log(`try call rpc, i = ${i}, url=${rpcUrl}`);
          await checkRpcValid(rpcUrl);
          if (rpcUrl.startsWith("ws")) {
            const wsProvider = new ethers.providers.WebSocketProvider(rpcUrl);
            return await callback(wsProvider);
          } else {
            const jsonRpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
            return await callback(jsonRpcProvider);
          }
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
