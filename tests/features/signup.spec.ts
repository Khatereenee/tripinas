/*  
    run using npm test:signup
*/

import { test, expect } from "@shared/base"; // Updated import to use custom base
import customers from '../../test-data/customers.json';
import errCustomer from '../../test-data/err_customers.json';
import { attachScreenshot } from 'shared/helpers';


const SIGNUP_SUCCESS_SCREENSHOT = 'signup_success_screenshot.png';
const SIGNUP_FAILURE_SCREENSHOT = 'signup_failure_screenshot.png';



test.describe(`Signup Positive Tests`, 
    { tag: ['@RegressionTesting', '@Data-Driven', '@HappyPath', '@Sprint-1', '@High-Priority'] }, () => {

        test.beforeEach(async ({ signupPage }) => {
                await signupPage.navigateTo();
                await signupPage.verifyPageLoaded();
        });
    
        for (const customer of customers) {

            test(`Create an account for ${customer.userName}` , async ({signupPage, page}, testInfo) => {

                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000); 
                const uniqueUserName = `${customer.userName}_${uniqueSuffix}`;
                const uniqueEmail = customer.email.replace('@', `+${uniqueSuffix}@`);
                

                await test.step('Signup using JSON data', async () => {
                    await signupPage.signup(
                                            customer.firstName, customer.lastName,
                                            uniqueUserName, uniqueEmail,
                                            customer.password );
                });

                await test.step('Click Continue Button', async () => {
                    await signupPage.continueButton.click();
                });


                await test.step('Verify Dashboard URL', async () => {
                    await signupPage.verifySignupSuccessful(`/dashboard`); 
                });

                await test.step('Verify Profile Information - Name', async () => {
                    // await expect(page.getByTestId("user-fullname")).toContainText(); 
                });      
                
                await test.step('Verify Profile Information - Username', async () => {
                    await expect(page.getByTestId("user-username")).toContainText(uniqueUserName); 
                });

                await test.step('Verify Profile Information - Email', async () => {
                    await expect(page.getByTestId("user-email")).toContainText(uniqueEmail); 
                });

                await test.step('Screenshot -Successful Signup', async () => {
                    await attachScreenshot(page, testInfo,SIGNUP_SUCCESS_SCREENSHOT,); 
                });
            }); // End of test1
        } // End of for loop
}); // End of test.describe


test.describe(`Signup Negative Tests`, 
    { tag: ['@RegressionTesting', '@Data-Driven', '@Negative', '@Sprint-1', '@High-Priority'] }, () => {

        test.beforeEach(async ({ signupPage }) => {
                await signupPage.navigateTo();
                await signupPage.verifyPageLoaded();
        });
    
        for (const customer of errCustomer) {
            
            test(`Should fail signup: ${customer.expectedError}`, async ({ signupPage, page }, testInfo) => {
                await test.step('Fill signup form with invalid data', async () => {
                    await signupPage.signup(
                                        customer.firstName, customer.lastName,
                                        customer.userName, customer.email,
                                        customer.password);
                });

                await test.step('Click Continue Button', async () => {
                    await signupPage.continueButton.click();
                });

                await test.step('Verify error message', async () => {
                    await expect(page.getByText(customer.expectedError, { exact: false })).toBeVisible({ timeout: 5000 });
                });

                await test.step('Screenshot - Negative Case', async () => {
                    await attachScreenshot(page, testInfo, SIGNUP_FAILURE_SCREENSHOT);
                });
            }); // End of test 2
        } // End of for loop
}); // End of test.describe 2
