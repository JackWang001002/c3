import { IBox } from '@c3/types';
import { useCallback } from 'react';
import { useResizeObserver } from './useResizeObserver';

export const useBoundingClientRect = (cb: (box: IBox<number>) => void) => {
  const watch = useResizeObserver(entry => {
    cb(entry.target.getBoundingClientRect());
  });
  return useCallback(
    (el: Element) => {
      watch(el);
    },
    [watch]
  );
};
