import { methods } from './makeApi/methods';

export const xfetch = methods.reduce(
  (acc, each) => ({
    ...acc,
    //@ts-ignore
    [each]: async (url: string, options?: Omit<RequestInit, 'method'>) => {
      const res = await fetch(url, { method: each, ...options });
      return await res.json(); //TODO: when not json
    },
  }),
  {}
);
