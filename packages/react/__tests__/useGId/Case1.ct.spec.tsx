import { expect, test } from '@playwright/experimental-ct-react';
import Case1 from './Case1';
test('mount ', async ({ page, mount }) => {
  const component = await mount(<Case1 />);
  await expect(component).toContainText('guid-1');
});
