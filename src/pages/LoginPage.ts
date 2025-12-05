import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators for Login Page
  private readonly emailInput = 'input[name="email"], input[type="email"]';
  private readonly passwordInput = 'input[name="password"], input[type="password"]';
  private readonly loginButton = 'button[type="submit"], input[type="submit"]';
  private readonly errorMessage = '[class*="error"], [class*="alert"]';
  private readonly successMessage = '[class*="success"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage() {
    await this.goto('http://courses.ultimateqa.com/users/sign_in');
    await this.waitForPageLoad();
  }

  async fillEmail(email: string) {
    await this.fillInput(this.emailInput, email);
  }

  async fillPassword(password: string) {
    await this.fillInput(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }
}
