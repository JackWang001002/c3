import { cdbg } from '@c3/utils';

export const ndbg = (...args: any[]): void =>
  cdbg(...args)('@c3/api→', 'color:blue;background:white');
