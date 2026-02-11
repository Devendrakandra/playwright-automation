import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutStepOnePage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly cancelBtn: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.cancelBtn = page.locator('[data-test="cancel"]');
    this.error = page.locator('[data-test="error"]');
  }

  async fillInfo(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async expectError(text: RegExp | string) {
    await expect(this.error).toContainText(text);
  }
}

export class CheckoutStepTwoPage extends BasePage {
  readonly title: Locator;
  readonly finishBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title', { hasText: 'Checkout: Overview' });
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async finish() {
    await this.finishBtn.click();
  }
}

export class CheckoutCompletePage extends BasePage {
  readonly title: Locator;
  readonly backHome: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title', { hasText: 'Checkout: Complete!' });
    this.backHome = page.locator('[data-test="back-to-products"]');
  }

  async expectCompleted() {
    await expect(this.page.getByText(/thank you for your order/i)).toBeVisible();
  }

  async backToProducts() {
    await this.backHome.click();
  }
}
