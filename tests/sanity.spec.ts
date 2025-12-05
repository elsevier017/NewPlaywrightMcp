import { test, expect } from '@playwright/test';

test('Sanity: Playwright runs a basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
