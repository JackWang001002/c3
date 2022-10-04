import { test, expect } from '@playwright/experimental-ct-react';
import React, { useState } from 'react';
import App from './App';
test('mount ', async ({ page, mount }) => {
  const component = await mount(<App />);
  await expect(component).toHaveText('0');
});

// test('after click ', async ({ page, mount }) => {
//   // const component = await mount(<App />);
//   // await component.click();
//   // await expect(component).toHaveText('1');
// });
