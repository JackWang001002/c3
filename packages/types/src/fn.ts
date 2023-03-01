export type Fn = (...args: any[]) => any;

export type WithoutCallSignature<T extends Fn> = {
  [K in keyof T as Exclude<K, "">]: T[K];
};
