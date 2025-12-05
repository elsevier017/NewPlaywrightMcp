import { Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class ComplicatedPage extends BasePage {
  dynamicElements = '[id^="div"], [class*="dynamic"]';
  toggleButton = 'button[id*="toggle"], [class*="toggle"]';
  hiddenElement = '[style*="display: none"], [hidden]';
  interactiveElements = 'button, input, select, textarea';

  async navigateToComplicatedPage() {
    await this.goto('/complicated-page');
    await this.waitForPageLoad();
  }

  async countDynamicElements() {
    return await this.page.locator(this.dynamicElements).count();
  }

  async countInteractiveElements() {
    return await this.page.locator(this.interactiveElements).count();
  }

  async clickToggleButton() {
    const button = await this.page.locator(this.toggleButton).first();
    if (button) {
      await button.click();
      await this.page.waitForTimeout(500);
    }
  }

  async scrollPageDown() {
    // @ts-expect-error: window is defined in browser context
    await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
  }

  async scrollPageTop() {
    // @ts-expect-error: window is defined in browser context
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async getPageTitle() {
    return await this.page.title();
  }
}
