
import { test } from "../fixtures/garage.fixtures";
import { expect } from "@playwright/test";
import AuthPage from '../PageObjects/AuthPage';

test('Change user after login', { tag: '@auth' }, async ({  page }) => {
  const authPage = new AuthPage(page);
  await authPage.navigateToMainPageWithAuth();
  await page.waitForTimeout(2000);
  await page.route('**/api/users/profile', async (route) => {
    const response = await route.fetch();
    let json = await response.json();
    json.data = {
      "userId": 159303,
      "photoFilename": "default-user.png",
      "name": "AQA",
      "lastName": "TEST"
    };
    await route.fulfill({
      response,
      json
    });
  });
  await page.goto('/panel/profile')
  const profileUser = page.locator('text=AQA TEST');
  await expect(profileUser).toBeVisible();
  
  
});