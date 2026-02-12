import { test } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage';

// This test uses the Page Object Model for Google's homepage

test('Google homepage snapshot', async ({ page }) => {
  const google = new GoogleHomePage(page);
  await google.goto();
  await google.takeFullPageScreenshot('test-results/google-homepage-snapshot.png');
  await google.expectTitle();
});
