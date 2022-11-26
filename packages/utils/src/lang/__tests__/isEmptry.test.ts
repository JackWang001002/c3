import { isEmpty } from '../is';

describe('test cases', () => {
  it('emptry object/array', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
  });
  it('special case', () => {
    expect(isEmpty(' ')).toBe(false); //whitespace is NOT EMPTY
    expect(isEmpty(0)).toBe(true); //ok?
    expect(isEmpty(NaN)).toBe(true); //OK?
  });
});
