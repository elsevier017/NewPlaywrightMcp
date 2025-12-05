# 🧑‍💻 Copilot Instructions for PlaywrightMcpTest

## Project Overview
- **PlaywrightMcpTest** is a multi-server E2E automation project using Playwright, with MCP (Model Context Protocol) servers for web, filesystem, Excel, and REST API operations.
- The main automation framework is in `playwright-framework/`, using the Page Object Model (POM) and data-driven testing via Excel.

## Architecture & Key Components
- **MCP Servers**: Started via shell scripts (`start-playwright.sh`, `start-excel.sh`, etc.) in the root. Each server handles a specific domain (web, Excel, filesystem, REST API).
- **Framework Structure**:
  - `src/pages/`: 6 Page Object classes (JS & TS) for different app sections (FormPage, LandingPage, ComplicatedPage, SimpleElementsPage, LoginPage, BasePage).
  - `src/utils/excelDataReader.js|ts`: Reads Excel files for test data.
  - `src/fixtures/`: Playwright fixtures (TypeScript).
  - `tests/e2e.spec.js|ts`: Main test suite, 15 test cases across 5 scenarios.
  - `data/test-data.xlsx`: Central Excel file for data-driven tests.
  - `playwright.config.ts`, `tsconfig.json`, `package.json`: Config and dependencies.

## Developer Workflows
- **Start Servers**: Use shell scripts in project root. Example:
  - `bash start-playwright.sh` (web automation)
  - `bash start-excel.sh` (Excel integration)
- **Install Dependencies**:
  - `cd playwright-framework && npm install`
- **Run Tests**:
  - `npm test` (from `playwright-framework/`)
- **View Test Reports**:
  - `npx playwright show-report` (HTML report)
- **Test Data**:
  - All test scenarios use data from `data/test-data.xlsx` via the Excel reader utility.

## Project-Specific Patterns & Conventions
- **Page Object Model**: All page interactions are abstracted in classes under `src/pages/`. Always extend `BasePage` for new page objects.
- **Data-Driven Testing**: Use `excelDataReader` utility to load test data. Test cases reference Excel rows for input values.
- **Test Naming**: Test cases are named by scenario and function (e.g., `FORM_001`, `LOGIN_003`).
- **Cross-Browser**: Tests run on Chromium, Firefox, and WebKit by default.
- **TypeScript/JavaScript**: Both are supported; prefer TypeScript for new code.
- **Documentation**: See `FRAMEWORK_GUIDE.md` and `README.md` in `playwright-framework/` for architecture and usage details.

## Integration Points
- **Excel Integration**: All form and login tests use Excel data. Update `test-data.xlsx` to add new test cases.
- **Custom Scripts**: Use `generateTestData.js` to create or update Excel test data.
- **Configuration**: Adjust `playwright.config.ts` for browser settings, timeouts, and test options.

## Example Workflow
```bash
# Start Playwright MCP server
bash start-playwright.sh

# Start Excel MCP server
bash start-excel.sh

# Run E2E tests
cd playwright-framework
npm install
npm test

# View report
npx playwright show-report
```

## Key Files & Directories
- `src/pages/` — Page Object classes
- `src/utils/excelDataReader.js|ts` — Excel data utility
- `tests/e2e.spec.js|ts` — Main test suite
- `data/test-data.xlsx` — Test data source
- `FRAMEWORK_GUIDE.md` — Architecture and usage
- `playwright.config.ts` — Playwright config

---

**For new agents:**
- Always check for updated test data in `data/test-data.xlsx`.
- Follow the Page Object Model for new page interactions.
- Reference `FRAMEWORK_GUIDE.md` for architectural decisions and conventions.
- Use provided shell scripts to start required MCP servers before running tests.
