import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [['html']],

  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json'
    },
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true
  }
});