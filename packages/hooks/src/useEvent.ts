import { Fn } from '@c3/types';
export const useEvent = (cb: Fn) => {
  const ref = useRef(cb);
  ref.current = cb;

  return useCallback((...args) => {
    return ref.current?.(...args);
  }, []);
};
