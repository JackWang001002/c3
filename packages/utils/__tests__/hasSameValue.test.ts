import { hasSameValue } from '../src';

describe('test cases', () => {
  it('should work ', () => {
    expect(hasSameValue([1, 1, 1])).toBe(true);
    expect(hasSameValue([1, 2, 3])).toBe(false);
  });
});
