import { testWithMeamask } from '../src/playwright/metamask/testWithMetamask';
import { expect } from '@playwright/test';
import { signinWallet } from '../src/playwright';
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

testWithMeamask('goto metamask', async ({ page, extensionId }) => {
  await signinWallet(page);
  await page.goto('https://dev.overeality.io/web3bridge')
  await page.goto(
    `chrome-extension://${extensionId}/notification.html#connect/j4XFSm4z-OQpf0IWl32OV`
  );
  await wait(1000000);
});
