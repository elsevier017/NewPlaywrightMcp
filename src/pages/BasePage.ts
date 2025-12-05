import { Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async fillInput(selector: string, text: string) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
    await this.page.fill(selector, text);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async getText(selector: string) {
    return (await this.page.textContent(selector)) || '';
  }

  getLocator(selector: string) {
    return this.page.locator(selector);
  }

  async waitForElement(selector: string, timeout = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }


  async waitForPageLoad(timeout = 5000) {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(timeout);
  }
}

