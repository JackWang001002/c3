import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useOnAccountChanged } from './onChange';

export const useAccount_ = (provider: ethers.providers.Web3Provider | undefined) => {
  const [account, setAccount] = useState<string | undefined>('');
  const handleAccountChanged = useCallback((accounts: string[]) => {
    console.log('account changed or provider changed.new Accounts=', accounts);
    setAccount(accounts && accounts[0]);
  }, []);

  useEffect(() => {
    provider?.send('eth_accounts', []).then(handleAccountChanged);
  }, [provider, handleAccountChanged]);

  useOnAccountChanged(provider, handleAccountChanged);

  return account;
};
