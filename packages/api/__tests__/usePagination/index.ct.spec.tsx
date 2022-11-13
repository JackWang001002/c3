import { test, expect } from '@playwright/experimental-ct-react';
import React, { useState } from 'react';
import { Case1 } from './Case1';
test('mount ', async ({ page, mount }) => {
  const component = await mount(<Case1 />);
  await expect(component.locator('data-test-id=total')).toHaveText('100');
  await expect(component.locator('data-test-id=length')).toHaveText('5');
  await component.locator('data-test-id=click-next-page').click();
  await expect(component.locator('data-test-id=total')).toHaveText('100');
  await expect(component.locator('data-test-id=length')).toHaveText('10');
});
