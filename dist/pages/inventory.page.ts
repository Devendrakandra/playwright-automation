import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { Header } from './components/header.component';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly sortSelect: Locator;
  readonly itemCards: Locator;
  readonly header: Header;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title', { hasText: 'Products' });
    this.sortSelect = page.locator('[data-test="product_sort_container"]');
    this.itemCards = page.locator('.inventory_item');
    this.header = new Header(page);
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }

  addToCartButton(name: string) {
    const slug = name.toLowerCase().replaceAll(' ', '-');
    return this.page.locator(`[data-test="add-to-cart-${slug}"]`);
  }

  removeFromCartButton(name: string) {
    const slug = name.toLowerCase().replaceAll(' ', '-');
    return this.page.locator(`[data-test="remove-${slug}"]`);
  }

  async addToCart(name: string) {
    await this.addToCartButton(name).click();
  }

  async removeFromCart(name: string) {
    await this.removeFromCartButton(name).click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect.selectOption(value);
  }

  async getVisibleItemNames(): Promise<string[]> {
    const names = this.page.locator('.inventory_item_name');
    return names.allTextContents();
  }

  async openCart() {
    await this.header.goToCart();
  }
}
