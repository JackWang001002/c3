import _ from 'lodash';
import { immutableAssign } from '../object/assign';
import { isPrimitive } from '../lang';
import { PlainObject } from '@c3/types';

// NOTE: Array.fill(length,object) will share the object
export const makeArray = <T extends PlainObject>(length: number, value: T): T[] => {
  if (isPrimitive(value)) {
    return Array(length).fill(value);
  }
  return _.times(length, () => immutableAssign(value));
};
