## cypres-test-road

**Summary:**
A simple example project for end-to-end testing with **Cypress**.

Contains tests in `cypress/test01`, `cypress/test02`, and `cypress/test03`.

---

### Prerequisites
- Node.js (v14+)
- npm

### Installation
```bash
npm install
```

### Running tests
- Open the Cypress interactive UI:
```bash
npx cypress open
```
- Run all tests headless (suitable for CI):
```bash
npx cypress run
```
- Run a specific test file:
```bash
npx cypress run --spec "cypress/test03/evershop.cy.js"
```

### Generating reports (mochawesome)
Example command to run with mochawesome reporter:
```bash
npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports,overwrite=false,html=false,json=true
```

### Project structure
- `cypress/fixtures/` - test data
- `cypress/screenshots/` - screenshots (on failures)
- `cypress/test01/`, `cypress/test02/`, `cypress/test03/` - test files
- `cypress.config.js` - Cypress config

### Tips
- Store test data in `cypress/fixtures` and load it from your tests.
- Use `--spec` to run a subset of tests during development.

---
### License
See `LICENSE` for license details.

---