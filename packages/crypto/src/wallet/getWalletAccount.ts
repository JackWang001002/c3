import { getWalletProvider } from './walletProvider';

export const getWalletAccount = async (): Promise<string> => {
  const provider = await getWalletProvider();
  if (!provider) {
    return '';
  }
  const accounts = await provider?.send('eth_accounts', []);
  return accounts[0];
};
