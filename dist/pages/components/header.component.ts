import { Page, Locator, expect } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly cart: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart = page.locator('#shopping_cart_container a');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetLink = page.locator('#reset_sidebar_link');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetLink.click();
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async goToCart() {
    await this.cart.click();
  }
}
