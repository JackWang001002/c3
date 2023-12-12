
export type Require<O extends object, K extends keyof O> = {
  [key in Exclude<keyof O, K>]: O[key];
} & {
  [key in K]-?: O[key];
};
