import { test, expect } from '@playwright/test';

test('homepage has title and Get started link', async ({ page }) => {
  await page.goto('/'); // uses baseURL from config
  await expect(page).toHaveTitle(/Playwright/);

  const getStarted = page.getByRole('link', { name: 'Get started' });
  await expect(getStarted).toBeVisible();
  await getStarted.click();

  await expect(page).toHaveURL(/.*docs/);
});