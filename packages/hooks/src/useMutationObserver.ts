import { useCallback, useEffect, useState } from 'react';

export const useMutationObserver = (cb: MutationCallback, options: MutationObserverInit) => {
  const [obs, setObs] = useState<MutationObserver>();
  useEffect(() => {
    const o = new MutationObserver(cb);
    setObs(o);
  }, [cb, options]);

  const observe = useCallback(
    (target, options) => {
      if (!obs) {
        throw new Error('MutationObserver is not initialized');
      }
      obs.observe(target, options);
      return () => obs.disconnect();
    },
    [obs]
  );

  return observe;
};
