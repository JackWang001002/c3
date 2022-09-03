import { getFnName } from './fn';

export const isEnableDbg = globalThis.localStorage?.getItem('dbg');

export const dbg = (...args: unknown[]) => {
  if (isEnableDbg) {
    console.log(...args);
  }
};

//colorful dbg
export const cdbg = (keyword: string, style: string) => {
  return (...args: unknown[]) => {
    dbg(`%c${keyword}`, style, ...args);
  };
};
