import { Merge } from "./merge";

export type PartialByKey<O extends object, K extends keyof O> = Merge<
  {
    [key in K]?: O[key];
  },
  {
    [key in Exclude<keyof O, K>]: O[key];
  }
>;
