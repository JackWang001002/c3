import { Locator, Page } from 'playwright';
type Option = {
  has?: Locator | undefined;
  hasText?: string | RegExp | undefined;
};

export const waitForMetaMask = async (metamaskPage: Page, selector: string, option?: Option) => {
  let isVisible = false;
  while (!isVisible) {
    await metamaskPage.reload({ waitUntil: 'load' }); //FIXME:reload until load seems  didnot take no effects
    await metamaskPage.waitForTimeout(1500);
    isVisible = await metamaskPage.locator(selector, option).isVisible();
  }
  return metamaskPage.locator(selector, option);
};
