import { Fn } from '@c3/types';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { useSwitch } from './useSwitch';

export const useNextTick = () => {
  const [runnable, on, off] = useSwitch(true);
  const ref = useRef<Fn>();

  useLayoutEffect(() => {
    if (runnable) {
      off();
      ref.current?.();
    }
  }, [runnable, off]);

  const nextTick = useCallback(
    (cb: Fn) => {
      on();
      ref.current = cb;
    },
    [on]
  );

  return nextTick;
};
