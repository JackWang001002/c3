import React from "react";
import { log } from "../utils";
import { useMyWallet, WalletName } from "../wallet";
import { Web3Context } from "./context";

type Props = {
  value: WalletName | undefined;
  children: React.ReactNode;
};

export const Web3Provider = (props: Props) => {
  const { value, ...restProps } = props;
  const wallet = useMyWallet(value);
  log("===>web3provider refreshed-1");

  //@ts-ignore
  globalThis.__wallet = wallet;

  return (
    <Web3Context.Provider
      value={{
        wallet,
      }}
      {...restProps}
    />
  );
};
