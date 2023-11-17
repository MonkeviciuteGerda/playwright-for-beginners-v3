import { Page } from '@playwright/test'
import { AddressProps } from '../../types/types';

export class Form {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private selectors = {
    countryInput: 'country',
    nameInput: 'name',
    mobileNumberInput: 'mobileNumber',
    zipCodeInput: 'zipCode',
    addressTextarea: 'address',
    cityInput: 'city',
    stateInput: 'state',
    submitButton: 'submitButton',
  }

  public async fillInForm(address: AddressProps) {
    await this.page.getByTestId(this.selectors.countryInput).fill(address.country);
    await this.page.getByTestId(this.selectors.nameInput).fill(address.name);
    await this.page.getByTestId(this.selectors.mobileNumberInput).fill(address.mobileNumber);
    await this.page.getByTestId(this.selectors.zipCodeInput).fill(address.zipCode);
    await this.page.getByTestId(this.selectors.addressTextarea).fill(address.address);
    await this.page.getByTestId(this.selectors.cityInput).fill(address.city);
    await this.page.getByTestId(this.selectors.stateInput).fill(address.state);
  }

  public async submit() {
    await this.page.getByTestId(this.selectors.submitButton).click();
  }
}