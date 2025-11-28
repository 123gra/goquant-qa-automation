export class ModelsPage {
  constructor(page) {
    this.page = page;
    this.commentTextArea = page.locator('textarea');
    this.voteButton = page.getByRole('button', { name: /Vote!?/i });
    this.thankYouMessage = page.getByText(/Thank you for your vote/i);
    this.detailCommentsTable = page
      .locator('table')
      .filter({ hasText: 'Date' })
      .first();
  }

  async openMake(makeName) {
    await this.page.getByRole('link', { name: makeName }).click();
    await this.page.locator('table').last().waitFor();
  }

  async openModel(modelName) {
    const modelsTable = this.page.locator('table').last();

    const modelLink = modelsTable
      .getByRole('link', { name: modelName, exact: true })
      .first();

    await modelLink.click();
  }

  async addCommentAndVote(comment) {
    await this.commentTextArea.fill(comment);
    await this.voteButton.click();
  }

  async getVotesBlock() {
    return this.page.locator('text=Votes:').first();
  }

  async getVotesOnMakeList(modelName) {
    const table = this.page.locator('table').last();

    const row = table
      .getByRole('row')
      .filter({
        has: this.page.getByRole('link', { name: modelName, exact: true }),
      })
      .first();

    const cells = row.getByRole('cell');
    const votesCell = cells.nth(2);
    const text = await votesCell.innerText();
    return { votesCell, votes: parseInt(text.replace(/\D/g, ''), 10) || 0 };
  }

  async getDetailCommentsText() {
    const rows = this.detailCommentsTable.locator('tbody').getByRole('row');
    const count = await rows.count();
    const comments = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const commentCell = row.getByRole('cell').last();
      comments.push(await commentCell.innerText());
    }

    return comments.join('\n');
  }
}
