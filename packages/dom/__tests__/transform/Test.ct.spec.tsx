import { test, expect } from '@playwright/experimental-ct-react';
import React, { useState } from 'react';
import Case from './Case';

test('mount ', async ({ page, mount }) => {
  await mount(<Case />);
  const result = await page.evaluate(() => {
    const el = document.querySelector('#test');
    return __splitElementTransform(el);
  });

  expect(result).toEqual({
    translateX: 150, // 150=100*1.5
    translateY: 30, //30=20*1.5
    scaleX: 1.5,
    scaleY: 1.5,
    shear: 0,
    rotate: 0,
    originX: 0,
    originY: 0,
  });
});
