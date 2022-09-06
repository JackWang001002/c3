import { testWithMeamask } from './testWithMetamask';
import { expect } from '@playwright/test';

testWithMeamask('normal websiste ', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

testWithMeamask('metamask extension id  ', async ({ extensionId }) => {
  expect(extensionId).toBe('nkbihfbeogaeaoehlefnkodbefgpgknn');
});

testWithMeamask('use metaMaskPage', async ({ metaMaskPage, page }) => {
  expect(metaMaskPage.url()).toBe(
    'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html?not_popup=1'
  );
  await expect(metaMaskPage.locator('text=Buy')).toBeVisible();
});

testWithMeamask('goto metamask', async ({ page, metaMaskPage }) => {
  await page.goto('https://dev.overeality.io/web3bridge');

  await page.locator('u-item:has-text("Select a network")').click();
  await page.locator('text=Ethereum Goerli Testnet').click();
  await metaMaskPage.reload();
  await expect(metaMaskPage.locator('text=Next')).toBeVisible();
  await metaMaskPage.locator('text=Next').click();
  await metaMaskPage.locator('button[role="button"]:has-text("Connect")').click();
});
