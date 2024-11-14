const { testGenAICypressTasksSetup } = require('@applitools/testgenai-cypress/tasks')
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            testGenAICypressTasksSetup(on);
        },
    },
    env: {
        applitoolsTestGenAI: {
            autohealDataFolders: ['cypress/testgenai/autoheal'],
        }
    }
});
