import type { Page } from 'playwright';
export const signinWallet = async (page: Page) => {
  await page.goto(
    'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/welcome'
  );

  // Click text=Get Started
  await page.locator('text=Get Started').click();
  await page.waitForURL(
    'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/select-action'
  );

  // Click text=Import wallet
  await page.locator('text=Import wallet').click();
  await page.waitForURL(
    'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/metametrics-opt-in'
  );

  // Click [data-testid="page-container-footer-next"]
  await page.locator('[data-testid="page-container-footer-next"]').click();
  await page.waitForURL(
    // eslint-disable-next-line max-len
    'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/create-password/import-with-seed-phrase'
  );
  await page.locator('select').selectOption('24');

  const pwdstring =
    // eslint-disable-next-line max-len
    'hockey   dilemma   magic   rigid   blade   crawl   soldier   screen   mind   siege   disorder   hint   ramp   solid   flat   caution   swamp   anger   attend   trim   tell   obscure   rice   math';
  const pwds = pwdstring.split(/\s+/);
  for (const [idx, pwd] of Object.entries(pwds)) {
    const ele = page.locator(`[data-testid="import-srp__srp-word-${idx}"]`);
    await ele.click();
    await ele.fill(pwd);
  }

  await page.locator('text=I have read and agree to the Terms of Use').click();
  await page.locator('#password').click();
  await page.locator('#password').fill('Over123456');
  await page.locator('#confirm-password').click();
  await page.locator('#confirm-password').fill('Over123456');
  await page.locator('button:has-text("Import")').click();
  await page.waitForURL(
    'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/end-of-flow'
  );
  await page.locator('text=All Done').click();
  await page.locator('.popover-header__title button').click();
};
