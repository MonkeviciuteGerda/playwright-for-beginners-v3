import { Page, expect } from '@playwright/test';
import { Form } from './Form';
import { AddressProps } from '../../types/types';

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

  public async verifyAddressDetails(address: AddressProps) {
    await expect(this.page.getByTestId(this.selectors.table)).toBeVisible();
    const row = this.page.getByTestId(this.selectors.tableRow).filter({ hasText: address.name });
    await expect(row.getByTestId(this.selectors.nameColumn)).toContainText(address.name);
    await expect(row.getByTestId(this.selectors.fullAddressColumn)).toContainText(`${address.address}, ${address.city}, ${address.state}, ${address.zipCode}`);
    await expect(row.getByTestId(this.selectors.countryColumn)).toContainText(address.country);
  }
}