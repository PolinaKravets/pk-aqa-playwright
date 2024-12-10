import { test as base } from '@playwright/test';
import AuthPage from '../PageObjects/AuthPage';
import GaragePage from '../PageObjects/GaragePage';


export const test = base.extend({
  /**
   * @type {import('../PageObjects/GaragePage').GaragePage}
   */
  garagePage: async ({ page, context }, use) => {
    const garagePage = new GaragePage(page, context);
    const authPage = new AuthPage(page, context);
    await authPage.navigateToMainPageWithAuth();
    await page.waitForTimeout(2000);
    await page.goto('/panel/garage');
    await garagePage.addCar('Ford','Focus','235');
    await use(garagePage);
    await garagePage.page.goto('panel/garage'); 
    await page.waitForTimeout(2000);
    await garagePage.deleteCar();
    
  }
});

