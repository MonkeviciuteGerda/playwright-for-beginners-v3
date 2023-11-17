import { test, expect } from '@playwright/test';
import { testUser } from '../data/testData';
import { AddressPage } from '../pageObjects/address/AddressPage';
import { LoginPage } from '../pageObjects/login/LoginPage';
import { AddressProps } from '../types/types';

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
    const addressData: AddressProps = {
      country: 'Country',
      name: `Name ${Date.now()}`,
      mobileNumber: '123456789',
      zipCode: '12345',
      address: 'Address',
      city: 'City',
      state: 'State',
    }

    await addressPage.openAddressForm();
    await addressPage.form.fillInForm(addressData);
    await addressPage.form.submit();

    await addressPage.verifyAddressDetails(addressData);
  });

  test('Edit address', async () => {
    const initialAddressData: AddressProps = {
      country: 'Country',
      name: `Name ${Date.now()}`,
      mobileNumber: '123456789',
      zipCode: '12345',
      address: 'Address',
      city: 'City',
      state: 'State',
    }

    const updatedAddressData: AddressProps = {
      country: 'Country2',
      name: `Name ${Date.now()} 2`,
      mobileNumber: '123456782',
      zipCode: '12342',
      address: 'Address2',
      city: 'City2',
      state: 'State2',
    }

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