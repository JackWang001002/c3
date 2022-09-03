import { cdbg } from './dbg';

describe('test cases', () => {
  it('should work ', () => {
    expect(0).toBe(0);
    const xdbg = cdbg('@c3/api', 'color:red');
    const foo = () => {
      const res = xdbg('hello');
      res;
    };
    foo();

  });
});
