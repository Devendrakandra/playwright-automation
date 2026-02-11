"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Sauce Demo login', () => {
    test_1.test.use({ baseURL: 'https://www.saucedemo.com' });
    (0, test_1.test)('valid login navigates to inventory', async ({ page }) => {
        await page.goto('/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await (0, test_1.expect)(page).toHaveURL(/inventory.html/);
        await (0, test_1.expect)(page.getByText('Products')).toBeVisible();
    });
    (0, test_1.test)('invalid login shows error', async ({ page }) => {
        await page.goto('/');
        await page.locator('#user-name').fill('locked_out_user');
        await page.locator('#password').fill('wrong_password');
        await page.getByRole('button', { name: 'Login' }).click();
        await (0, test_1.expect)(page.locator('[data-test="error"]')).toContainText(/Epic sadface|Username and password/i);
    });
});
//# sourceMappingURL=saucedemo-login.spec.js.map