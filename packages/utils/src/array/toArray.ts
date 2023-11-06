import { assert } from "../assert";
import { isNullish } from "../lang";

export const toArray = <T>(input: T[] | T): T[] => {
  assert(!isNullish(input), "not support undefined/null value");
  return Array.isArray(input) ? input : [input];
};
