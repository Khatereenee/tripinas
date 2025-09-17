/*  Signup and Profile Verification
    run using npm test:signup
*/

import { test, expect } from "@shared/base"; // Updated import to use custom base
import { attachScreenshot } from 'shared/helpers';
import users from '../../test-data/newUsers.json'; // Adjust the path as necessary

const SIGNUP_SUCCESS_SCREENSHOT = 'signup_success_screenshot.png';
const SIGNUP_FAILURE_SCREENSHOT = 'signup_failure_screenshot.png';

test.describe(`Signup Positive Tests - Happy Path `, { tag: ['@RegressionTesting', '@HappyPath'] }, () => {
    users.forEach((user) => {
        test.beforeEach(async ({ signupPage }) => {
            await signupPage.navigateTo(); // Navigate to signin page
            await signupPage.verifyPageLoaded(); // Verify the page has loaded
        });
    }); // End of users.forEach
}); // End of test.describe1