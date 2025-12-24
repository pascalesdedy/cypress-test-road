const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    supportFile: false,
    specPattern: [
      'cypress/test01/**/*.cy.{js,ts}',
      'cypress/test02/**/*.cy.{js,ts}',
      'cypress/test03/**/*.cy.{js,ts}'
    ]
  }
});
