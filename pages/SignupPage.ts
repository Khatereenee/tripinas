import { Page, Locator, expect } from '@playwright/test';

export class SignupPage {

  // Locators
  public readonly registrationFormHeader: Locator;
  public readonly signupButton: Locator;
  public readonly firstNameInput: Locator;
  public readonly lastNameInput: Locator;
  public readonly userNameInput: Locator;
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly continueButton: Locator;
  


  constructor(public readonly page: Page) {
    this.registrationFormHeader = page.getByRole('heading', { name: 'Create your account' });

    this.signupButton = page.locator('text=Sign up' );
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    this.userNameInput = page.getByRole('textbox', { name: 'Username' });
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });    
    }


    // Actions
    async navigateTo(): Promise<void> {
      await this.page.context().clearCookies();
      await this.page.goto('http://localhost:5173/sign-in');
      await this.signupButton.click();
    }

    async enterFirstName(firstName: string): Promise<void> {
      await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
      await this.lastNameInput.fill(lastName);
    }

    async enterUserName(userName: string): Promise<void> {
      await this.userNameInput.fill(userName);
    }

    async enterEmail(email: string): Promise<void> {
      await this.emailInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
      await this.passwordInput.fill(password);
    }

    async clickContinue() {
      await this.continueButton.click();
    }

    async signup(firstName: string, lastName: string, userName: string, email: string, password: string): Promise<void> {
      await this.enterFirstName(firstName); 
      await this.enterLastName(lastName); 
      await this.enterUserName(userName); 
      await this.enterEmail(email); 
      await this.enterPassword(password);
    } 

    // Assertions
    async verifyPageLoaded(): Promise<void> {
      await expect(this.registrationFormHeader).toBeVisible({timeout: 10000});
    }

    async verifySignupSuccessful(expectedUrl: string = 'http://localhost:5173/dashboard'): Promise<void> {
    await this.page.waitForURL(expectedUrl);
    await expect(this.page).toHaveURL(expectedUrl);
  }

    







}