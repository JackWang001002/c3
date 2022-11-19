import { test, expect } from '@playwright/experimental-ct-react';
import React, { useState } from 'react';
import App from './Case';
test('mount ', async ({ page, mount }) => {
  const component = await mount(<App />);
  await expect(component.locator('#state')).toHaveText('not-run');
});

test('after click ', async ({ page, mount }) => {
  const component = await mount(<App />);
  await component.locator('button').click();
  await expect(component.locator('#state')).toHaveText('world');
});
