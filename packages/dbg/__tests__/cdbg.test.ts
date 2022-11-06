import { cdbg } from '../src/dbg';

describe('test cases', () => {
  it('should work ', () => {
    const xdbg = cdbg('@c3/api', 'color:red');
    xdbg('hello');
  });
});
