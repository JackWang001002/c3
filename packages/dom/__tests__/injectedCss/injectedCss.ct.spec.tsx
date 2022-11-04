import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';
import Case from './InjectedCase';
test('mount ', async ({ page, mount }) => {
  const component = await mount(<Case />);
  await expect(component).toContainText('hello');
  await expect(component).toHaveCSS('background-color', 'rgb(255, 0, 0)');
});
