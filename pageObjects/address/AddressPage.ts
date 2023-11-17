import { Page, expect } from '@playwright/test';
import { Form } from './Form';

export class AddressPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get form() {
    return new Form(this.page);
  }

  private selectors = {
    addNewAddressButton: 'addNewButton',
    table: 'addressTable',
    tableRow: 'addressRow',
    nameColumn: 'addressName',
    fullAddressColumn: 'fullAddress',
    countryColumn: 'country',
    editButton: 'editButton',
  }

  public async open() {
    await this.page.goto('/#/address/saved');
  }

  public async openAddressForm() {
    await this.page.getByTestId(this.selectors.addNewAddressButton).click();
  }

  public async openAddressEditForm(name: string) {
    const row = this.page.getByTestId(this.selectors.tableRow).filter({ hasText: name });
    await row.getByTestId(this.selectors.editButton).click();
  }

  public async verifyAddressDetails(name: string, address: string, city: string, state: string, zipCode: string, country: string) {
    await expect(this.page.getByTestId(this.selectors.table)).toBeVisible();
    const row = this.page.getByTestId(this.selectors.tableRow).filter({ hasText: name });
    await expect(row.getByTestId(this.selectors.nameColumn)).toContainText(name);
    await expect(row.getByTestId(this.selectors.fullAddressColumn)).toContainText(`${address}, ${city}, ${state}, ${zipCode}`);
    await expect(row.getByTestId(this.selectors.countryColumn)).toContainText(country);
  }
}