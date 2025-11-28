import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';

test.describe('Registration', () => {
  test('TC_REG_001: valid user registration', async ({ page }) => {
    const username = `GraceMK_${Date.now()}`;

    const register = new RegisterPage(page);
    await register.goto();
    await register.registerAll(username, 'Grace', 'Kadari', 'graceM@98');

    await expect(page.getByText('Register with Buggy Cars Rating')).toBeVisible();

     await expect(page.getByText('Registration is successful')).toBeVisible();
  });

  test('TC_REG_002: missing mandatory fields shows validation', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();

    await register.firstName.fill('Grace');
    await register.lastName.fill('Kadari');
    await register.password.fill('graceM@98');
    await register.confirmPassword.fill('graceM@98');

    await expect(register.registerButton).toBeDisabled();

    const msg = await register.login.evaluate(el => el.validationMessage);
    expect(msg).not.toBe('');
  });
});
