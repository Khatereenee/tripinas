/*  SIgnin and Profile Verification
    run using npm test:signin
*/

import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';



test.describe(`Signin and Profile Verification`, { tag: ['@RegressionTesting', '@HappyPath', '@Sprint-1'] }, () => {
    users.forEach((authUser) => { 
    // for (const authUser of users) {
    test(`Should signin as ${authUser.username}`, async ({ page }, testInfo) => {
        await page.goto('/sign-in'); // Navigate to signin page
        await expect(page).toHaveURL(/.*sign-in/); // Verify URL contains 'sign-in'
        
        await page.getByRole('textbox', { name: 'Email address or username' }).fill(authUser.username);
        await page.getByRole('textbox', { name: 'Password' }).fill(authUser.password);
        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page).toHaveURL('/dashboard'); // Verify redirection to dashboard

        await expect(page.getByTestId("user-fullname")).toContainText(authUser.fullName);
        await expect(page.getByTestId("user-username")).toContainText(authUser.username);
        await expect(page.getByTestId("user-email")).toContainText(authUser.email);

        
        await expect(page).toHaveScreenshot(`dashboard-${authUser.username}.png`, {
            maxDiffPixels: 200,
            threshold: 0.50,
            animations: 'disabled',
        });    

        await testInfo.attach('dashboard-live', {
            body: await page.screenshot(),
            contentType: 'image/png',
        });
      
    });            
    });             
});

