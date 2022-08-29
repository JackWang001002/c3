import { cdbg } from '@c3/utils';

export * from './math';

export const cyptoDbg = (...args: any[]): void => cdbg(...args)('@crypto');
