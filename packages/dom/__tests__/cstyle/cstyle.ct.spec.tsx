import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';
import Case from './StyleCase';
test('style.get ', async ({ page, mount }) => {
  await mount(<Case />);
  const bgColor = await page.evaluate(() => {
    const el = document.querySelector('.test');
    return window.__style.get(el!, 'backgroundColor');
  });
  expect(bgColor).toBe('rgb(255, 0, 0)');
});

test('style.set ', async ({ page, mount }) => {
  await mount(<Case />);
  const bgColor = await page.evaluate(() => {
    const el = document.querySelector('.test');
    __style.set(el, 'background-color', 'rgb(0, 255, 0)');
    return __style.get(el, 'backgroundColor');
  });
  expect(bgColor).toBe('rgb(0, 255, 0)');
});
