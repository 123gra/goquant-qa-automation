import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,

  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results.xml' }],
  ],

  use: {
    baseURL: 'https://buggy.justtestit.org',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        headless: true,
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: true,
      },
    },
    {
      name: 'webkit', 
      use: {
        ...devices['Desktop Safari'],
        headless: true,
      },
    },
  ],
});
