import { test, expect } from '@playwright/test';
import { testUser } from '../data/testData';

test.describe('Test address', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByTestId('dismiss').click();
    await page.getByLabel('dismiss cookie message').click();

    await page.locator('#email').fill(testUser.email);
    await page.locator('#password').fill(testUser.password);
    await page.locator('#loginButton').click();
    await expect(page.getByTestId('productsList')).toBeVisible();

    await page.goto('/#/address/saved');
  });

  test('Create address', async ({ page }) => {
    const name = `Name ${Date.now()}`;

    await page.getByTestId('addNewButton').click();
    await page.getByTestId('country').fill('Country');
    await page.getByTestId('name').fill(name);
    await page.getByTestId('mobileNumber').fill('1234567890');
    await page.getByTestId('zipCode').fill('12345');
    await page.getByTestId('address').fill('Address');
    await page.getByTestId('city').fill('City');
    await page.getByTestId('state').fill('State');
    await page.getByTestId('submitButton').click();

    await expect(page.getByTestId('addressTable')).toBeVisible();
    const row = page.getByTestId('addressRow').filter({ hasText: name });
    await expect(row.getByTestId('addressName')).toContainText(name);
    await expect(row.getByTestId('fullAddress')).toContainText('Address, City, State, 12345');
    await expect(row.getByTestId('country')).toContainText('Country');
  });

  test('Edit address', async ({ page }) => {
    const name = `Name ${Date.now()}`;
    const updatedName = `Name ${Date.now()} 2`;

    await page.getByTestId('addNewButton').click();
    await page.getByTestId('country').fill('Country');
    await page.getByTestId('name').fill(name);
    await page.getByTestId('mobileNumber').fill('1234567890');
    await page.getByTestId('zipCode').fill('12345');
    await page.getByTestId('address').fill('Address');
    await page.getByTestId('city').fill('City');
    await page.getByTestId('state').fill('State');
    await page.getByTestId('submitButton').click();

    await expect(page.getByTestId('addressTable')).toBeVisible();
    let row = page.getByTestId('addressRow').filter({ hasText: name });
    await expect(row.getByTestId('addressName')).toContainText(name);
    await expect(row.getByTestId('fullAddress')).toContainText('Address, City, State, 12345');
    await expect(row.getByTestId('country')).toContainText('Country');

    await row.getByTestId('editButton').click();
    await page.getByTestId('country').fill('Country2');
    await page.getByTestId('name').fill(updatedName);
    await page.getByTestId('mobileNumber').fill('1234567892');
    await page.getByTestId('zipCode').fill('12342');
    await page.getByTestId('address').fill('Address2');
    await page.getByTestId('city').fill('City2');
    await page.getByTestId('state').fill('State2');
    await page.getByTestId('submitButton').click();

    await expect(page.getByTestId('addressTable')).toBeVisible();
    row = page.getByTestId('addressRow').filter({ hasText: updatedName });
    await expect(row.getByTestId('addressName')).toContainText(updatedName);
    await expect(row.getByTestId('fullAddress')).toContainText('Address2, City2, State2, 12342');
    await expect(row.getByTestId('country')).toContainText('Country2');
  });
}); 