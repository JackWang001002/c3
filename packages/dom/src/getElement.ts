import { assert, isString } from '@c3/utils';
import { query } from './query';
import { Selector } from '@c3/types';

export const getElement = <T extends HTMLElement = HTMLElement>(el: Selector | T): T => {
  if (isString(el)) {
    const _el = query<T>(el);
    assert(!!_el, `${el} doesnt exist `);
    return _el;
  }
  return el;
};
