import { methods } from './makeApi/methods';
import type { HTTP } from './makeApi/http';

export const xfetch = methods.reduce(
  (acc, each) => ({
    ...acc,
    [each]: async (url: string, options?: Omit<RequestInit, 'method'>) => {
      const res = await fetch(url, { method: each, ...options });
      return await res.json(); //TODO: when not json
    },
  }),
  {}
) as HTTP;
