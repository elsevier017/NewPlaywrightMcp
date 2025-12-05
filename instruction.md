Act as a Senior SDET (Software Development Engineer in Test). I need you to build a complete, End-to-End Playwright Automation Framework using TypeScript and the Page Object Model (POM) from scratch.

**Target Application:** https://ultimateqa.com/automation

**Core Requirements:**
1.  **Exploration & Planning:**
    * Use your browsing tool to analyze the URL provided.
    * Identify 5 distinct End-to-End (E2E) scenarios suitable for automation (e.g., "Fill out Forms", "Fake Landing Page navigation", "Interaction with complicated elements").
    * List these scenarios before coding.

2.  **Data-Driven Setup (Excel):**
    * The framework must be data-driven.
    * Create a new Excel file named `test-data.xlsx` in a `data` folder.
    * Populate this Excel file with the specific test data required for the 5 scenarios you identified (e.g., names, emails, expected messages).
    * Implement a utility (e.g., using the `xlsx` library) to read this data into the tests.

3.  **Framework Architecture:**
    * **Language:** TypeScript.
    * **Pattern:** Page Object Model (POM).
    * **Fixtures:** You must use Playwright custom Fixtures (`test.extend`) to inject Page Objects and Data into the tests. Do not instantiate Page Objects inside the test blocks manually.
    * **Context:** Ensure proper Web Context handling (use `browserContext` effectively).

4.  **Execution:**
    * Generate all necessary files: `package.json`, `playwright.config.ts`, Page Classes, Fixture files, Excel reader utility, and the Test Spec file.
    * Write the code for the 5 scenarios in the test spec, ensuring they pull data dynamically from the Excel file/utility.

**Step-by-Step Instructions for you:**
1.  Browse the site and outline the 5 scenarios.
2.  Create the project structure and install necessary dependencies (playwright, xlsx, etc.) if you have terminal access, or provide the command.
3.  Generate the `test-data.xlsx` file (or a script to generate it).
4.  Write the Page Objects.
5.  Write the Custom Fixtures.
6.  Write the Test Spec file.

Begin by analyzing the website and proposing the 5 scenarios.