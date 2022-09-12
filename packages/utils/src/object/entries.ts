import { IndexedType } from '@c3/types';

export const entries = <T extends IndexedType<any>>(obj: T): [keyof T, T[keyof T]][] =>
  Object.entries(obj);
