import { useCallback, useEffect, useRef } from 'react';
export const useResizeObserver = (cb: (e: ResizeObserverEntry) => void) => {

  const observer = useRef<ResizeObserver>();
  useEffect(() => {
    observer.current = new ResizeObserver(entries => {
      cb(entries[0]);
    });
  }, [cb]);

  const watch = useCallback(
    (el: Element, options: ResizeObserverOptions = { box: 'border-box' }) => {
      if (!observer.current) {
        throw new Error('ResizeObserver is not initialized');
      }
      observer.current.observe(el, options);
      return () => observer.current && observer.current.unobserve(el);
    },
    []
  );
  return watch;
};
