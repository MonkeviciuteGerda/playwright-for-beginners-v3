import { test, expect } from '@playwright/test';

test.describe('locators', async () => {
  test('use different locators', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByTestId('dismiss').click();
    await page.getByLabel('dismiss cookie message').click();

    await page.locator('#email').fill('jane.doe@test.com');
    await page.locator('[name="password"]').fill('jane.doe');
    await page.getByLabel('Login', { exact: true }).click();

    await page.getByLabel('Click to search').click();
    await page.locator('input[type="text"]').fill('Cattor Juice{enter}');
    await page.getByAltText('Carrot Juice (1000ml)').click();
    await page.getByPlaceholder('What did you like or dislike?').fill('I really like this juice');
    await page.getByTestId('submit').click();
    await page.getByRole('button').getByText('Reviews').click();
    await page.getByRole('button').getByText('Reviews').click();
    await expect(page.getByText('I really like this juice').last()).toBeVisible();
    await page.locator('button', { hasText: 'Close' }).click();
  });
});