import { useCallback, useEffect } from 'react';
import { dbg } from '../utils';

export const useOnChainChange = (cb: (chainId: string) => void) => {
  const handleCb = useCallback(
    (chainId: string) => {
      dbg('[useOnChainChange]:chain changed,newChainId=', chainId);
      cb(chainId);
    },
    [cb]
  );
  useEffect(() => {
    //@ts-ignore
    window?.ethereum?.on('chainChanged', handleCb);
    return () => {
      //@ts-ignore
      window?.ethereum?.removeListener('chainChanged', handleCb);
    };
  }, [handleCb]);
};
