import { Merge } from "./merge";

export type Require<O extends object, K extends keyof O> = Merge<
  {
    [key in Exclude<keyof O, K>]: O[key];
  },
  {
    [key in K]-?: O[key];
  }
>;

