import { test as base, request } from '@playwright/test';
import { SigninPage } from '@pages/SigninPage';
import { RegistrationPage } from '@pages/RegistrationPage';



type MyFixtures = {
  signinPage: SigninPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<MyFixtures>({
  signinPage: async ({ page }, use) => {
    await use(new SigninPage(page));
  },
  
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});

export { expect } from '@playwright/test';