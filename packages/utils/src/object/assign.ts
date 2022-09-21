import { PlainObject } from '@c3/types';

export const assign = (dest: PlainObject, ...srcs: PlainObject[]) => Object.assign(dest, ...srcs);

export const immutableAssign = (...srcs: PlainObject[]) => Object.assign({}, ...srcs);
