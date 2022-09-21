import { BrowserContext, Page, test as base } from '@playwright/test';
import path from 'node:path';
import { chromium } from 'playwright';
import { signinWallet } from './signin';

export const testWithMetaMask = base.extend<{
  context: BrowserContext;
  extensionId: string;
  metaMaskPage: Page;
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, './extension');
    const context = await chromium.launchPersistentContext('', {
      devtools: false,
      headless: false,
      timeout: 0,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    // const nc = await context.browser()?.newContext({ storageState: 'state.json' })!;
    await use(context);
    await context.close();
  },
  metaMaskPage: async ({ context, extensionId }, use) => {
    const extensionURL = `chrome-extension://${extensionId}/popup.html`;

    const pages = context.pages();
    const page = pages.length > 0 ? pages[0] : await context.newPage();
    await signinWallet(page);

    await page.goto(extensionURL);
    for (const p of context.pages()) {
      if (p.url().includes('home.html#initialize/welcome')) {
        await p.close();
      }
    }
    await use(page);
    // await page.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.backgroundPages();
    if (!background) {
      background = await context.waitForEvent('backgroundpage');
    }

    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  },
});
