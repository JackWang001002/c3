import { useEffect, useState } from 'react';
import { getWalletAccount } from './getWalletAccount';
import { useOnAccountsChange } from './useOnAccountsChange';

export const useAccount_ = () => {
  const [account, setAccount] = useState<string | undefined>('');
  useEffect(() => {
    getWalletAccount().then(x => setAccount(x));
  }, []);

  useOnAccountsChange((accounts: string[]) => {
    setAccount(accounts?.[0]);
  });

  return account;
};
