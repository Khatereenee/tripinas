import { Page, Locator, expect } from '@playwright/test';

export class SignupPage {

  readonly registrationFormHeader: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly clickContinueButton: Locator;


    constructor(public readonly page: Page) {
        this.registrationFormHeader = page.getByRole('heading', { name: 'Create your account' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.userNameInput = page.getByRole('textbox', { name: 'Username' });
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.clickContinueButton = page.getByRole('button', { name: 'Continue' });
    }


    // Actions
    async navigateTo(): Promise<void> {
      await this.page.context().clearCookies();
      await this.page.goto('http://localhost:5173/sign-up');
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

    async clickContinue(): Promise<void> {
      await this.clickContinueButton.click();
    }

    async login(firstName: string, lastName: string, userName: string, email: string, password: string): Promise<void> {
      await this.enterFirstName(firstName); await this.clickContinue();
      await this.enterLastName(lastName); await this.clickContinue();
      await this.enterUserName(userName); await this.clickContinue();
      await this.enterEmail(email); await this.clickContinue();
      await this.enterPassword(password); await this.clickContinue();
    }

    // Assertions
    async verifyPageLoaded(): Promise<void> {
      await expect(this.emailInput).toBeVisible({timeout: 10000});
    }

    async verifySigninSuccessful(expectedUrl: string = 'http://localhost:5173/dashboard'): Promise<void> {
      await this.page.waitForURL(expectedUrl);
      await expect(this.page).toHaveURL(expectedUrl);
    }







}