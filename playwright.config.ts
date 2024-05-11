import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// почти ничего не менял, так как не вижу смысла - в зависимости от проекта и требований работаем с ожиданиями, потоками, подключаем репортер, выбираем браузеры и так далее
dotenv.config({
  path: './helper/env/.env.dev', // config file
  override: true,
});


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 100000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 1,
  reporter: 'html',
  globalSetup: 'src/utils/globalSetup.ts',
  globalTeardown: 'src/utils/globalTeardown.ts',
  use: {
    testIdAttribute: 'data-test-id',
    trace: 'on-first-retry',
    headless: false,
    launchOptions: {
      args: ["--start-fullscreen"],
      slowMo: 3000, // предпочитаю использовать достаточно большое слоу-мо, но будет работать и на двух секундах
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
