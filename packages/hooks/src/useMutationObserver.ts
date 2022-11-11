import { useCallback, useEffect, useRef, useState } from 'react';

export const useMutationObserver = () => {
  const ref = useRef<MutationObserver>();

  const watch = useCallback((target, cb: MutationCallback, options) => {
    if (ref.current) {
      return;
    }
    ref.current = new MutationObserver(cb);
    ref.current.observe(target, options);
    return () => ref.current?.disconnect();
  }, []);

  return watch;
};
