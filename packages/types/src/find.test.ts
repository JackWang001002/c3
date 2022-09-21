import { Equal, Expect } from '@type-challenges/utils';
import { Find } from './find';

describe('test cases', () => {
  it('should work ', () => {
    const person = [
      {
        name: 'Jack',
        age: 25,
      },
      {
        name: 'Alice',
        age: 22,
      },
    ] as const;
    type Person = typeof person;
    type Res = Find<'name', 'Jack', Person>;
    type Case = [Expect<Equal<Res['name'], 'Jack'>>, Expect<Equal<Res['age'], 25>>];
  });
});
