# 🎭 Playwright E2E Automation Framework

## Project Overview

Complete **End-to-End Playwright Automation Framework** using **Page Object Model (POM)** pattern for testing [Ultimate QA Automation Practice](https://ultimateqa.com/automation) application.

### Technology Stack
- **Playwright** - Modern E2E testing framework
- **JavaScript** - Test implementation language
- **Page Object Model** - Design pattern for maintainability
- **Excel (XLSX)** - Data-driven testing with external data source
- **Node.js** - Runtime environment

---

## 📋 5 E2E Test Scenarios

### 1. **Form Filling and Submission**
- Navigate to form page
- Fill multiple form fields (First Name, Last Name, Email)
- Submit form and verify success
- **Test Cases:** FORM_001, FORM_002, FORM_003
- **Data Source:** Excel file with form test data

### 2. **Fake Landing Page Navigation**
- Navigate to landing page
- Verify page heading visibility
- Validate page content
- **Test Cases:** LANDING_001, LANDING_002, LANDING_003
- **Coverage:** Navigation, heading verification, content validation

### 3. **Big Page with Many Elements**
- Navigate to complicated page with multiple elements
- Count interactive elements
- Test scrolling functionality
- Verify page state during interactions
- **Test Cases:** COMPLEX_001, COMPLEX_002, COMPLEX_003, COMPLEX_004
- **Coverage:** Element counting, scrolling, page title verification

### 4. **Simple HTML Elements Automation**
- Navigate to simple elements practice page
- Fill text inputs
- Click buttons
- Interact with form controls
- **Test Cases:** SIMPLE_001, SIMPLE_002, SIMPLE_003
- **Coverage:** Text input, button clicks, form interactions

### 5. **Login Automation**
- Navigate to login page
- Verify login form presence
- Attempt login with credentials
- Handle login responses
- **Test Cases:** LOGIN_001, LOGIN_002, LOGIN_003
- **Data Source:** Excel file with login credentials

---

## 📁 Project Structure

```
playwright-framework/
├── src/
│   ├── pages/              # Page Object Classes
│   │   ├── BasePage.js     # Base class for all page objects
│   │   ├── FormPage.js     # Form filling page object
│   │   ├── LandingPage.js  # Landing page object
│   │   ├── ComplicatedPage.js  # Complex elements page object
│   │   ├── SimpleElementsPage.js  # Simple elements page object
│   │   └── LoginPage.js    # Login page object
│   └── utils/              # Utility classes
│       └── excelDataReader.js  # Excel file reader for data-driven testing
├── data/
│   └── test-data.xlsx      # Excel file with test data
├── tests/
│   └── e2e.spec.js         # Main test specification file
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── generateTestData.js    # Script to generate test data

```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Git (optional)

### Installation

1. Navigate to the framework directory:
```bash
cd playwright-framework
```

2. Install dependencies:
```bash
npm install
```

3. Generate test data (Excel file):
```bash
node generateTestData.js
```

---

## 📊 Data-Driven Testing

### Excel File Structure
The `data/test-data.xlsx` file contains test scenarios with the following columns:

| Scenario | Test ID | FirstName | LastName | Email | Password | Description |
|----------|---------|-----------|----------|-------|----------|-------------|
| Form Filling | FORM_001 | John | Doe | john.doe@example.com | | Valid form submission |
| Form Filling | FORM_002 | Jane | Smith | jane.smith@example.com | | Valid form submission |
| Login Automation | LOGIN_001 | | | student@example.com | password123 | Valid login |

### ExcelDataReader Utility
Located in `src/utils/excelDataReader.js`

**Usage:**
```javascript
const { ExcelDataReader } = require('./excelDataReader');
const reader = new ExcelDataReader('./data/test-data.xlsx');
const testData = reader.getSheetData('TestData');

testData.forEach(row => {
  console.log(row['Scenario'], row['Email']);
});
```

---

## 🏗️ Page Object Model Architecture

### BasePage Class
Base class for all page objects providing common methods:

```javascript
class BasePage {
  async goto(path)
  async fillInput(selector, text)
  async click(selector)
  async getText(selector)
  async isElementVisible(selector)
  async waitForPageLoad(timeout)
}
```

### Example: FormPage
```javascript
const formPage = new FormPage(page);
await formPage.navigateToFormPage();
await formPage.fillAndSubmitForm('John', 'Doe', 'john@example.com');
const isSubmitted = await formPage.isFormSubmitted();
```

---

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (visible browser)
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests on Chrome Only
```bash
npm run test:chrome
```

### Run Specific Test File
```bash
npx playwright test tests/e2e.spec.js
```

### Run Specific Test Suite
```bash
npx playwright test -g "Scenario 1"
```

### Generate HTML Report
```bash
npm test
npx playwright show-report
```

---

## 📝 Test Execution Details

### Configuration
- **Base URL:** https://ultimateqa.com
- **Browsers:** Chromium, Firefox, WebKit (configurable)
- **Timeout:** 5000ms (page load)
- **Retries:** 0 (local), 2 (CI/CD)
- **Screenshots:** On failure only
- **Traces:** On first retry

### Test Structure
Each test follows this pattern:
1. Initialize page object
2. Navigate to target page
3. Perform actions
4. Assert expected results

---

## 🔧 Customization

### Add New Test Data
Edit `generateTestData.js`:
```javascript
const testData = [
  {
    'Scenario': 'Your Scenario',
    'Test ID': 'TEST_001',
    'FirstName': 'Test',
    // ... other fields
  }
];
```

Then regenerate:
```bash
node generateTestData.js
```

### Add New Page Object
1. Create new file in `src/pages/`:
```javascript
const { BasePage } = require('./BasePage');

class NewPage extends BasePage {
  constructor(page) {
    super(page);
    // Define selectors
  }
  
  // Define methods
}

module.exports = { NewPage };
```

2. Use in tests:
```javascript
const newPage = new NewPage(page);
await newPage.navigateToNewPage();
```

---

## 📈 Test Results

### Expected Outcomes
- ✅ All 15 test cases should pass
- ✅ Form submission should succeed
- ✅ Page navigation should work
- ✅ Element interactions should execute without errors
- ✅ Login flow should complete

### HTML Report
View detailed test results:
```bash
npx playwright show-report
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
kill $(lsof -t -i:3000)
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Excel File Not Found
```bash
node generateTestData.js
```

### Timeout Issues
Increase timeout in `playwright.config.ts`:
```typescript
use: {
  timeout: 30000,
  navigationTimeout: 30000,
}
```

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Guide](https://playwright.dev/docs/pom)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Ultimate QA - Automation Practice](https://ultimateqa.com/automation)

---

## ✨ Key Features

✅ **Page Object Model** - Clean, maintainable code structure  
✅ **Data-Driven Testing** - External Excel data source  
✅ **Custom Base Page** - Reusable methods for all pages  
✅ **Multiple Browsers** - Test across Chrome, Firefox, Safari  
✅ **Comprehensive Reports** - HTML test reports with screenshots  
✅ **Error Handling** - Proper waits and assertions  
✅ **Modular Design** - Easy to extend with new test scenarios  

---

## 📝 License

This project is provided for educational and testing purposes.

---

**Last Updated:** December 4, 2025  
**Framework Version:** 1.0.0
