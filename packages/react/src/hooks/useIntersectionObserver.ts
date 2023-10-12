import { useCallback, useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends HTMLElement>() => {
  return useCallback(
    (
      ref: React.RefObject<T>,
      callback: IntersectionObserverCallback,
      option?: IntersectionObserverInit
    ) => {
      if (!ref.current) {
        return;
      }
      const observer = new IntersectionObserver(callback, option);
      observer.observe(ref.current);
      return () => ref.current && observer.unobserve(ref.current);
    },
    []
  );
};
