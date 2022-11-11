import { useCallback, useEffect, useRef } from 'react';
export const useResizeObserver = () => {
  const observerRef = useRef<ResizeObserver>();

  const watch = useCallback(
    (
      el: Element,
      cb: ResizeObserverCallback,
      options: ResizeObserverOptions = { box: 'border-box' }
    ) => {
      if (observerRef.current) {
        return;
      }
      observerRef.current = new ResizeObserver(cb);
      observerRef.current.observe(el, options);
      return () => observerRef.current?.unobserve(el);
    },
    []
  );
  return watch;
};
