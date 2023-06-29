import { isEmpty } from "@c3/utils";
import { useContext } from "react";
import { Web3Context } from "./context";

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const useWallet = () => {
  const { wallet } = useWeb3();
  return wallet;
};
