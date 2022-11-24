import { addEventListener } from '@c3/dom';
import { useEffect } from 'react';

export const useEventListener = (
  target: HTMLElement | Window | Document,
  eventName: string,
  cb: EventListenerOrEventListenerObject,
  option?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    if (!target) {
      return;
    }
    return addEventListener(target, eventName, cb, option);
  }, [cb, eventName, option, target]);
};
