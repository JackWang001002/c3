import { expect, test } from '@playwright/experimental-ct-react';
import Case1 from './Case1';
test('mount ', async ({ page, mount }) => {
  const component = await mount(<Case1 />);
  await expect(component.locator('data-test-id=prev')).toContainText('');
  await expect(component.locator('data-test-id=current')).toContainText('1');
  await component.locator('data-test-id=click').click();
  await expect(component.locator('data-test-id=prev')).toContainText('1');
  await expect(component.locator('data-test-id=current')).toContainText('2');
});
