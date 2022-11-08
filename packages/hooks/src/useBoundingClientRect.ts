import { IBox } from '@c3/types';
import { useResizeObserver } from './useResizeObserver';

export const useBoundingClientRect = (cb: (box: IBox<number>) => void) => {
  const watch = useResizeObserver(entry => {
    cb(entry.target.getBoundingClientRect());
  });
  return watch;
};
// export const useBoundingClientRect = <T extends HTMLElement>(el: T) => {
//   const [rect, setRect] = useState({} as IBox<number>);
//   const force = useForceUpdate(); //TODO: fixme
//   useLayoutEffect(() => {
//     if (!el) {
//       setTimeout(force);
//       return;
//     }
//     setRect(el.getBoundingClientRect());
//   }, [el, force]);

//   return rect;
// };
