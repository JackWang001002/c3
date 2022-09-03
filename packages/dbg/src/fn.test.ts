import { getFnName } from './fn';
describe('getFnName', () => {
  it('declare a function ', () => {
    function foo() {
      expect(getFnName()).toBe('foo');
    }
    foo();
  });
  it('getFnName ', () => {
    // expect(getFnName()).toBe('Object.<anonymous>');
  });

  it('define function as a variable ', () => {
    const foo = () => {
      expect(getFnName()).toBe('foo');
    };
    foo();
  });
});
