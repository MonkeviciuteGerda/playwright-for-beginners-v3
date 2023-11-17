import { Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  private selectors = {
    modalDismissButton: 'dismiss',
    cookiesModalDismissButton: 'dismiss cookie message',
    emailInput: '#email',
    passwordInput: '#password',
    loginButton: '#loginButton',
  }

  public async open() {
    await this.page.goto('http://localhost:3000/#/login');
  }

  public async login(email: string, password: string) {
    await this.page.getByTestId(this.selectors.modalDismissButton).click();
    await this.page.getByLabel(this.selectors.cookiesModalDismissButton).click();

    await this.page.locator(this.selectors.emailInput).fill(email);
    await this.page.locator(this.selectors.passwordInput).fill(password);
    await this.page.locator(this.selectors.loginButton).click();
  }
}