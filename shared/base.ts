import { test as base, request } from '@playwright/test';
import { SigninPage } from '@pages/SigninPage';
import { SignupPage } from '@pages/SignupPage';



type MyFixtures = {
  signinPage: SigninPage;
  signupPage: SignupPage;
};

export const test = base.extend<MyFixtures>({
  signinPage: async ({ page }, use) => {
    await use(new SigninPage(page));
  },
  
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
});

export { expect } from '@playwright/test';