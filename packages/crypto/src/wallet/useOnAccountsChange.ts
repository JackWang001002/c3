import { useCallback, useEffect } from 'react';

export const useOnAccountsChange = (cb: (account: string[]) => void) => {
  const handleCb = useCallback(
    (accounts: string[]) => {
      console.log('accountsChanged,new changes=', accounts);
      cb(accounts);
    },
    [cb]
  );
  useEffect(() => {
    //@ts-ignore
    window?.ethereum?.on('accountsChanged', handleCb);
    return () => {
      //@ts-ignore
      window?.ethereum?.removeListener('accountsChanged', handleCb);
    };
  }, [handleCb]);
};
