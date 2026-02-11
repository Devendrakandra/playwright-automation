import { test, expect } from '@playwright/test';

test.describe('Sauce Demo login', () => {
  test.use({ baseURL: 'https://www.saucedemo.com' });

  test('valid login navigates to inventory', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('invalid login shows error', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText(/Epic sadface|Username and password/i);
  });
});