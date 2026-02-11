"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Search Amazon then search Mobiles', () => {
    // Force Chrome Stable for this test run
    test_1.test.use({ channel: 'chrome' });
    (0, test_1.test)('Google → Amazon → search "mobiles"', async ({ page }) => {
        // 1) Go to Google
        await page.goto('https://www.google.com/');
        // -- Handle Google consent (varies by region) --
        const consentButton = page.getByRole('button', { name: /I agree|Accept all|Accept/i });
        if (await consentButton.isVisible().catch(() => false)) {
            await consentButton.click();
        }
        // 2) Search for "amazon"
        const searchBox = page.getByRole('combobox', { name: /search/i }).or(page.locator('textarea[name="q"], input[name="q"]'));
        await searchBox.fill('amazon');
        await page.keyboard.press('Enter');
        // Wait for results
        await (0, test_1.expect)(page).toHaveURL(/search/);
        await (0, test_1.expect)(page.locator('#search')).toBeVisible();
        // 3) Click first Amazon result (amazon.* domain)
        // Prefer a result whose link contains "amazon."
        const amazonLink = page.locator('a[href*="amazon."]').first();
        await (0, test_1.expect)(amazonLink, 'Amazon search result should be visible').toBeVisible();
        await amazonLink.click();
        // 4) On Amazon, handle possible region/cookie dialogs
        await page.waitForLoadState('domcontentloaded');
        // Dismiss common popups if they show up (best-effort)
        const dismissSelectors = [
            '#sp-cc-accept', // EU cookie accept
            'input[name="glowDoneButton"]', // location done
            'button[aria-label*="Close"]',
            'input#nav-global-location-popover-link' // open location (if needed)
        ];
        for (const sel of dismissSelectors) {
            const el = page.locator(sel);
            if (await el.isVisible().catch(() => false)) {
                await el.click({ trial: false }).catch(() => { });
            }
        }
        // Ensure we are on an Amazon domain
        await (0, test_1.expect)(page).toHaveURL(/amazon\./);
        // 5) Search for "mobiles" in Amazon’s search bar
        const amazonSearch = page.locator('#twotabsearchtextbox');
        await (0, test_1.expect)(amazonSearch).toBeVisible({ timeout: 10000 });
        await amazonSearch.fill('mobiles');
        await page.keyboard.press('Enter');
        // 6) Assert results page
        await (0, test_1.expect)(page).toHaveURL(/s\?.*k=mobiles/i);
        const resultsHeading = page.getByRole('heading', { name: /results/i }).first()
            .or(page.locator('span.a-color-state'));
        await (0, test_1.expect)(resultsHeading, 'Results heading or query tag should be visible').toBeVisible();
        // Optional: Assert at least one product result exists
        const firstResult = page.locator('[data-component-type="s-search-result"]').first();
        await (0, test_1.expect)(firstResult).toBeVisible();
    });
});
//# sourceMappingURL=google-amazon-mobiles.spec.js.map