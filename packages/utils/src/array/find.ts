import { PlainObject } from "@c3/types";
import { assert } from "../assert";
import { isArray } from "../lang/is";

export const find = <T extends PlainObject>(arr: T[], key: keyof T, value: T[keyof T]): T => {
  assert(isArray(arr), "Not  Array");
  return arr.find((e: T) => e[key] === value) || ({} as T);
};
