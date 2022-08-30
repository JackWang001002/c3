
import { s } from './string';

const ls = typeof window === 'undefined' ? { getItem: () => false } : localStorage;

export const __MOCK__ = !!ls.getItem('mock');

//TODO:
export const __DEV__ = globalThis.location?.hostname === 'localhost';

export const logLevels = s(ls.getItem('dbg')).split(',');

export const log = (...args: unknown[]) => {
  if (logLevels.includes('log')) {
    console.log(...args);
  }
};

export const dbg = (...args: unknown[]) => {
  if (logLevels.includes('dbg')) {
    console.log(...args);
  }
};

export const dev = (...args: unknown[]) => {
  if (__DEV__) {
    console.log(...args);
  }
};

//colorful dbg
export const cdbg = (...args: any[]) => {
  return (keyword: string, style: string) => {
    const styledKeywords = [`%c${keyword}`, style];
    dbg(...styledKeywords, ...args);
  };
};
