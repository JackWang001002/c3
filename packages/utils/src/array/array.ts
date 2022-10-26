import _ from 'lodash';
import { isPrimitive } from '../lang';

export class Arr<T> extends Array {
  constructor(...args: any[]) {
    super(...args);
  }
  // from
  // static from(...args: any[]) {
  //   return Arr(Array.from(...args));
  // }

  /**
   * NOTE: Array.fill will share the same reference of `value` variable
   * create a new array with value repeated n times
   * @param n : capacity of the array
   * @param value
   * @returns: this
   */
  static fill<T1>(n: number, value: T1) {
    if (isPrimitive(value)) {
      return Arr.from(Array(n).fill(value));
    }
    return Arr.from(_.times(n, () => _.cloneDeep(value)));
  }

  /**
   * check whether contains a sub array
   * @param sub
   * @returns boolean
   */
  contain(sub: T[]) {
    return sub.every(e => this.includes(e));
  }

  /**
   * remove falsy values
   * @returns
   */
  compact() {
    return this.filter(e => !!e);
  }

  /**
   * get the last item
   * @returns undefined if empty
   */
  last() {
    return this[this.length - 1];
  }

  first() {
    return this[0];
  }

  remove(...args: any[]) {
    _.pull(this, ...args);
    return this;
  }
}

export const __a = Arr.from([2]);
// __a('xx'.split(' ')).la;
