import { Arr } from '../array';
describe('test cases', () => {
  it('should work ', () => {
    expect(Arr.from([1, 2, 3]).length).toBe(3);
  });
  it('instanceof is  Arr ', () => {
    const arr = Arr.from([1, 2, 5]) as Arr<number>;
    expect(arr instanceof Arr).toBe(true);
    expect(arr.last()).toBe(5);
  });
  it('remove falsy values', () => {
    const arr = Arr.from([1, 2, 0, false, null, undefined, '']) as Arr<number>;
    expect(arr.truthy()).toEqual([1, 2]);
  });
  it('remove nil valeus', () => {
    const arr = Arr.from([1, 2, 0, false, null, undefined, '']) as Arr<number>;
    expect(arr.removeNil()).toEqual([1, 2, 0, false, '']);
  });
  // it('toArray convert to Array', () => {
  //   const arr = Arr.from([1, 2, 3]) as Arr<number>;
  //   expect(arr.toArray()).toEqual([1, 2, 0, false, '']);
  // });
});
