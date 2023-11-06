import _ from "lodash";
import { isPrimitive, isString } from "../lang";

//immutable array
export class Arr<T> extends Array {
  /**
   * NOTE: standfunction `Array.fill` will share the same reference of `value` variable
   * create a new array with value repeated n times
   * @param n : capacity of the array
   * @param value
   * @returns: this
   */
  static fill<U>(n: number, value: U) {
    if (isPrimitive(value)) {
      return Arr.from(Array(n).fill(value));
    }
    return Arr.from(_.times(n, () => _.cloneDeep(value)));
  }

  normalize(): Arr<T> {
    const x = this.map(e => {
      if (isString(e)) {
        return e.trim();
      }
      if (e === 0) {
        return e;
      }
    }) as Arr<T>;
    return x.truthy();
  }
  /**
   * remove falsy values(0, false, null, undefined, '',NaN)
   * @returns
   */
  truthy() {
    return this.filter(e => !!e) as Arr<T>;
  }
  removeNil(): Arr<T> {
    return this.remove(null, undefined);
  }

  /**
   * get the last item
   * @returns undefined if empty
   */
  last(): T | undefined {
    return this.at(-1);
  }

  first(): T | undefined {
    return this.at(0);
  }

  remove(...args: unknown[]): Arr<T> {
    const newArr = new Arr<T>();
    for (const item of this) {
      if (!args.includes(item)) {
        newArr.push(item);
      }
    }
    return newArr;
  }
}
