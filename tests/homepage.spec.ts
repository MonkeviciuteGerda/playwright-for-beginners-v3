import { test, expect } from '@playwright/test';
import { testUser } from '../data/testData';

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

  test('Move credentials into separate file', async ({ page }) => {
    await page.goto('/#/login');
    await page.getByTestId('dismiss').click();
    await page.getByLabel('dismiss cookie message').click();

    await page.locator('#email').fill(testUser.email);
    await page.locator('#password').fill(testUser.password);
    await page.locator('#loginButton').click();

    await page.getByTestId('account').click();
    await expect(page.getByTestId('userProfile')).toContainText(testUser.email);
  });

  test('Add Banana Juice item to basket', async ({ page }) => {
    await page.goto('/#/login');
    await page.getByTestId('dismiss').click();
    await page.getByLabel('dismiss cookie message').click();

    await page.locator('#email').fill(testUser.email);
    await page.locator('#password').fill(testUser.password);
    await page.locator('#loginButton').click();

    await page.locator('#searchQuery').click();
    await page.locator('input[type="text"]').fill('Banana Juice');
    await page.locator('input[type="text"]').press('Enter');
    await expect(page.getByTestId('productCard')).toHaveCount(1);
    await expect(page.getByTestId('productCard').locator('.item-name')).toContainText('Banana Juice');
    await page.getByLabel('Add to Basket').click();

    await expect(page.getByTestId('yourBasket')).toContainText('1');
    await page.getByTestId('yourBasket').click();
    await expect(page.locator('mat-table mat-row')).toHaveCount(1);
    await expect(page.locator('mat-table mat-row mat-cell').nth(1)).toContainText('Banana Juice');
    await page.locator('mat-table mat-row mat-cell').nth(4).getByRole("button").click();
  });
});