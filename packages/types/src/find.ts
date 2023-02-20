import type { Equal } from '@type-challenges/utils';
import { IndexedType } from './types';

/**
 * find the Item in the Tuple that has the value of V for the key K
 *
 * @todo: assert rest is type of IndexType[]
 */

export type Find<K extends keyof IndexedType, V, Tuple extends IndexedType[]> = Tuple extends [
  infer First,
  ...infer rest
]
  ? Equal<First[K], V> extends true
    ? First
    : Find<K, V, rest>
  : never;
