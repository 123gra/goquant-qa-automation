import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('TC_A11Y_001: home page accessibility scan summary', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();
  console.log('Accessibility violations:', results.violations);

  expect(results.violations.length).toBeGreaterThan(0);

  const critical = results.violations.filter(v => v.impact === 'critical');
  console.log('Critical violations:', critical.length);
});
