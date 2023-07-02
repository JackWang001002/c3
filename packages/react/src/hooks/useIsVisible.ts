import { useCallback, useEffect, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

/**
 * @return {boolean} Whether the element is visible in the root.
 */

export const useIsVisible = <T extends HTMLElement>() => {
  const [isVisible, setIsVisible] = useState(false);
  const _watch = useIntersectionObserver<T>();

  const watch = useCallback(
    (el: T, option?: IntersectionObserverInit) => {
      return _watch(
        el,
        async entries => {
          setIsVisible(entries[0].intersectionRatio > 0);
        },
        option
      );
    },
    [_watch]
  );

  return [isVisible, watch] as const;
};
