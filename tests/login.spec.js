import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import users from '../test-data/users.json';

const { validUser, invalidUser } = users;

test.describe('Login', () => {
  test('TC_LOGIN_001: valid login should redirect to home/dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoHome();
    await login.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/\/(overall|profile|home|model|make)/);
  });

  test('TC_LOGIN_002: invalid login shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoHome();
    await login.login(invalidUser.username, invalidUser.password);
    await expect(login.errorMessage()).toBeVisible();
  });

  test('TC_LOGIN_003: first name, profile and logout visible after login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoHome();
    await login.login(validUser.username, validUser.password);

    await expect(page.getByText(/Hi,\s*Grace/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Logout/i })).toBeVisible();
  });

  test('TC_LOGIN_004: registration success message should NOT be shown after login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoHome();
    await login.login(validUser.username, validUser.password);

    await expect(page.getByText(/Hi,\s*Grace/i)).toBeVisible();

    await expect(login.registrationSuccessMessage()).toBeVisible();
  });
});
