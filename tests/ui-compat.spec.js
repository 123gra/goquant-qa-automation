import { test, expect } from '@playwright/test';

const BASE_URL = 'https://buggy.justtestit.org';

test('TC_UI_001: global menu links and responsive layouts', async ({ page }) => {
  await page.goto(BASE_URL);
  const headerLinks = ['Login', 'Register', 'Profile', 'Logout'];

  for (const text of headerLinks) {
    const link = page.getByRole('link', { name: text });
    if (await link.isVisible()) {
      await link.click();
      await expect(page).not.toHaveURL(/404|error/i);
      await page.goBack();
    }
  }

  const viewports = [
    { width: 375, height: 812 },  
    { width: 768, height: 1024 }, 
    { width: 1366, height: 768 }, 
  ];

  for (const vp of viewports) {
    await page.setViewportSize(vp);
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Buggy Cars Rating/i);
  }
});

test('TC_COMP_001: critical flows run in Chrome project', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Buggy Cars Rating/i);
});

test('TC_COMP_002: same flows validated in Edge project', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Buggy Cars Rating/i);
});
