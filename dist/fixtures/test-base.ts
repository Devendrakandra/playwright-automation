import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';
import { CartPage } from '@pages/cart.page';
import { CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage } from '@pages/checkout.page';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOne: CheckoutStepOnePage;
  checkoutStepTwo: CheckoutStepTwoPage;
  checkoutComplete: CheckoutCompletePage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutStepOne: async ({ page }, use) => { await use(new CheckoutStepOnePage(page)); },
  checkoutStepTwo: async ({ page }, use) => { await use(new CheckoutStepTwoPage(page)); },
  checkoutComplete: async ({ page }, use) => { await use(new CheckoutCompletePage(page)); }
});

export const expect = base.expect;
