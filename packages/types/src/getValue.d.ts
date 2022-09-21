import { IndexedType } from './types';

export type GetValue<T> = T extends { [key: string]: infer V } ? V : unknown;
// export type GetValueByKey<T extends IndexedType, Key> = T extends { [key: string]: infer V } ? V[Key] : unknown;
