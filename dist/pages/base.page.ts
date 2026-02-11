import { Page, expect, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async assertTitleContains(text: string | RegExp) {
    await expect(this.page).toHaveTitle(text);
  }

  async byTest(id: string): Promise<Locator> {
    return this.page.locator(`[data-test="${id}"]`);
  }
}
