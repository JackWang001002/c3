import { useCallback, useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = () => {
  const observerRef = useRef<IntersectionObserver>();

  const watch = useCallback(
    (
      el: HTMLElement,
      callback: IntersectionObserverCallback,
      option?: IntersectionObserverInit
    ) => {
      if (observerRef.current) {
        return;
      }
      const observer = new IntersectionObserver(callback, option);
      observerRef.current = observer;
      observerRef.current.observe(el);
      return () => observerRef.current?.disconnect();
    },
    []
  );
  return watch;
};
