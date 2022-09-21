import { Locator, Page } from 'playwright';
type Option = {
  has?: Locator | undefined;
  hasText?: string | RegExp | undefined;
};

export const waitForMetaMask = async (metamaskPage: Page, selctor: string, option?: Option) => {
  let isVisible = false;
  while (!isVisible) {
    await metamaskPage.reload(); //FIXME:reload until load seems  didnot take no effects
    await metamaskPage.waitForTimeout(1500);
    isVisible = await metamaskPage.locator(selctor, option).isVisible();
  }
  return metamaskPage.locator(selctor, option);
};
