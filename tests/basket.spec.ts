import { test, expect } from '@playwright/test';
import { testUser } from '../data/testData';

test.describe('Basket tests', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByTestId('dismiss').click();
    await page.getByLabel('dismiss cookie message').click();

    await page.locator('#email').fill(testUser.email);
    await page.locator('#password').fill(testUser.password);
    await page.locator('#loginButton').click();
  });

  test.afterEach(async ({ page }) => {
    await page.locator('mat-table mat-row mat-cell').nth(4).getByRole("button").click();
  });

  const testCases = [
    {
      product: 'Banana Juice',
      price: '1.99'
    },
    {
      product: 'Fruit Press',
      price: '89.99'
    },
    {
      product: 'OWASP Juice Shop Hoodie',
      price: '49.99'
    }
  ];

  testCases.forEach(testCase => {
    test(`Add ${testCase.product} item to basket`, async ({ page }) => {
      await page.locator('#searchQuery').click();
      await page.locator('input[type="text"]').fill(testCase.product);
      await page.locator('input[type="text"]').press('Enter');
      await expect(page.getByTestId('productCard')).toHaveCount(1);
      await expect(page.getByTestId('productCard').locator('.item-name')).toContainText(testCase.product);
      await page.getByLabel('Add to Basket').click();

      await expect(page.getByTestId('yourBasket')).toContainText('1');
      await page.getByTestId('yourBasket').click();
      await expect(page.locator('mat-table mat-row')).toHaveCount(1);
      await expect(page.locator('mat-table mat-row mat-cell').nth(1)).toContainText(testCase.product);
      await expect(page.locator('mat-table mat-row mat-cell').nth(3)).toContainText(testCase.price);
    });
  })
  // test('Add Banana Juice item to basket', async ({ page }) => {
  //   await page.locator('#searchQuery').click();
  //   await page.locator('input[type="text"]').fill('Banana Juice');
  //   await page.locator('input[type="text"]').press('Enter');
  //   await expect(page.getByTestId('productCard')).toHaveCount(1);
  //   await expect(page.getByTestId('productCard').locator('.item-name')).toContainText('Banana Juice');
  //   await page.getByLabel('Add to Basket').click();

  //   await expect(page.getByTestId('yourBasket')).toContainText('1');
  //   await page.getByTestId('yourBasket').click();
  //   await expect(page.locator('mat-table mat-row')).toHaveCount(1);
  //   await expect(page.locator('mat-table mat-row mat-cell').nth(1)).toContainText('Banana Juice');
  // });

  // test('Add Fruit Press item to basket', async ({ page }) => {
  //   await page.locator('#searchQuery').click();
  //   await page.locator('input[type="text"]').fill('Fruit Press');
  //   await page.locator('input[type="text"]').press('Enter');
  //   await expect(page.getByTestId('productCard')).toHaveCount(1);
  //   await expect(page.getByTestId('productCard').locator('.item-name')).toContainText('Fruit Press');
  //   await page.getByLabel('Add to Basket').click();

  //   await expect(page.getByTestId('yourBasket')).toContainText('1');
  //   await page.getByTestId('yourBasket').click();
  //   await expect(page.locator('mat-table mat-row')).toHaveCount(1);
  //   await expect(page.locator('mat-table mat-row mat-cell').nth(1)).toContainText('Fruit Press');
  // });

  // test('Add OWASP Juice Shop Hoodie item to basket', async ({ page }) => {
  //   await page.locator('#searchQuery').click();
  //   await page.locator('input[type="text"]').fill('OWASP Juice Shop Hoodie');
  //   await page.locator('input[type="text"]').press('Enter');
  //   await expect(page.getByTestId('productCard')).toHaveCount(1);
  //   await expect(page.getByTestId('productCard').locator('.item-name')).toContainText('OWASP Juice Shop Hoodie');
  //   await page.getByLabel('Add to Basket').click();

  //   await expect(page.getByTestId('yourBasket')).toContainText('1');
  //   await page.getByTestId('yourBasket').click();
  //   await expect(page.locator('mat-table mat-row')).toHaveCount(1);
  //   await expect(page.locator('mat-table mat-row mat-cell').nth(1)).toContainText('OWASP Juice Shop Hoodie');
  // });
});