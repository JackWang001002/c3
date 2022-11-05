import { set } from '../..';

describe('test cases', () => {
  it('should work ', () => {
    const obj = { a: { b: 1 } };
    set(obj, 'a.b', 2);
    expect(obj).toEqual({ a: { b: 2 } });
  });
});
