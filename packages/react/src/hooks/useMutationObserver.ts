import { useCallback, useRef } from 'react';

export const useMutationObserver = <T extends Node>() => {
  const observerRef = useRef<MutationObserver>();

  const watch = useCallback((target: T, cb: MutationCallback, options?: MutationObserverInit) => {
    if (observerRef.current) {
      return;
    }
    observerRef.current = new MutationObserver(cb);
    observerRef.current.observe(target, options);
    return () => observerRef.current?.disconnect();
  }, []);

  return watch;
};
