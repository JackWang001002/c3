import { Fn } from '@c3/types';
import { useEvent } from './useEvent';
import { useEventListener } from './useEventListener';

export const useWheel = (onUp: Fn, onDown: Fn) => {
  const onWheel = useEvent(async (event: WheelEvent) => {
    if (event.deltaY > 0) {
      await onDown(event);
    } else {
      await onUp(event);
    }
  });
  useEventListener(window, 'wheel', onWheel);
};
