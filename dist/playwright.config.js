"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    testDir: './tests',
    timeout: 30000,
    expect: { timeout: 5000 },
    fullyParallel: true,
    reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
    use: {
        baseURL: 'https://playwright.dev',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [
        { name: 'Chromium', use: { ...test_1.devices['Desktop Chrome'] } },
        { name: 'Firefox', use: { ...test_1.devices['Desktop Firefox'] } },
        { name: 'WebKit', use: { ...test_1.devices['Desktop Safari'] } }
    ],
});
//# sourceMappingURL=playwright.config.js.map