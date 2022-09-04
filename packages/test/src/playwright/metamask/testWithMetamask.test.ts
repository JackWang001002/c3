import { testWithMeamask } from './testWithMetamask';
import { expect } from '@playwright/test';
import { signinWallet } from './signin';
import { wait } from '@c3/utils';

testWithMeamask('normal websiste ', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
testWithMeamask('metamask extension id  ', async ({ page, context, extensionId }) => {
  expect(extensionId).toBe('nkbihfbeogaeaoehlefnkodbefgpgknn');
});

testWithMeamask('import metamask ', async ({ page }) => {
  await signinWallet(page);
});

testWithMeamask('goto metamask', async ({ page, extensionId, context }) => {
  await page.goto('https://dev.overeality.io/web3bridge');
  const metamaskPage = await context.newPage();
  await signinWallet(metamaskPage);

  await page.locator('u-item:has-text("Select a network")').click();
  await page.locator('text=Ethereum Goerli Testnet').click();
  await metamaskPage.goto(`chrome-extension://${extensionId}/notification.html#connect`);
  await wait(2000);
  await expect(metamaskPage.locator('text=Next')).toBeVisible();
  // await metamaskPage.locator('text=Next').click();
  // await wait(100000);
});
