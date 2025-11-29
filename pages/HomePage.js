export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async goHomeViaHeader() {
    await this.page.getByRole('link', { name: 'Buggy Rating' }).click();
  }

  async openRegister() {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async openProfile() {
    await this.page.getByRole('link', { name: 'Profile' }).click();
  }

  async logout() {
    await this.page.getByRole('link', { name: /Logout/i }).click();
  }

  async openPopularMakeLamborghini() {
    await this.page.getByRole('link', { name: 'Lamborghini' }).first().click();
  }

  async openModelFromMake(modelName) {
    await this.page
      .locator('table')
      .getByRole('link', { name: modelName, exact: true })
      .first()
      .click();
  }
}
