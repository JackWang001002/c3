import { Fn } from '@c3/types';
import { useEventListener } from './useEventListener';

export const useWheel = (onUp: Fn, onDown: Fn) => {
  //@ts-ignore
  useEventListener(window, 'wheel', async (e: WheelEvent) => {
    if (e.deltaY > 0) {
      await onDown(e);
    }
    if (e.deltaY < 0) {
      await onUp(e);
    }
  });
};
