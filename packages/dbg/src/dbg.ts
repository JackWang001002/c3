import { getFnName } from "./fn";

export const isEnableDbg = globalThis.localStorage?.getItem("dbg");

export function dbg(...args: unknown[]) {
  if (isEnableDbg) {
    console.log(...args);
  }
}

//colorful dbg
export function cdbg(
  keyword: string,
  style: string,
  switchKeyword = "dbg",
  level: "log" | "warn" | "debug" = "log"
) {
  return (...args: unknown[]) => {
    if (globalThis.localStorage?.getItem(switchKeyword)) {
      console[level](`%c${keyword} [${getFnName()}] `, style, ...args);
    }
  };
}
