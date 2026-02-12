import { Page, expect } from '@playwright/test';

export class FlipkartHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.flipkart.com');
    await this.closeLoginPopup();
  }

  async closeLoginPopup() {
    // Flipkart login popup close button (X)
    const closeBtn = this.page.locator('button._2KpZ6l._2doB4z');
    if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await closeBtn.click();
    }
  }

  async searchFor(term: string) {
    // Only select the search box that is not readonly and is visible
    const searchBox = this.page.locator('input[name="q"]').filter({ hasNot: this.page.locator('[readonly]') }).first();
    await expect(searchBox).toBeVisible({ timeout: 5000 });
    await searchBox.fill(term);
    await searchBox.press('Enter');
  }

  async expectResults() {
    // Wait for product listings to appear
    await expect(this.page.locator('div._1YokD2 ._1AtVbE')).toBeVisible({ timeout: 10000 });
  }
}
