import { isTruthy } from '../is';

describe('test cases', () => {
  it('should work ', () => {
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy(NaN)).toBe(false);
    expect(isTruthy('')).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
    expect(isTruthy(null)).toBe(false);

    expect(isTruthy(1)).toBe(true);
  });
});
