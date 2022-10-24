// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000/app/',
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
  // use: {
  //   baseURL: 'http://localhost:3000/app/',
  // },
  timeout: 0,
  globalTimeout: 0,
  use: {
    trace: 'on',
  },
};
export default config;
