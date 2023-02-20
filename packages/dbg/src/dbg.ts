export const isEnableDbg = globalThis.localStorage?.getItem("dbg");

export function dbg(...args: unknown[]) {
  if (isEnableDbg) {
    console.log(...args);
  }
}

//colorful dbg
export function cdbg(keyword: string, style: string) {
  return (...args: unknown[]) => {
    dbg(`%c${keyword}`, style, ...args);
  };
}
