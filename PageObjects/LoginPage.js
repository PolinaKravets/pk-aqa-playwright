import AuthPage from "./AuthPage";

export default class LoginPage extends AuthPage {

  constructor(page, context) {
    super(page, context);
    
    this.selectors = {
      signInButton: this.page.locator("button.btn.btn-outline-white.header_signin"),
      signInEmailField: this.page.locator('input[formcontrolname="email"]'),
      signInPasswordField: this.page.locator('input[formcontrolname="password"]'),
      signInloginButton: this.page.locator('button[class="btn btn-primary"]')

    };
  };
  async loginUser (email, password) {
    await this.selectors.signInEmailField.fill(email);
    await this.selectors.signInPasswordField.fill(password);
    await this.selectors.signInloginButton.click();

  };
};

    
