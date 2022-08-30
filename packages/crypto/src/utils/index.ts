import { cdbg } from '@c3/utils';

export * from './math';

export const dbg = (...args: any[]): void =>
  cdbg(...args)('@c3/crypto →', 'color:blue;background:white');
