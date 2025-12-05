import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LandingPage extends BasePage {
  // Locators for Fake Landing Page
  private readonly navigationLinks = 'a[href*="#"]';
  private readonly mainHeading = 'h1:has-text("Learn to Code Websites, Apps & Games")';
  private readonly features = '[class*="feature"]';
  private readonly ctaButton = 'button, a.btn';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLandingPage() {
    await this.goto('/fake-landing-page');
    await this.waitForPageLoad();
  }

  async getMainHeading(): Promise<string> {
    return await this.getText(this.mainHeading);
  }

  async clickNavigationLink(linkText: string) {
    await this.page.click(`a:has-text("${linkText}")`);
    await this.page.waitForLoadState('networkidle');
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async getFeatureCount(): Promise<number> {
    return await this.page.locator(this.features).count();
  }

  async isMainHeadingVisible(): Promise<boolean> {
    return await this.isElementVisible(this.mainHeading);
  }
}
