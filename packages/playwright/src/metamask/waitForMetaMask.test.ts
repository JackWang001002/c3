import { waitForMetaMask } from './waitForMetaMask';
import { testWithMetaMask } from './testWithMetaMask';
import { printPageUrls } from '../utils';
import { SELECTORS } from './selectors';

testWithMetaMask('load new metamask page', async ({ page, metaMaskPage, context }) => {
  await page.goto('https://dev.overeality.io/web3bridge');
  await page.locator('u-item:has-text("Select a network")').click();
  await page.locator('text=Ethereum Goerli Testnet').click();
  await waitForMetaMask(metaMaskPage, ...SELECTORS.nextBtn);
  await metaMaskPage.locator(...SELECTORS.nextBtn).click();
  await metaMaskPage.locator(...SELECTORS.connectBtn).click();
});
