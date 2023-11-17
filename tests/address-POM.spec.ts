import { test, expect } from '@playwright/test';
import { testUser } from '../data/testData';
import { AddressPage } from '../pageObjects/address/AddressPage';
import { LoginPage } from '../pageObjects/login/LoginPage';

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
    const name = `Name ${Date.now()}`;

    await addressPage.openAddressForm();
    await addressPage.form.fillInForm('Country', name, '1234567890', '12345', 'Address', 'City', 'State');
    await addressPage.form.submit();

    await addressPage.verifyAddressDetails(name, 'Address', 'City', 'State', '12345', 'Country');
  });

  test('Edit address', async () => {
    const name = `Name ${Date.now()}`;
    const updatedName = `Name ${Date.now()} 2`;

    await addressPage.openAddressForm();
    await addressPage.form.fillInForm('Country', name, '1234567890', '12345', 'Address', 'City', 'State');
    await addressPage.form.submit();

    await addressPage.verifyAddressDetails(name, 'Address', 'City', 'State', '12345', 'Country');

    await addressPage.openAddressEditForm(name);
    await addressPage.form.fillInForm('Country2', updatedName, '1234567892', '12342', 'Address2', 'City2', 'State2');
    await addressPage.form.submit();

    await addressPage.verifyAddressDetails(updatedName, 'Address2', 'City2', 'State2', '12342', 'Country2');
  });
}); 