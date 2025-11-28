import { test, expect } from '@playwright/test';

test('Smoke Test - Site loads', async ({ page }) => {

  await page.goto('https://buggy.justtestit.org');
  await expect(page).toHaveTitle(/Buggy Cars Rating/i);
});
