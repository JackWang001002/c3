import { BrowserContext, test as base } from '@playwright/test';
import path from 'path';
import { chromium } from 'playwright';

export const testWithMeamask = base.extend<{
  context: BrowserContext;
  extensionId: string;
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
  extensionId: async ({ context }, use) => {
    // for manifest v2:
    let [background] = context.backgroundPages();
    if (!background) background = await context.waitForEvent('backgroundpage');

    // for manifest v3:
    // let [background] = context.serviceWorkers();
    // if (!background) background = await context.waitForEvent('serviceworker');

    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  },
});
