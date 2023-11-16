import { test, expect } from "@playwright/test";

test.describe('Homepage tests', async () => {
  test('Visit home page as logged in user', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByTestId('dismiss').click();
    await page.getByLabel('dismiss cookie message').click();

    await page.locator('#email').fill('jane.doe@test.com');
    await page.locator('#password').fill('jane.doe');
    await page.locator('#loginButton').click();

    await page.getByTestId('account').click();
    await expect(page.getByTestId('userProfile')).toContainText('jane.doe@test.com');
  });
});