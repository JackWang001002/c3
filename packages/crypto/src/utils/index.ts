import { cdbg } from '@c3/utils-1';
import { getWalletProvider } from '../provider';

export * from './math';

export const cyptoDbg = (...args: any[]): void => cdbg(...args)('@crypto');

export const initCryptoDebug = () => {
  getWalletProvider().then(x => ((window as any).walletProvider = x));
};

export const xx9222 = () => {
  console.log('xfuck');
};
