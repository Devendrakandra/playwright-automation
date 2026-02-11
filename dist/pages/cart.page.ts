import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { Header } from './components/header.component';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly items: Locator;
  readonly checkoutBtn: Locator;
  readonly header: Header;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title', { hasText: 'Your Cart' });
    this.items = page.locator('.cart_item');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.header = new Header(page);
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }

  async expectItemPresent(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}
