import { useCallback, useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends HTMLElement>() => {
  const observerRef = useRef<IntersectionObserver>();
  const watch = useCallback(
    (el: T, callback: IntersectionObserverCallback, option?: IntersectionObserverInit) => {
      if (observerRef.current) {
        return;
      }
      const observer = new IntersectionObserver(callback, option);
      observerRef.current = observer;
      observerRef.current.observe(el);
      return () => observerRef.current?.disconnect();
    },
    [observerRef]
  );
  return watch;
};

export const useIntersectionObserver2 = <T extends HTMLElement>() => {
  const watch = useCallback((el: T, callback: IntersectionObserverCallback, option?: IntersectionObserverInit) => {
    const observer = new IntersectionObserver(callback, option);
    observer.observe(el);
    return () => observer?.unobserve(el);
  }, []);
  return watch;
};
