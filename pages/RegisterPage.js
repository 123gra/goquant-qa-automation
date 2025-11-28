export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.login = page.getByLabel('Login');
    this.firstName = page.getByLabel('First Name');
    this.lastName = page.getByLabel('Last Name');

    this.password = page.locator('input#password[name="password"]');
    this.confirmPassword = page.locator('input#confirmPassword[name="confirmPassword"]');

    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.cancelLink = page.getByRole('button', { name: 'Cancel' });
  }

  async goto() {
    await this.page.goto('https://buggy.justtestit.org');
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async registerAll(login, first, last, pwd) {
    await this.login.fill(login);
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.password.fill(pwd);
    await this.confirmPassword.fill(pwd);
    await this.registerButton.click();
  }

  successMessage() {
    return this.page.getByText(/Registration succeeded|successful/i);
  }

  validationMessages() {
    return this.page.locator('.help-block, .validation-error');
  }
}
