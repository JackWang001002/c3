import { test, expect } from '@playwright/experimental-ct-react';
import React, { useState } from 'react';
import Case1 from './Case1';

test('mount ', async ({ page, mount }) => {
  const component = await mount(<Case1 />);
  await component.locator('[data-test-id="inject"]').click();
  await expect(page.locator('#injected-node')).toBeVisible();
});
