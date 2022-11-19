import { test, expect } from '@playwright/experimental-ct-react';
import React, { useState } from 'react';
import Render2BodyCase from './Render2BodyCase';
test('mount ', async ({ page, mount }) => {
  const component = await mount(<Render2BodyCase />);
  await component.locator('[data-test-id="click"]').click();
  await expect(page.locator('#injected-node')).toBeVisible();
  const ok = await page.evaluate(() => {
    if (document.querySelector('#injected-node')?.parentElement?.parentElement === document.body) {
      return 1;
    }
    return 0;
  });
  expect(ok).toBe(1);
});
