import { useCallback, useState } from 'react';
import { useResizeObserver } from './useResizeObserver';

export const useBoundingClientRect = <T extends HTMLElement>() => {
  const watch = useResizeObserver<T>();
  const [rect, setRect] = useState({});
  const watchWrapper = useCallback(
    (el: T) => {
      watch(
        el,
        entries => {
          setRect(entries[0].borderBoxSize);
        },
        { box: 'border-box' }
      );
    },
    [watch]
  );
  return [rect, watchWrapper] as const;
};
