"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('homepage has title and Get started link', async ({ page }) => {
    await page.goto('/'); // uses baseURL from config
    await (0, test_1.expect)(page).toHaveTitle(/Playwright/);
    const getStarted = page.getByRole('link', { name: 'Get started' });
    await (0, test_1.expect)(getStarted).toBeVisible();
    await getStarted.click();
    await (0, test_1.expect)(page).toHaveURL(/.*docs/);
});
//# sourceMappingURL=example.spec.js.map