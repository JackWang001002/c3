import _ from 'lodash';

describe('test cases', () => {
  it('test ', () => {
    const from = new Error().stack!.split(/^\s*at\s/m)[2].trim();
    console.log('from', from);
    expect(_.add(1, 1)).toBe(2);
  });

});
