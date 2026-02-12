import { Page, expect } from '@playwright/test';

export class GoogleHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://google.com');
    await this.acceptConsentIfVisible();
    await this.closeExtraOverlays();
    await this.waitForSearchBox();
  }

  async acceptConsentIfVisible() {
    // Handles Google's consent pop-up if present
    const consentButton = this.page.locator('button:has-text("I agree")');
    if (await consentButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await consentButton.click();
    }
    // EU/UK variant
    const acceptAll = this.page.locator('button:has-text("Accept all")');
    if (await acceptAll.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptAll.click();
    }
  }

  async closeExtraOverlays() {
    // Example: close language/region pop-ups if present
    const rejectButton = this.page.locator('button:has-text("Reject all")');
    if (await rejectButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await rejectButton.click();
    }
    // Add more overlay handling as needed
  }

  async waitForSearchBox() {
    await this.page.waitForSelector('input[name="q"]', { timeout: 10000 });
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(/Google/);
  }

  async takeFullPageScreenshot(path: string) {
    await this.page.screenshot({ path, fullPage: true });
  }
}
