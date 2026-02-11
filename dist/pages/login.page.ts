import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.error = page.locator('[data-test="error"]');
  }

  async open() {
    await this.goto('/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async expectErrorContains(text: RegExp | string) {
    await expect(this.error).toContainText(text);
  }
}
