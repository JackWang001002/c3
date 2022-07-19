import { assert, isUrl, URL } from '@c3/utils-1';
import { ethers } from 'ethers';

export const getJsonRpcProvider = (rpcurl: URL) => {
  assert(!!rpcurl && isUrl(rpcurl), `invalid args url:${rpcurl}`);
  return new ethers.providers.JsonRpcProvider(rpcurl);
};
