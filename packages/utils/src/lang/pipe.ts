import { Fn } from '@c3/types';

export const pipe =
  (...fns: Fn[]) =>
  (...args: any[]) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
