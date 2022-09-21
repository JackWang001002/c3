import { SELECTORS } from './selectors';
import { testWithMetaMask } from './testWithMetaMask';
import { BrowserContext, expect } from '@playwright/test';
import { printPageUrls } from '../utils';

testWithMetaMask('normal websiste ', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

testWithMetaMask('metamask extension id  ', async ({ extensionId }) => {
  expect(extensionId).toBe('nkbihfbeogaeaoehlefnkodbefgpgknn');
});

testWithMetaMask('use metaMaskPage', async ({ metaMaskPage }) => {
  expect(metaMaskPage.url()).toBe(
    'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html?not_popup=1'
  );
  await expect(metaMaskPage.locator('text=Buy')).toBeVisible();
});
testWithMetaMask('load new metamask page', async ({ page, metaMaskPage, context }) => {
  await page.goto('https://dev.overeality.io/web3bridge');

  await page.locator('u-item:has-text("Select a network")').click();
  await page.locator('text=Ethereum Goerli Testnet').click();
  await metaMaskPage.reload();
  await expect(metaMaskPage.locator('text=Next')).toBeVisible();

  await metaMaskPage.locator('text=Next').click();
  await metaMaskPage.locator('button[role="button"]:has-text("Connect")').click();
});

testWithMetaMask('goto metamask', async ({ page, metaMaskPage, context }) => {
  await page.goto('https://dev.overeality.io/web3bridge');

  await page.locator('u-item:has-text("Select a network")').click();
  printPageUrls(context);
  await page.locator('text=Ethereum Goerli Testnet').click();
  printPageUrls(context);

  await metaMaskPage.reload();
  await expect(metaMaskPage.locator(...SELECTORS.nextBtn)).toBeVisible();

  printPageUrls(context);

  await metaMaskPage.locator(...SELECTORS.nextBtn).click();
  await metaMaskPage.locator(...SELECTORS.connectBtn).click();
});
