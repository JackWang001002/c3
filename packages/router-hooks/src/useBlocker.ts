import type { History, Transition } from 'history';
import React, { useEffect, useRef } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlocker(cb: (tx: Transition) => boolean) {
  const { navigator } = React.useContext(NavigationContext) as unknown as { navigator: History };
  const ref = useRef<() => void>();

  React.useEffect(() => {

    ref.current = navigator.block(tx => {
      const agreeLeave = cb(tx);
      if (agreeLeave) {
        ref.current && ref.current();
        tx.retry();
      }
    });
    return ref.current;
  }, [navigator, cb]);


  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      ref.current && ref.current();
    });
  }, []);

}

