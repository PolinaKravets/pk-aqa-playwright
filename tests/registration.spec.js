import { test, expect } from '@playwright/test';
import AuthPage from '../PageObjects/AuthPage';
import RegisterPage from "../PageObjects/ResistrationPage";

let authPage;
/** @type {RegisterPage} */
let regPage;

function generateEmail(prefix = 'aqa') {
  const timestamp = Date.now(); 
  return `${prefix}-${timestamp}@test.com`;
}

test.describe('Registration validation tests', () => {
  test.beforeEach(async({ page, browser }) => {

    const context = await browser.newContext();
        
    authPage = new AuthPage(page,context);
    regPage = new RegisterPage(page, context);
    await authPage.navigateToMainPageWithAuth();
        
        
  });

    
    

  test('Success registration', async() => {

    const email = generateEmail();
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('Tom','Ford',email, 'Qwerty12#', 'Qwerty12#');
    await expect(regPage.selectors.signUpRegisterButton).toBeEnabled();
    await regPage.selectors.signUpRegisterButton.click();
    await expect(regPage.page).toHaveURL(`/panel/garage`);
  })

  test('Validation empty Name field', async() => {
        
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('','Ford','aqa-tomford4@gmail.com', 'Qwerty12#', 'Qwerty12#');
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpNameValidation).toContainText('Name required');
        
  })
  test('Validation empty Last Name field', async() => {
        
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('Tom','','aqa-tomford4@gmail.com', 'Qwerty12#', 'Qwerty12#');
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpLastNameValidation).toContainText('Last name required');
        
  })
  test('Validation empty Email field', async() => {
        
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('Tom','Ford','', 'Qwerty12#', 'Qwerty12#');
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpEmailValidation).toContainText('Email required');
        
  })
  test('Validation empty Password field', async() => {
        
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('Tom','Ford','aqa-tomford4@gmail.com', '', 'Qwerty12#');
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpPasswordValidation).toContainText('Password required');
        
  })
  test('Validation empty  rep Password field', async() => {
        
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('Tom','Ford','aqa-tomford4@gmail.com', 'Qwerty12#', '');
    await regPage.selectors.signUpRepPasswordField.blur();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpRepPasswordValidation).toContainText('Re-enter password required');
        
  })
  test('Validation  Name field length', async() => {
        
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('a','Ford','aqa-tomford4@gmail.com', 'Qwerty12#', 'Qwerty12#');
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpNameValidation).toContainText('Name has to be from 2 to 20 characters long');
  })
  test('Validation  Last Name field length', async() => {
        
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('Tom','a','aqa-tomford4@gmail.com', 'Qwerty12#', 'Qwerty12#');
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpLastNameValidation).toContainText('Last name has to be from 2 to 20 characters long');
  })
  test('Validation  Password field length', async() => {
        
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('Tom','Ford','aqa-tomford4@gmail.com', 'a', 'Qwerty12#');
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpPasswordValidation).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    
  })
  test('Validation  repeated Password field', async() => {
    
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('Tom','Ford','aqa-tomford4@gmail.com', 'Qwerty12#', 'Qwerty12');
    await regPage.selectors.signUpRepPasswordField.blur();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpRepPasswordValidation).toContainText('Passwords do not match');
    
  })
  test('Validation  invalid data', async() => {
    
    await regPage.openRegPopup();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await regPage.enterRegData('111','===','aqa-tomford4gmail.com', '1234567890', '1234567890');
    await regPage.selectors.signUpRepPasswordField.blur();
    await expect(regPage.selectors.signUpRegisterButton).toBeDisabled();
    await expect(regPage.selectors.signUpNameValidation).toContainText('Name is invalid');
    await expect(regPage.selectors.signUpLastNameValidation).toContainText('Last name is invalid');
    await expect(regPage.selectors.signUpEmailValidation).toContainText('Email is incorrect');
    await expect(regPage.selectors.signUpPasswordValidation).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(regPage.selectors.signUpRepPasswordValidation).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    
  })

  test('Registration with used email', async() => {

    const email = generateEmail();
    await regPage.openRegPopup();
    await regPage.enterRegData('Tom','Ford',email, 'Qwerty12#', 'Qwerty12#');
    await regPage.selectors.signUpRegisterButton.click();
    await expect(regPage.page).toHaveURL(`/panel/garage`);
    await regPage.selectors.logOutButton.click();
    await regPage.openRegPopup();
    await regPage.enterRegData('Tom','Ford',email, 'Qwerty12#', 'Qwerty12#');
    await regPage.selectors.signUpRegisterButton.click();
    await expect(regPage.selectors.signUpError).toContainText('User already exists');
  })
})