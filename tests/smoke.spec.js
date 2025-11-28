import { test, expect } from '@playwright/test';

test('Smoke Test - Site loads', async ({ page }) => {
  await page.goto('/'); 
  await expect(page).toHaveTitle(/Buggy Cars Rating/i);
});

test('Smoke Test - Home returns 200 (API)', async ({ request, baseURL }) => {
  const res = await request.get(baseURL || 'https://buggy.justtestit.org/');
  expect(res.status()).toBe(200);
});
