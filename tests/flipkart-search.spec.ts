import { test } from '@playwright/test';
import { FlipkartHomePage } from '../pages/FlipkartHomePage';

test.describe('Flipkart Search', () => {
  test('Search for mobiles and see results', async ({ page }) => {
    const flipkart = new FlipkartHomePage(page);
    await flipkart.goto();
    await flipkart.searchFor('mobiles');
    await flipkart.expectResults();
  });
});
