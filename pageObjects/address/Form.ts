import { Page } from '@playwright/test'

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

  public async fillInForm(country: string, name: string, mobileNumber: string, zipCode: string, address: string, city: string, state: string) {
    await this.page.getByTestId(this.selectors.countryInput).fill(country);
    await this.page.getByTestId(this.selectors.nameInput).fill(name);
    await this.page.getByTestId(this.selectors.mobileNumberInput).fill(mobileNumber);
    await this.page.getByTestId(this.selectors.zipCodeInput).fill(zipCode);
    await this.page.getByTestId(this.selectors.addressTextarea).fill(address);
    await this.page.getByTestId(this.selectors.cityInput).fill(city);
    await this.page.getByTestId(this.selectors.stateInput).fill(state);
  }

  public async submit() {
    await this.page.getByTestId(this.selectors.submitButton).click();
  }
}