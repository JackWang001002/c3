import { Fn } from '@c3/types';
import { useCallback, useRef } from 'react';
export const useEvent = (cb: Fn) => {
  const ref = useRef<Fn>();
  ref.current = cb;

  return useCallback((...args: any[]) => {
    return ref.current?.(...args);
  }, []);
};
