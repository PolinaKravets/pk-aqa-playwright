import { test as setup, expect } from '@playwright/test';
import AuthPage from "../../PageObjects/AuthPage";
import LoginPage from '../../PageObjects/LoginPage';


const email = process.env.USER_EMAIL;
const pwd = process.env.USER_PASSWORD;

setup('Login to app', async({ browser }) => {
        
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const authPage = new AuthPage(page, context);
  const logPage = new LoginPage(page, context);
  

  await authPage.navigateToMainPageWithAuth();

  await page.locator('button.btn.btn-primary').waitFor({ state: 'visible' });
  
  await logPage.selectors.signInButton.click();
  await logPage.loginUser(email, pwd);
  
  // eslint-disable-next-line playwright/no-standalone-expect
  await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();

  await page.context().storageState({ path: 'session-storage.json' });
})