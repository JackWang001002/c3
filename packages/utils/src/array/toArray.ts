import { assert } from '../assert';
import { isNullish } from '../lang';

export const toArray = <T>(x: T[] | T): T[] => {
  assert(!isNullish(x), 'not support undefined/null value');
  return Array.isArray(x) ? x : [x];
};
