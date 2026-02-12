import { test, expect } from '@playwright/test';

test.describe('Playwright.dev Advanced Demo', () => {
  test('Docs link is visible and navigates correctly', async ({ page }) => {
    await page.goto('https://playwright.dev');
    // Use getByRole for robust selector
    const docsLink = page.getByRole('link', { name: 'Docs' });
    await expect(docsLink).toBeVisible();
    await docsLink.click();
    // Wait for docs page to load
    await expect(page).toHaveURL(/.*docs/);
    // Use getByRole for a heading to avoid strict mode violation
    await expect(page.getByRole('heading', { name: 'Introduction' })).toBeVisible();
  });

  test('Mock a network request', async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Intercepted!' })
    }));
    await page.goto('https://playwright.dev');
    // This is just a demonstration; you can add assertions for intercepted requests
  });
});
