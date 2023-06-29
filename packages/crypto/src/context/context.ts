import { Fn, IndexedType } from "@c3/types";
import React from "react";
import { useMyWallet } from "../wallet/useMyWallet";

export type Web3ContextDataType = {
  wallet: ReturnType<typeof useMyWallet>;
  // switchProvider: {
  //   shouldSwitchProvider: boolean,
  //   shouldSwitchProviderOn: Fn,
  //   shouldSwitchProviderOff: Fn,
  //   pendingWorks: ({ method: Fn, args: any[] })[],
  // }
};

export const Web3Context = React.createContext({
  wallet: {},
} as unknown as Web3ContextDataType);
