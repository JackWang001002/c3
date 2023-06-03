export type Fn = (...args: unknown[]) => unknown;

export type WithoutCallSignature<T extends Fn> = {
  [K in keyof T as Exclude<K, "">]: T[K];
};
