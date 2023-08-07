export type Merge<O1, O2> = {
  [K in keyof O1 | keyof O2]: K extends keyof O2 ? O2[K] : K extends keyof O1 ? O1[K] : never;
};

export type Union<A extends object, B extends object> = {
  [K in keyof (A & B)]: K extends keyof A
    ? A[K] | (K extends keyof B ? B[K] : never)
    : K extends keyof B
    ? B[K]
    : never;
};
