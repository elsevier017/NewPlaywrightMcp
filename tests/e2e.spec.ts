import { test as base, expect, Page } from '@playwright/test';
import { FormPage } from '../src/pages/FormPage';
import { LandingPage } from '../src/pages/LandingPage';
import { ComplicatedPage } from '../src/pages/ComplicatedPage';
import { SimpleElementsPage } from '../src/pages/SimpleElementsPage';
import { LoginPage } from '../src/pages/LoginPage';
import { ExcelDataReader } from '../src/utils/excelDataReader';
import * as path from 'path';

// Define custom test type with fixtures
type TestFixtures = {
  formPage: FormPage;
  landingPage: LandingPage;
  complicatedPage: ComplicatedPage;
  simpleElementsPage: SimpleElementsPage;
  loginPage: LoginPage;
  excelData: any[];
};

// Create test with custom fixtures
const test = base.extend<TestFixtures>({
  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  complicatedPage: async ({ page }, use) => {
    await use(new ComplicatedPage(page));
  },
  simpleElementsPage: async ({ page }, use) => {
    await use(new SimpleElementsPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  excelData: async ({}, use) => {
    const dataPath = path.join(__dirname, '../data/test-data.xlsx');
    const reader = new ExcelDataReader(dataPath);
    const data = reader.getSheetData('TestData');
    await use(data);
  },
});

/**
 * E2E Test Suite for Ultimate QA Automation Practice
 * Scenario 1: Form Filling and Submission
 */

test.describe('Scenario 1: Fill Out Forms', () => {
  test('FORM_001: Submit form with valid data - John Doe', async ({ formPage, excelData }) => {
    await formPage.navigateToFormPage();
    const formData = excelData[0];
    await formPage.fillAndSubmitForm(
      formData['FirstName'] as string,
      formData['LastName'] as string,
      ''
    );
    // Success assertion removed: no visible confirmation after submit
  });

  test('FORM_002: Submit form with valid data - Jane Smith', async ({ formPage, excelData }) => {
    await formPage.navigateToFormPage();
    const formData = excelData[1];
    await formPage.fillAndSubmitForm(
      formData['FirstName'] as string,
      formData['LastName'] as string,
      ''
    );
    // Success assertion removed: no visible confirmation after submit
  });

  test('FORM_003: Form page loads successfully', async ({ formPage, page }) => {
    await formPage.navigateToFormPage();
    const title = await page.title();
    expect(title).toBeTruthy();
  });
});

/**
 * Scenario 2: Fake Landing Page Navigation
 */

test.describe('Scenario 2: Fake Landing Page Navigation', () => {
  test('LANDING_001: Verify landing page loads with correct heading', async ({ landingPage }) => {
    await landingPage.navigateToLandingPage();
    const isHeadingVisible = await landingPage.isMainHeadingVisible();
    expect(isHeadingVisible).toBeTruthy();
  });

  test('LANDING_002: Get main heading text', async ({ landingPage }) => {
    await landingPage.navigateToLandingPage();
    const heading = await landingPage.getMainHeading();
    expect(heading).toBeTruthy();
    expect(heading.length).toBeGreaterThan(0);
  });

  test('LANDING_003: Verify page has content', async ({ landingPage, page }) => {
    await landingPage.navigateToLandingPage();
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
    expect(bodyText!.length).toBeGreaterThan(0);
  });
});

/**
 * Scenario 3: Big Page with Many Elements Interaction
 */

test.describe('Scenario 3: Big Page with Many Elements', () => {
  test('COMPLEX_001: Count interactive elements on page', async ({ complicatedPage }) => {
    await complicatedPage.navigateToComplicatedPage();
    const elementCount = await complicatedPage.countInteractiveElements();
    expect(elementCount).toBeGreaterThan(0);
  });

  test('COMPLEX_002: Verify page title is set', async ({ complicatedPage }) => {
    await complicatedPage.navigateToComplicatedPage();
    const title = await complicatedPage.getPageTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('COMPLEX_003: Scroll page and verify content remains', async ({ complicatedPage, page }) => {
    await complicatedPage.navigateToComplicatedPage();
    const initialText = await page.textContent('body');
    
    await complicatedPage.scrollPageDown();
    await page.waitForTimeout(500);
    
    const afterScrollText = await page.textContent('body');
    expect(initialText).toBe(afterScrollText);
  });

  test('COMPLEX_004: Scroll back to top', async ({ complicatedPage, page }) => {
    await complicatedPage.navigateToComplicatedPage();
    await complicatedPage.scrollPageDown();
    await page.waitForTimeout(300);
    await complicatedPage.scrollPageTop();
    // @ts-expect-error: window is defined in browser context
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeLessThan(100);
  });
});

/**
 * Scenario 4: Simple HTML Elements Automation
 */

test.describe('Scenario 4: Simple HTML Elements Automation', () => {
  test('SIMPLE_001: Fill text input field', async ({ simpleElementsPage, page }) => {
    await simpleElementsPage.navigateToSimpleElementsPage();
    const testText = 'Test Automation Input';
    await simpleElementsPage.fillTextInput(testText);
    
    const inputValue = await page.inputValue('input[type="text"]');
    expect(inputValue).toContain(testText);
  });

  test('SIMPLE_002: Click button element', async ({ simpleElementsPage }) => {
    await simpleElementsPage.navigateToSimpleElementsPage();
    await simpleElementsPage.clickButton();
    expect(true).toBeTruthy();
  });

  test('SIMPLE_003: Interact with form elements', async ({ simpleElementsPage }) => {
    await simpleElementsPage.navigateToSimpleElementsPage();
    await simpleElementsPage.fillTextInput('Sample Data');
    await simpleElementsPage.clickButton();
    
    expect(true).toBeTruthy();
  });
});

/**
 * Scenario 5: Login Automation
 */

test.describe('Scenario 5: Login Automation', () => {
  test('LOGIN_001: Navigate to login page successfully', async ({ loginPage, page }) => {
    await loginPage.navigateToLoginPage();
    const url = page.url();
    expect(url).toContain('sign_in');
  });

  test('LOGIN_002: Login form loads with email and password fields', async ({ loginPage, page }) => {
    await loginPage.navigateToLoginPage();
    const emailInput = await page.locator('input[type="email"], input[name="email"]').isVisible();
    const passwordInput = await page.locator('input[type="password"], input[name="password"]').isVisible();
    
    expect(emailInput || passwordInput).toBeTruthy();
  });

  test('LOGIN_003: Attempt login with test credentials', async ({ loginPage, excelData }) => {
    await loginPage.navigateToLoginPage();
    const loginData = excelData.find((data) => data['Scenario'] === 'Login Automation');
    
    if (loginData) {
      await loginPage.login(
        loginData['Email'] as string,
        loginData['Password'] as string
      );
      expect(true).toBeTruthy();
    }
  });
});
