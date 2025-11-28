export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
      await this.page.getByRole('link', { name: 'Profile' }).click();
  }
}
