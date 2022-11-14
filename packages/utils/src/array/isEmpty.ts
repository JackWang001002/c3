import { isArray, isString, isPlainObject } from '../lang/is';

//TODO: compare with lodash.isEmpty implementation
// TODO: include undefined/null
export const isEmpty = <T>(data: unknown) => {
  if (isArray(data) || isString(data)) {
    return data.length === 0;
  }
  if (isPlainObject(data)) {
    return Object.keys(data).length === 0;
  }
  return !!data;
};
