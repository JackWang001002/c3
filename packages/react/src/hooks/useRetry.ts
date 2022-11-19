import { Fn } from '@c3/types';
import { useCallback, useEffect, useRef } from 'react';
import { useLatest } from './useLatest';
import { useSwitch } from './useSwitch';

/**
 * const useXXX =()=>{
 *  const [retryOn,handle] = useRetry()
 *  return handle((...args)=>{
 *  // do something
 *  retryOn()
 * })

 *
 * @param cb
 * @returns
 */

export const useRetry = () => {
  const fnRef = useRef<Fn>();
  const argsRef = useRef<any[]>();
  const [retry, retryOn, retryOff] = useSwitch(false);
  useEffect(() => {
    if (retry) {
      retryOff();
      fnRef.current?.(...(argsRef.current || []));
    }
  }, [retry, retryOff, fnRef]);

  const handle = useCallback((work: Fn) => {
    fnRef.current = work;
    return (...args: any[]) => {
      argsRef.current = args;
      work(...args);
    };
  }, []);
  return [retryOn, handle] as const;
};
