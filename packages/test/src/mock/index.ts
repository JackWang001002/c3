import { rand } from '@c3/utils';
import _ from 'lodash';
import React from 'react';
import { getRandomText, getRandomWord, getRandomWords } from './text';
import { getRandomUser } from './user';
let gid = 0;

type ImgOptions = {
  width?: number;
  height?: number;
  id?: number;
};
export const mock = {
  getRandomPic: (width = 160 * 6, height = 90 * 6) => {
    return `https://picsum.photos/id/${rand(10, 100)}/${width}/${height}.jpg`;
  },
  getPic({ id = 28, width = 160, height = 90 } = {}) {
    return `https://picsum.photos/id/${id}/${width}/${height}.jpg`;
  },
  getRandomText,
  getRandomWord,
  getRandomWords,
  getId: () => `uniq-id-${gid++}`,
  getRandomUser,
  getRandomColor: () => {
    return `hsla(${rand(0, 360, false)},${rand(50, 100)}%,${rand(40, 80)}%,90%)`;
  },
  getRandBox: ({ width = 'auto', height = 'auto', size = 'normal', ...css } = {}) => {
    return {
      width,
      height,
      background: mock.getRandomColor(),
      fontSize: size === 'normal' ? 16 : rand(14, 60),
      p: 4,
      ...css,
    };
  },
  getRandElements: ({ count = 3, wMin = 1, wMax = 5, size = 'normal' } = {}) => {
    return _.times(count, i => {
      return React.createElement(
        'div',
        { style: { ...mock.getRandBox({ size }) } },
        `i-${i} ${mock.getRandomWords(rand(wMin, wMax))}`
      );
    });
  },
  getList: (count = 10, wMin = 1, wMax = 5, size = 'normal') => {
    return React.createElement('ul', null, mock.getRandElements({ count, wMin, wMax, size }));
  },
};
