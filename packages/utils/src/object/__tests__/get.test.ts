import { set } from '../get';
describe('test cases', () => {
  it('should work ', () => {
    const o = { a: { b: 2 } };
    set(o, 'a.b', 3);
    expect(o['a']['b']).toBe(3);
  });
});
