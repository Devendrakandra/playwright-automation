import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage';

test.describe('Google Homepage Advanced', () => {
  test('Search box is visible', async ({ page }) => {
    const google = new GoogleHomePage(page);
    await google.goto();
    await expect(page.locator('input[name="q"]')).toBeVisible();
  });

  test('Search returns results', async ({ page }) => {
    const google = new GoogleHomePage(page);
    await google.goto();
    const searchBox = page.locator('input[name="q"]');
    await expect(searchBox).toBeVisible();
    await searchBox.fill('Playwright');
    await searchBox.press('Enter');
    await expect(page.locator('#search')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=playwright.dev')).toBeVisible({ timeout: 10000 });
  });

  test('I\'m Feeling Lucky button is present', async ({ page }) => {
    const google = new GoogleHomePage(page);
    await google.goto();
    // Use first() to avoid strict mode violation if multiple elements are found
    await expect(page.locator('input[name="btnI"]').first()).toBeVisible();
  });
});
