import { test as setup } from "@playwright/test";
import { STORAGE_STATE } from "../playwright.config";
import { SigninPage } from "@pages/SigninPage";


setup("Authenticate and save storage state", async ({ page }) => {
  const signinPage = new SigninPage(page);
    await signinPage.navigateTo();
    await signinPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await signinPage.verifyLoginSuccessful();
    await page.context().storageState({ path: STORAGE_STATE });
    console.log("Authentication successful, storage state saved.");
});