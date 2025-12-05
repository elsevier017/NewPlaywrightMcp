# 🚀 Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd playwright-framework
npm install
```

### Step 2: Generate Test Data
```bash
node generateTestData.js
```

### Step 3: Run Tests
```bash
npm test
```

### Step 4: View Results
```bash
npx playwright show-report
```

---

## Project Overview

✅ **5 Complete E2E Test Scenarios**
✅ **Page Object Model Architecture**
✅ **Data-Driven Testing with Excel**
✅ **Reusable Page Objects**
✅ **Comprehensive Test Coverage**

---

## Test Scenarios Summary

| # | Scenario | Tests | Focus |
|---|----------|-------|-------|
| 1 | Form Filling | 3 | Form submission with data-driven inputs |
| 2 | Landing Page Navigation | 3 | Page navigation and content verification |
| 3 | Complex Elements | 4 | Interaction with multiple elements |
| 4 | Simple Elements | 3 | Basic form element interactions |
| 5 | Login Automation | 3 | Login flow and authentication testing |

**Total: 15 Test Cases**

---

## File Structure

```
src/pages/           → Page Object Classes
src/utils/           → Utility Functions (Excel Reader)
tests/               → Test Specifications
data/                → Test Data (Excel)
```

---

## Next Steps

1. **Customize Test Data:** Edit `generateTestData.js`
2. **Add New Pages:** Create new file in `src/pages/`
3. **Add New Tests:** Update `tests/e2e.spec.js`
4. **Configure Playwright:** Edit `playwright.config.ts`

---

## Key Commands

```bash
npm test                  # Run all tests
npm run test:headed       # Run with visible browser
npm run test:debug        # Debug mode
npm run test:chrome       # Chrome only
node generateTestData.js  # Generate Excel data
```

---

**For detailed documentation, see [FRAMEWORK_GUIDE.md](./FRAMEWORK_GUIDE.md)**
