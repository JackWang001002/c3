import { addEventListener } from '@c3/dom';
import { useEffect } from 'react';

export const useMouse = (listener: EventListenerOrEventListenerObject) => {
  useEffect(() => {
    return addEventListener(document, 'mousemove', listener);
  }, [listener]);
};
