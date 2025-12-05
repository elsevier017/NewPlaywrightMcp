import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Generate Excel test data file
 * This script creates the test-data.xlsx file with sample data for all test scenarios
 */

const dataDir = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create workbook and worksheet
const workbook = XLSX.utils.book_new();

// Test data for Form Filling scenario
const formTestData = [
  {
    'Test ID': 'FORM_001',
    'FirstName': 'John',
    'LastName': 'Doe',
    'Email': 'john.doe@example.com',
    'Description': 'Valid form submission with standard data'
  },
  {
    'Test ID': 'FORM_002',
    'FirstName': 'Jane',
    'LastName': 'Smith',
    'Email': 'jane.smith@example.com',
    'Description': 'Valid form submission with different data'
  },
  {
    'Test ID': 'FORM_003',
    'FirstName': 'Robert',
    'LastName': 'Johnson',
    'Email': 'robert.j@example.com',
    'Description': 'Valid form submission with another data set'
  }
];

// Test data for Landing Page Navigation
const landingPageData = [
  {
    'Test ID': 'LANDING_001',
    'PageUrl': '/fake-landing-page',
    'ExpectedTitle': 'Fake Landing Page',
    'Description': 'Navigate to landing page and verify title'
  },
  {
    'Test ID': 'LANDING_002',
    'PageUrl': '/fake-landing-page',
    'LinkText': 'Features',
    'Description': 'Click on features link'
  }
];

// Test data for Complicated Page
const complicatedPageData = [
  {
    'Test ID': 'COMPLEX_001',
    'PageUrl': '/complicated-page',
    'Action': 'CountElements',
    'Description': 'Count all interactive elements on complicated page'
  },
  {
    'Test ID': 'COMPLEX_002',
    'PageUrl': '/complicated-page',
    'Action': 'ScrollPage',
    'Description': 'Scroll through complicated page and verify content'
  }
];

// Test data for Simple Elements
const simpleElementsData = [
  {
    'Test ID': 'SIMPLE_001',
    'PageUrl': '/simple-html-elements-for-automation/',
    'InputText': 'Test Input Data',
    'Description': 'Fill text input field'
  },
  {
    'Test ID': 'SIMPLE_002',
    'PageUrl': '/simple-html-elements-for-automation/',
    'SelectOption': 'Option1',
    'Description': 'Select dropdown option'
  }
];

// Test data for Login
const loginTestData = [
  {
    'Test ID': 'LOGIN_001',
    'Email': 'student@example.com',
    'Password': 'password123',
    'Description': 'Login with valid credentials'
  },
  {
    'Test ID': 'LOGIN_002',
    'Email': 'invalid@example.com',
    'Password': 'wrongpassword',
    'Description': 'Login attempt with invalid credentials'
  },
  {
    'Test ID': 'LOGIN_003',
    'Email': 'test@example.com',
    'Password': 'testpass',
    'Description': 'Another valid login attempt'
  }
];

// Combine all test data
const testData = [
  {
    'Scenario': 'Form Filling',
    'Test ID': 'FORM_001',
    'FirstName': 'John',
    'LastName': 'Doe',
    'Email': 'john.doe@example.com',
    'Password': '',
    'Description': 'Valid form submission with standard data'
  },
  {
    'Scenario': 'Form Filling',
    'Test ID': 'FORM_002',
    'FirstName': 'Jane',
    'LastName': 'Smith',
    'Email': 'jane.smith@example.com',
    'Password': '',
    'Description': 'Valid form submission with different data'
  },
  {
    'Scenario': 'Landing Page Navigation',
    'Test ID': 'LANDING_001',
    'FirstName': '',
    'LastName': '',
    'Email': '',
    'Password': '',
    'Description': 'Navigate to landing page and verify'
  },
  {
    'Scenario': 'Complicated Page Interaction',
    'Test ID': 'COMPLEX_001',
    'FirstName': '',
    'LastName': '',
    'Email': '',
    'Password': '',
    'Description': 'Count interactive elements'
  },
  {
    'Scenario': 'Simple Elements Automation',
    'Test ID': 'SIMPLE_001',
    'FirstName': '',
    'LastName': '',
    'Email': '',
    'Password': '',
    'Description': 'Fill text input field'
  },
  {
    'Scenario': 'Login Automation',
    'Test ID': 'LOGIN_001',
    'FirstName': '',
    'LastName': '',
    'Email': 'student@example.com',
    'Password': 'password123',
    'Description': 'Valid login attempt'
  }
];

// Create and add worksheet
const worksheet = XLSX.utils.json_to_sheet(testData);
XLSX.utils.book_append_sheet(workbook, worksheet, 'TestData');

// Write file
const filePath = path.join(dataDir, 'test-data.xlsx');
XLSX.writeFile(workbook, filePath);

console.log(`✅ Test data file created successfully at: ${filePath}`);
console.log(`📊 Total test cases: ${testData.length}`);
