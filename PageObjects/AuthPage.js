
class AuthPage {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').Context} context
   */

  constructor(page) {
    this.page = page;
        
  }

  async navigateToMainPageWithAuth(credentials = { username: "guest", password: "welcome2qauto" }) {
    // Используем встроенную аутентификацию Playwright
    //const context = await this.page.context();
    await this.page.context().setExtraHTTPHeaders({
      Authorization: 'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64'),
    });

    await this.page.goto('/');
  }
}

export default AuthPage;