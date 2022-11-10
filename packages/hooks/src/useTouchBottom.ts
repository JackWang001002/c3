import { addEventListener, isTouchBottom } from '@c3/dom';
import { dbg } from '@c3/dbg';
import { useEffect } from 'react';

export const useTouchBottom = (el: HTMLElement | null, cb: (e: Event) => Promise<void>) => {
  useEffect(() => {
    if (!el) {
      console.log('please support el');
      return;
    }
    return addEventListener(el, 'scroll', async e => {
      if (isTouchBottom(el)) {
        dbg('@useTouchBottom:isTouchBottom==true');
        await cb(e);
      }
    });
  }, [cb, el]);
};
