import { IBox } from '@c3/utils';
import { useEffect, useRef } from 'react';

export const useBoundingClientReact = (el: Element | null, cb: (box: IBox<number>) => void) => {
  // const
  const old = useRef({} as IBox<number>);
  const oldBox = old.current;
  useEffect(() => {
    if (!el) {
      return;
    }
    const box = el.getBoundingClientRect();
    console.log('new box', box);
    if (
      box.left !== oldBox.left &&
      box.top !== oldBox.top &&
      box.width !== oldBox.width &&
      box.height !== oldBox.height
    ) {
      old.current = box;
      cb(box);
    }
  }, [cb, el, oldBox.height, oldBox.left, oldBox.top, oldBox.width]);
};
