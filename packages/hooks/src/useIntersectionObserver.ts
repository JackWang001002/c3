import { useCallback, useEffect, useState } from 'react';

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  option?: IntersectionObserverInit
) => {
  const [obs, setObs] = useState<IntersectionObserver>();
  useEffect(() => {
    const observer = new IntersectionObserver(callback, option);
    setObs(observer);
  }, [callback, option]);

  const observe = useCallback(
    (el: HTMLElement) => {
      if (!obs) {
        throw new Error('IntersectionObserver is not initialized');
      }
      obs.observe(el);
      return () => obs.disconnect();
    },
    [obs]
  );
  return observe;
};
