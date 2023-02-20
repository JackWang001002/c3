import type { History, Transition } from "history";
import React, { useEffect, useRef } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

export function useBlocker(cb: (tx: Transition) => boolean) {
  const { navigator } = React.useContext(NavigationContext) as unknown as { navigator: History };
  const unblockRef = useRef<() => void>();

  React.useEffect(() => {

    unblockRef.current = navigator.block(tx => {
      const agreeLeave = cb(tx);
      if (agreeLeave) {
        unblockRef.current && unblockRef.current();
        tx.retry();
      }
    });
    return unblockRef.current;
  }, [navigator, cb]);


  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      unblockRef.current && unblockRef.current();
    });
  }, []);

}

