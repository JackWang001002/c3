import { GetValue, PlainObject } from '@c3/types';
import { assert } from '../assert';

/**
 * get value from object by path
 * @param obj
 * @param path
 * @returns
 */

export const get = <T extends PlainObject>(obj: T, path: string) => {
  const segs = path.split('.');
  let res = obj;
  for (const seg of segs) {
    res = res[seg];
  }
  return res;
};

/*
 * set value to object by path
 * */
export const set = <T extends PlainObject, K = GetValue<T>>(
  obj: T,
  path: string,
  value: K
): void => {
  const segments = path.split('.');

  const nthSegments = segments.slice(0, -1);
  let innerObject = obj;
  for (const segment of nthSegments) {
    innerObject = innerObject[segment];
  }
  const lastSegment = segments.at(-1);
  assert(!!lastSegment);

  // @ts-ignore
  innerObject[lastSegment] = value;
};
/**
 * get first Key By value
 * @param object
 * @param value
 * @returns
 */

export const getKeyByValue = <T extends PlainObject, V = GetValue<T>>(object: T, value: V) => {
  return Object.keys(object).find(key => object[key] === value);
};
