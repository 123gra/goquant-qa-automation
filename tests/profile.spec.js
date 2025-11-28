import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import users from '../test-data/users.json';

const { validUser } = users;

test.describe('Profile', () => {
  test('TC_PROFILE_001: view and update user profile', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoHome();
    await login.login(validUser.username, validUser.password);

    const profile = new ProfilePage(page);
    await profile.goto();

    await page.locator('.card:has-text("Basic") input').nth(1).fill('GraceUpdated');
    await page.locator('.card:has-text("Basic") input').nth(2).fill('KadariUpdated');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText(/Hi,\s*GraceUpdated/i)).toBeVisible();
  });
});
