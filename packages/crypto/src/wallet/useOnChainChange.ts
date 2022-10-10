import { noop } from '@c3/utils';
import { injectedProviders, WalletName } from './injectedProviders';
import { useEffect } from 'react';
import { Fn } from '@c3/types';

export const useOnChainChange = (name: WalletName | undefined, cb: Fn) => {
  useEffect(() => {
    if (!name) { return; }
    return injectedProviders[name]?.onChainChange?.(cb) || noop;
  }, [cb, name]);
};
