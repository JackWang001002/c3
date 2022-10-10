import { getWalletName } from './utils';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { injectedProviders } from './injectedProviders';
import { noop } from '@c3/utils';

export const useAccount_ = (provider: ethers.providers.Web3Provider | undefined) => {
  const [account, setAccount] = useState<string | undefined>('');
  const handleAccountChanged = useCallback((accounts: string[]) => {
    console.log('account changed.new Accounts=', accounts);
    setAccount(accounts && accounts[0]);
  }, []);

  useEffect(() => {
    provider?.send('eth_accounts', []).then(handleAccountChanged);
  }, [provider, handleAccountChanged]);

  useEffect(() => {
    if (!provider?.provider) {
      console.log('provider.provider is undefined', provider);
      return;
    }
    const name = getWalletName(provider);
    return injectedProviders[name]?.onAccountChange?.(handleAccountChanged) || noop;
  });

  return account;
};
