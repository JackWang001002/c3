import { clamp } from '../clamp';

describe('test cases', () => {
  it('clamp ', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(5, 6, 10)).toBe(6);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
