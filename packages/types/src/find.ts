import type { Equal } from '@type-challenges/utils';
import { IndexedType } from './types';

// eslint-disable-next-line max-len
export type Find<K extends keyof IndexedType, V, Tuple extends IndexedType[]> =
//@ts-ignore
Tuple extends readonly [infer First, ...infer rest] ? Equal<First[K], V> extends true ? First : Find<K, V, rest> : never;

