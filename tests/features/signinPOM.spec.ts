/*  SIgnin and Profile Verification
    run using npm test:signinPOM
*/

import { test, expect } from "@shared/base"; // Updated import to use custom base
import { attachScreenshot } from 'shared/helpers';
import users from '../../test-data/users.json'; // Adjust the path as necessary


const SIGNIN_SUCCESS_SCREENSHOT = 'signin_success_screenshot.png';
const SIGNIN_FAILURE_SCREENSHOT = 'signin_failure_screenshot.png';



test.describe(`Signin Positive Tests with Profile Verification `, { tag: ['@RegressionTesting', '@HappyPath'] }, () => {
    users.forEach((user) => {
        test.beforeEach(async ({ signinPage }) => {
            await signinPage.navigateTo(); // Navigate to signin page
            await signinPage.verifyPageLoaded(); // Verify the page has loaded
        });

        test(`Should sign in as ${user.username} and verify profile`, async ({ signinPage, page }, testInfo) => { // Use the signinPage fixture
            
            await test.step('Signin using POM and env variables', async () => {
                await signinPage.login(process.env.TRIPINAS_APP_USERNAME!, process.env.TRIPINAS_APP_PASSWORD!);
            });  
            
            await test.step('Verify Dashboard URL', async () => {
              await signinPage.verifySigninSuccessful(`/dashboard`); 
            });

            await test.step('Verify Profile Information - Name', async () => {
                await expect(page.getByTestId("user-username")).toContainText(process.env.TRIPINAS_APP_NAME!);
            });      

            await test.step('Verify Profile Information - Username', async () => {
                await expect(page.getByTestId("user-username")).toContainText(process.env.TRIPINAS_APP_USERNAME!); 
            });

            await test.step('Verify Profile Information - Email', async () => {
                await expect(page.getByTestId("user-email")).toContainText(process.env.TRIPINAS_APP_EMAIL!); 
            });
            await test.step('Screenshot -Successful Signin', async () => {
                await attachScreenshot(page, testInfo,SIGNIN_SUCCESS_SCREENSHOT,); 
            });
        }); // End of test1

        test(`Should sign in as ${user.email} and verify profile`, async ({ signinPage, page }, testInfo) => { // Use the signinPage fixture
            
            await test.step('Alternative Signin Method using JSON Data', async () => {
              await signinPage.login(user.email, user.password);
            });
            
            await test.step('Verify Dashboard URL', async () => {
              await signinPage.verifySigninSuccessful(`/dashboard`); 
            });

            await test.step('Verify Profile Information - Name', async () => {
                await expect(page.getByTestId("user-fullname")).toContainText(user.fullName); 
            });      
            
            await test.step('Verify Profile Information - Username', async () => {
                await expect(page.getByTestId("user-username")).toContainText(user.username); 
            });

            await test.step('Verify Profile Information - Email', async () => {
                await expect(page.getByTestId("user-email")).toContainText(user.email); 
            });

            await test.step('Screenshot -Successful Signin', async () => {
                await attachScreenshot(page, testInfo,SIGNIN_SUCCESS_SCREENSHOT,); 
            });  
        }); // End of test2
    }); // End of users.forEach
}); // End of test.describe1

test.describe(`Signin Negative Tests `, { tag: ['@RegressionTesting', '@Negative'] }, () => {
    users.forEach((authUser) => {
        test.beforeEach(async ({ signinPage }) => {
            await signinPage.navigateTo(); // Navigate to signin page
            await signinPage.verifyPageLoaded(); // Verify the page has loaded
        });

        test(`Sign in as ${authUser.username} using wrong password `, async ({ signinPage, page }, testInfo) => { // Use the signinPage fixture
            
            await test.step('Signin - Correct Username but with Wrong Password', async () => {
                await signinPage.login(process.env.TRIPINAS_APP_USERNAME!, 'wrong_password');
                // await signinPage.login(authUser.email, 'wrong_password');
            });

            await test.step('Verify Still on Signin Page', async () => {
                await expect(page).toHaveURL(/.*sign-in/); 
            });

            //Locator - getByText('Password is incorrect. Try')
            await test.step("Verify signin error message", async () => {
                await expect(page.getByText('Password is incorrect. Try')).toBeVisible();
                await expect(page.locator('#error-password')).toContainText('Password is incorrect. Try again, or use another method.');
            });

            await test.step('Attach screenshot of failed signin', async () => {
                await attachScreenshot(signinPage.page,testInfo,SIGNIN_FAILURE_SCREENSHOT,);
            });
        }); // End of test3

        test(`Sign in with Wrong Credentials`, async ({ signinPage, page }, testInfo) => { // Use the signinPage fixture
            
            await test.step('Signin - wrong username', async () => {
                await signinPage.login('wrong_username', 'wrong_password');
            });

            await test.step('Verify Still on Signin Page', async () => {
                await expect(page).toHaveURL(/.*sign-in/); 
            });

            // //Locator - getByText('Couldn\'t find your account.')
            await test.step("Verify signin error message", async () => {
                await expect(page.getByText('Couldn\'t find your account.')).toBeVisible();
                await expect(page.locator('#error-identifier')).toContainText('Couldn\'t find your account.');
            });

            await test.step('Attach screenshot of failed signin', async () => {
                await attachScreenshot(signinPage.page,testInfo,SIGNIN_FAILURE_SCREENSHOT,);
            });
        }); // End of test4
    }); // End of users.forEach
}); // End of test.describe2

