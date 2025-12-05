import { test as base, Page, BrowserContext } from '@playwright/test';
import { FormPage } from '../pages/FormPage';
import { LandingPage } from '../pages/LandingPage';
import { ComplicatedPage } from '../pages/ComplicatedPage';
import { SimpleElementsPage } from '../pages/SimpleElementsPage';
import { LoginPage } from '../pages/LoginPage';
import { ExcelDataReader, TestData } from '../utils/excelDataReader';
import * as path from 'path';

type PageObjects = {
  formPage: FormPage;
  landingPage: LandingPage;
  complicatedPage: ComplicatedPage;
  simpleElementsPage: SimpleElementsPage;
  loginPage: LoginPage;
};

type TestDataFixture = {
  testDataReader: ExcelDataReader;
  testData: TestData[];
};

/**
 * Custom Fixtures for Page Objects and Test Data
 */
export const test = base.extend<PageObjects & TestDataFixture>({
  // Page Objects Fixtures
  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await use(formPage);
  },

  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },

  complicatedPage: async ({ page }, use) => {
    const complicatedPage = new ComplicatedPage(page);
    await use(complicatedPage);
  },

  simpleElementsPage: async ({ page }, use) => {
    const simpleElementsPage = new SimpleElementsPage(page);
    await use(simpleElementsPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Test Data Fixture
  testDataReader: async ({}, use) => {
    const dataPath = path.join(__dirname, '../../data/test-data.xlsx');
    const reader = new ExcelDataReader(dataPath);
    await use(reader);
  },

  testData: async ({ testDataReader }, use) => {
    const data = testDataReader.getSheetData('TestData');
    await use(data);
  },
});

export { expect } from '@playwright/test';
