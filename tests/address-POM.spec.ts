import { test, expect } from '@playwright/test';
import { testUser } from '../data/testData';
import { AddressPage } from '../pageObjects/address/AddressPage';
import { LoginPage } from '../pageObjects/login/LoginPage';
import { DataGenerator } from '../utils/DataGenerator';

let addressPage: AddressPage;

test.describe('Test address', async () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    addressPage = new AddressPage(page);

    await loginPage.open();
    await loginPage.login(testUser.email, testUser.password);
    await expect(page.getByTestId('productsList')).toBeVisible(); // TODO: extract to POM

    await addressPage.open();
  });

  test('Create address', async () => {
    const addressData = DataGenerator.addressData(`Name ${Date.now()}`);

    await addressPage.openAddressForm();
    await addressPage.form.fillInForm(addressData);
    await addressPage.form.submit();

    await addressPage.verifyAddressDetails(addressData);
  });

  test('Edit address', async () => {
    const initialAddressData = DataGenerator.addressData(`Name ${Date.now()}`);
    const updatedAddressData = DataGenerator.addressData(`Name ${Date.now()} 2`);

    await addressPage.openAddressForm();
    await addressPage.form.fillInForm(initialAddressData);
    await addressPage.form.submit();

    await addressPage.verifyAddressDetails(initialAddressData);

    await addressPage.openAddressEditForm(initialAddressData.name);
    await addressPage.form.fillInForm(updatedAddressData);
    await addressPage.form.submit();

    await addressPage.verifyAddressDetails(updatedAddressData);
  });
}); 