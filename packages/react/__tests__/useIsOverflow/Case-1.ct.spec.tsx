import { expect, test } from '@playwright/experimental-ct-react';
import { Text } from './Case1';

test('mount ', async ({ page, mount }) => {
  const component = await mount(<Text />);
  await expect(component.locator('data-test-id=isOverflow')).toHaveText('true');
  await component.locator('data-test-id=short-btn').click();
  await expect(component.locator('data-test-id=isOverflow')).toHaveText('false');
  await component.locator('data-test-id=long-btn').click();
  await expect(component.locator('data-test-id=isOverflow')).toHaveText('true');
});
