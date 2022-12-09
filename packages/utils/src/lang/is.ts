import { Fn } from '@c3/types';

//=====================================================================================================
// primitive types
//=====================================================================================================
export const isString = (x: unknown): x is string => typeof x === 'string';
export const isNumber = (x: unknown): x is number => typeof x === 'number';
export const isSymbol = (x: unknown): x is symbol => typeof x === 'symbol';
export const isBoolean = (x: unknown): x is boolean => typeof x === 'boolean';
export const isBigint = (x: unknown): x is bigint => typeof x === 'bigint';
export const isNull = (x: unknown): x is null => x === null;
export const isUndefined = (x: unknown): x is undefined => x === undefined;
export const isNullish = (x: unknown): x is undefined | null => x === undefined || x === null;
export const isNil = isNullish;
export const isPrimitive = (x: unknown) =>
  isNullish(x) || isString(x) || isSymbol(x) || isBoolean(x) || isBigint(x) || isNumber(x);
export const isDecimal = (x: unknown) => isNumber(x) && parseInt(`${x}`, 10) !== x;
export const isInteger = (x: unknown) => isNumber(x) && parseInt(`${x}`, 10) === x;

//=====================================================================================================
// object types
//=====================================================================================================
export const isFunction = (x: unknown): x is Fn => typeof x === 'function';
export const isArray = (x: unknown): x is Array<unknown> => Array.isArray(x);
export const isObject = (x: unknown): x is object => {
  const type = typeof x;
  return (type === 'object' || type === 'function') && x !== null;
};
export const isPlainObject = (x: unknown): x is object =>
  isObject(x) &&
  (Object.getPrototypeOf(x) === null || Object.getPrototypeOf(x) === Object.prototype);

//=====================================================================================================
// isFalsy/isTruthy/isEmpty
//=====================================================================================================
export const isFalsy = (x: unknown) => !x;
export const isTruthy = (x: unknown) => !!x;
export const isEmpty = (data: unknown) => {
  if (isArray(data) || isString(data)) {
    return data.length === 0;
  }
  if (isPlainObject(data)) {
    return Object.keys(data).length === 0;
  }
  return isFalsy(data); //undefined/null is falsy
};

export const isNumLike = (a: string | number): boolean => !Number.isNaN(+a);
