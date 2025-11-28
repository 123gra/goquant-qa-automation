export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[placeholder="Login"]');
    this.password = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async gotoHome() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  errorMessage() {
    return this.page.getByText(/Invalid username\/password/i);
  }

  registrationSuccessMessage() {
    return this.page.getByText('Registration is successful', { exact: true });
  }
}
