import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormPage extends BasePage {
  // Locators for Form Filling page
  // Use a single Name field selector
  private readonly nameSelectors = [
    'input[name="name"]',
    'input[placeholder*="Name"]',
    'input[type="text"]',
    'input[id*="name"]'
  ];
  private readonly emailSelectors = [
    'input[name="email"]',
    'input[type="email"]',
    'input[placeholder*="Email"]',
    'input[id*="email"]'
  ];
  private readonly submitButton = 'button[type="submit"]';
  // Update to check for a generic confirmation or thank you message
  private readonly successMessage = 'text=Thank you|text=success|text=Your message has been sent|text=Message sent';

  constructor(page: Page) {
    super(page);
  }

  async navigateToFormPage() {
    await this.goto('/filling-out-forms/');
    await this.waitForPageLoad();
  }

  async fillFirstName(firstName: string) {
    await this.fillInputWithFallback(this.nameSelectors, firstName);
  }

  async fillLastName(lastName: string) {
    /* No separate last name field; do nothing */
  }


  // Try each selector until one is found and visible
  async fillInputWithFallback(selectors: string[], text: string) {
    for (const selector of selectors) {
      try {
        await this.page.waitForSelector(selector, { state: 'visible', timeout: 3000 });
        await this.page.fill(selector, text);
        return;
      } catch (e) {
        // Try next selector
      }
    }
    throw new Error(`None of the selectors were found or visible: ${selectors.join(', ')}`);
  }

  async submitForm() {
    await this.click(this.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async fillAndSubmitForm(firstName: string, lastName: string, email: string) {
    // Concatenate first and last name for the Name field
    const fullName = `${firstName} ${lastName}`.trim();
    await this.fillFirstName(fullName);
    await this.submitForm();
  }

  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  async isFormSubmitted(): Promise<boolean> {
    return await this.isElementVisible(this.successMessage);
  }
}
