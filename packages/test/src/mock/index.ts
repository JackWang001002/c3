import { clamp, rand } from '@c3/utils';
import { getRandomText, getRandomWord, getRandomWords } from './text';
import { getRandomUser } from './user';
import _ from 'lodash';
import React from 'react';
let gid = 0;

export const mock = {
  getRandomPic: (width = 160 * 6, height = 90 * 6) => {
    return `https://picsum.photos/id/${rand(10, 100)}/${width}/${height}.jpg`;
  },
  getRandomText,
  getRandomWord,
  getRandomWords,
  getId: () => `uniq-id-${gid++}`,
  getRandomUser,
  getRandomColor: () => {
    return `hsla(${rand(0, 360, false)},${rand(50, 100)}%,${rand(80, 100)}%,90%)`;
  },
  getRandBox: (width = 'auto', height = 'auto') => {
    return {
      width,
      height,
      background: mock.getRandomColor(),
      p: 4,
    };
  },
  getRandElements: (count = 3) => {
    return _.times(count, i => {
      return React.createElement(
        'div',
        { style: { ...mock.getRandBox() } },
        `item-${i} ${mock.getRandomWords(3)}`
      );
    });
  },
};
