import { useCallback, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

/**
 * @return {boolean} Whether the element is visible in the root.
 */

export const useIsVisible = <T extends HTMLElement>() => {
  const [isVisible, setIsVisible] = useState(false);
  const watch = useIntersectionObserver<T>();
  const watchWrapper = useCallback(
    //TODO: make IntersectionObserverCallback to promised
    (el: T, callback: IntersectionObserverCallback, option?: IntersectionObserverInit) => {
      watch(
        el,
        async (entries, observer) => {
          setIsVisible(entries[0].intersectionRatio > 0);
          await callback(entries, observer);
        },
        option
      );
    },
    [watch]
  );

  return [isVisible, watchWrapper] as const;
};
