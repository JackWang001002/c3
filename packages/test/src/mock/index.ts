import { rand } from '@c3/utils';
import { getRandomText, getRandomWord } from './text';
import { getRandomUser } from './user';
let gid = 0;

export const mock = {
  getRandomPic: (width = 160 * 6, height = 90 * 6) => {
    return `https://picsum.photos/id/${rand(10, 100)}/${width}/${height}.jpg`;
  },
  getRandomText,
  getRandomWord,
  getId: () => `uniq-id-${gid++}`,
  getRandomUser,
  getRandomColor: () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  },
};
