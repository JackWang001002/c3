import { s } from './toString';

describe('test cases', () => {
  it('should work ', () => {
    expect(s(222)).toBe('222');
    expect(s({})).toBe('[object Object]');
  });
});
