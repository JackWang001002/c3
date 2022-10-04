import { Fn } from '@c3/types';
import { useEffect } from 'react';
import { useSwitch } from './useSwitch';

export const useCallbackInEffect = (cb: Fn) => {
  const [canRun, run, off] = useSwitch(false);
  useEffect(() => {
    if (canRun) {
      off();
      cb();
    }
  }, [canRun, cb, off]);

  return run;
};
