import { useCallback, useEffect, useRef } from "react";

export const useResizeObserver = <T extends HTMLElement>() => {
  const observerRef = useRef<ResizeObserver>();

  const watch = useCallback(
    (
      el: T,
      cb: ResizeObserverCallback,
      options: ResizeObserverOptions = { box: "border-box" }
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
