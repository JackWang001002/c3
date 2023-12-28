import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useOnAccountChanged } from "./onChange";
import { dbg } from "../utils/dbg";

export const useAccount = (provider: ethers.providers.Web3Provider | undefined) => {
  const [account, setAccount] = useState<string | undefined>("");

  useEffect(() => {
    //发生在切链或者初始化的时候
    provider?.send("eth_accounts", []).then(accounts => {
      console.log("===>provider changed. new Accounts=", accounts);
      //walletConnect这里有个bug，会返回空数组
      //@ts-ignore
      if (provider?.provider?.isWalletConnect) {
        accounts[0] && setAccount(accounts[0]);
      }
      setAccount(accounts[0]);
    });
  }, [provider]);

  useOnAccountChanged(provider, accounts => {
    console.log("===>onAccountChanged. new Accounts=", accounts);
    setAccount(accounts[0]);
  });

  return account;
};
