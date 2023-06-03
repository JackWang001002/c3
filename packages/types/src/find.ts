import type { Equal } from "@type-challenges/utils";
import { IndexedType } from "./types";

/**
 * find the Item in the Tuple that has the value of V for the key K
 *
 * @todo: assert rest is type of IndexType[]
 */

// export type Find<K extends keyof IndexedType, V, Tuple extends IndexedType[]> = Tuple extends [
//   infer First,
//   ...infer rest
// ]
//   ? //@ts-ignore
//     Equal<First[K], V> extends true
//     ? First
//     : //@ts-ignore
//       Find<K, V, rest>
//   : never;

export type Find<
  K extends string | number | symbol,
  V,
  Tuple extends object[] | readonly object[]
> = Extract<Tuple[number], { [P in K]: V }>;

// type Tuple = [{ id: 1; name: "Alice" }, { id: 2; name: "Bob" }, { id: 3; name: "Charlie" }];

// type Result = Find<"name", "Bob", Tuple>;
