import AuthPage from "./AuthPage";

export default class RegisterPage extends AuthPage {

  constructor(page, context) {
    super(page, context);
    

    this.selectors = {
      homeButton: this.page.locator("a.btn.header-link"),
      signUpButton:this.page.locator('button', { hasText: 'Sign up' }),
      signUpPopup: this.page.locator("div[class='modal-content']"),
      signUpMainTitle: this.page.locator('.modal-title'),
      signUpClose: this.page.locator("button[class='close']"),
      signUpRegisterButton: this.page.locator("button[class='btn btn-primary']"),
      signUpNameTitle: this.page.locator("input[id ='signupName'] ~ label"),
      signUpLastNameTitle: this.page.locator("input[id ='signupLastName']~ label"),
      signUpEmailTitle: this.page.locator("input[id ='signupEmail'] ~ label"),
      signUpPasswordTitle: this.page.locator("input[id ='signupPassword'] ~ label"),
      signUpRepPasswordTitle: this.page.locator("input[id ='signupRepeatPassword']~ label"),
      signUpNameField:this.page.locator("input[id ='signupName']"),
      signUpLastNameField: this.page.locator("input[id ='signupLastName']"),
      signUpEmailField: this.page.locator("input[id ='signupEmail']"),
      signUpPasswordField: this.page.locator("input[id ='signupPassword']"),
      signUpRepPasswordField: this.page.locator("input[id ='signupRepeatPassword']"),
      signUpNameValidation: this.page.locator('.form-group input[formcontrolname="name"] + .invalid-feedback p'),
      signUpLastNameValidation: this.page.locator('.form-group input[formcontrolname="lastName"] + .invalid-feedback p'),
      signUpEmailValidation: this.page.locator('.form-group input[formcontrolname="email"] + .invalid-feedback p'),
      signUpPasswordValidation: this.page.locator('.form-group input[formcontrolname="password"] + .invalid-feedback p'),
      signUpRepPasswordValidation: this.page.locator('.form-group input[formcontrolname="repeatPassword"] + .invalid-feedback p'),
      logOutButton: this.page.locator('a', { hasText: 'Log out' }),
      signUpError: this.page.locator('p.alert.alert-danger')
    }
  };
  async openRegPopup(){
    await this.selectors.signUpButton.click();
  }
  async enterRegData(name,lastname,email, password,reppassword){
    await this.selectors.signUpNameField.type(name);
    await this.selectors.signUpLastNameField.type(lastname);
    await this.selectors.signUpEmailField.type(email);
    await this.selectors.signUpPasswordField.type(password);
    await this.selectors.signUpRepPasswordField.type(reppassword);
        
  }
    

}
  