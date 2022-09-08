import { Page } from 'playwright';
import { SELECTORS } from './selectors';
import { waitForMetaMask } from './waitForMetaMask';

export class Metamask {
  constructor(private metaMaskPage: Page) {}
  async connect2Wallet() {
    await waitForMetaMask(this.metaMaskPage, ...SELECTORS.nextBtn);
    await this.metaMaskPage.locator(...SELECTORS.nextBtn).click();
    await this.metaMaskPage.locator(...SELECTORS.connectBtn).click();
  }
  async addAndSwitchNetwork() {
    await waitForMetaMask(this.metaMaskPage, ...SELECTORS.approveAddNetworkBtn);
    await this.metaMaskPage.locator(...SELECTORS.approveAddNetworkBtn).click();
    await this.metaMaskPage.locator(...SELECTORS.switchNetworkBtn).click();
  }
  async confirmTx() {
    await waitForMetaMask(this.metaMaskPage, ...SELECTORS.confirmFeeEtcBtn);
    await this.metaMaskPage.locator(...SELECTORS.confirmFeeEtcBtn).click();
  }
}
