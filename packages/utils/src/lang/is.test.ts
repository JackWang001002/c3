import { isDecimal, isInteger } from './is';
describe('is', () => {
  it('isInteger ', () => {
    expect(isInteger(5)).toBe(true);
    expect(isInteger(5.5)).toBe(false);
    expect(isInteger(NaN)).toBe(false);
  });

  //小数
  it('isDecimal', () => {
    expect(isDecimal(4)).toBe(false);
    expect(isDecimal(0.4)).toBe(true);
    expect(isDecimal(Number.MAX_VALUE)).toBe(true);
  });
});
