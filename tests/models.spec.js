import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { ModelsPage } from '../pages/ModelsPage.js';
import users from '../test-data/users.json';
import modelData from '../test-data/models.json';

const { validUser } = users;
const { make: MAKE, model: MODEL } = modelData;

test.describe('Model browsing and voting', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.goto();
    await login.login(validUser.username, validUser.password);
  });

  test('TC_MAKE_001: make category navigation', async ({ page }) => {
    const home = new HomePage(page);
    await home.openPopularMakeLamborghini();

    const modelsTable = page
      .locator('table')
      .filter({
        has: page.getByRole('columnheader', { name: 'Model' }),
      })
      .first();

    await expect(modelsTable.getByRole('columnheader', { name: 'Model' })).toBeVisible();
    await expect(modelsTable.getByRole('columnheader', { name: 'Comments' })).toBeVisible();
  });

  test('TC_MOD_001: open Miura model details', async ({ page }) => {
    const home = new HomePage(page);
    const models = new ModelsPage(page);

    await home.openPopularMakeLamborghini();
    await models.openModel(MODEL);

    await expect(page).toHaveURL(/\/model\//);
    await expect(page.getByText(/Miura/i)).toBeVisible();
  });

  test('TC_MOD_002: model details view', async ({ page }) => {
    const home = new HomePage(page);
    const models = new ModelsPage(page);

    await home.openPopularMakeLamborghini();
    await models.openModel(MODEL);

    await expect(models.commentTextArea).toBeVisible();
    await expect(models.voteButton).toBeVisible();

    await expect(
      models.detailCommentsTable.getByRole('columnheader', { name: 'Date' })
    ).toBeVisible();
    await expect(
      models.detailCommentsTable.getByRole('columnheader', { name: 'Author' })
    ).toBeVisible();
    await expect(
      models.detailCommentsTable.getByRole('columnheader', { name: 'Comment' })
    ).toBeVisible();
  });
  
  test('TC_MOD_003: comment field visible', async ({ page }) => {
    const home = new HomePage(page);
    const models = new ModelsPage(page);

    await home.openPopularMakeLamborghini();
    await models.openModel(MODEL);

    await expect(models.commentTextArea).toBeVisible();
  });

  test('TC_MOD_004: vote updates counts and shows thank you', async ({ page }) => {
    const home = new HomePage(page);
    const models = new ModelsPage(page);

    await home.openPopularMakeLamborghini();

    const { votes: listBefore } = await models.getVotesOnMakeList(MODEL);

    await models.openModel(MODEL);

    const thankYouInitially = await models.thankYouMessage.isVisible().catch(() => false);
    if (thankYouInitially) {
      throw new Error('Vote already exists for Miura – cannot validate fresh voting.');
    }

    const votesBlock = await models.getVotesBlock();
    const beforeText = await votesBlock.innerText();
    const detailBefore = parseInt(beforeText.replace(/\D/g, ''), 10) || 0;

    const comment = `Automation vote ${Date.now()}`;
    await models.addCommentAndVote(comment);
    await expect(models.thankYouMessage).toBeVisible();

    const afterText = await votesBlock.innerText();
    const detailAfter = parseInt(afterText.replace(/\D/g, ''), 10) || 0;
    if (detailAfter < detailBefore + 1) {
      throw new Error('Detail vote count did not increase by at least 1 for Miura.');
    }

    await page.goBack();
    const { votes: listAfter } = await models.getVotesOnMakeList(MODEL);
    if (listAfter < listBefore + 1) {
      throw new Error('Make-list vote count did not increase by at least 1 for Miura.');
    }
  });

  test('TC_MOD_005: list shows updated vote count after previous vote', async ({ page }) => {
    const home = new HomePage(page);
    const models = new ModelsPage(page);

    await home.openPopularMakeLamborghini();

    const { votes } = await models.getVotesOnMakeList(MODEL);
    await expect(votes).toBeGreaterThan(0);
  });

  test('TC_MOD_006: no HTML/script tags in comments table (BUG)', async ({ page }) => {
    const home = new HomePage(page);
    const models = new ModelsPage(page);

    await home.openPopularMakeLamborghini();
    await models.openModel(MODEL);

    const payload = '<script>alert("XSS")</script><b>bold</b>';
    await models.addCommentAndVote(payload);

    const commentsText = await models.getDetailCommentsText();

    expect(commentsText).not.toMatch(/<\s*script|<\/\s*script|<\s*[^>]+>/i);
  });
});
