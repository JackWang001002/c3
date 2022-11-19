import { addEventListener } from '@c3/dom';
import { MutableRefObject, useEffect } from 'react';

export const useEventListener = (
  target: HTMLElement | Window | Document,
  eventName: string,
  cb: EventListener,
  option?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    if (!target) {
      return;
    }
    return addEventListener(target, eventName, cb, option);
  }, [cb, eventName, option, target]);
};
