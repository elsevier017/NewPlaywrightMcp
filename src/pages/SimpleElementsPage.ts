import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SimpleElementsPage extends BasePage {
  // Locators for Simple HTML Elements
  private readonly textInput = 'input[type="text"]';
  private readonly button = 'button';
  private readonly dropdown = 'select';
  private readonly checkbox = 'input[type="checkbox"]';
  private readonly radioButton = 'input[type="radio"]';
  private readonly outputText = '[id*="output"], [class*="result"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToSimpleElementsPage() {
    await this.goto('/simple-html-elements-for-automation/');
    await this.page.waitForSelector(this.textInput, { state: 'visible', timeout: 10000 });
    await this.waitForPageLoad();
  }

  async fillTextInput(text: string) {
    await this.fillInput(this.textInput, text);
  }

  async clickButton() {
    await this.click(this.button);
  }

  async selectDropdownOption(optionValue: string) {
    await this.page.selectOption(this.dropdown, optionValue);
  }

  async checkCheckbox() {
    await this.page.check(this.checkbox);
  }

  async selectRadioButton() {
    await this.page.click(this.radioButton);
  }

  async getOutputText(): Promise<string> {
    return await this.getText(this.outputText);
  }

  async isOutputVisible(): Promise<boolean> {
    return await this.isElementVisible(this.outputText);
  }
}
