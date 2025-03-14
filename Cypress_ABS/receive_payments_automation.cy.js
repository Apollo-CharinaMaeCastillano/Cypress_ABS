// import 'cypress-iframe'

describe('Billing Portal Login Test', () => {
  // Suppress the ResizeObserver error
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return false; // Ignore this error
    }
  });

  it('should log in successfully with valid credentials', () => {
    // Visit the billing portal
    cy.visit('https://billing-test.payconnect.io/');

    // Set viewport size for a consistent testing environment
    cy.viewport(1920, 1080);

    


    // Enter username

    cy.get('#username')
      .click()
      .type('billing.admin.tester', { delay: 100 });


    // Enter password
    cy.get('#password')
      .click()

      .type('HelloWorld000!', { delay: 100 });

    // Click the login button
    cy.get('#kc-login').click();


    // Wait for login and for the dialog to potentially disappear

    cy.wait(2000);

    // Verify dashboard and main options
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Accounts').should('be.visible');

    cy.contains('Transactions').should('be.visible');

    cy.contains('Settings').should('be.visible');

   

cy.get('.q-list > :nth-child(2) > .div')
.should ('be.visible')
.click()
cy.wait (2000);

cy.get('#search-id').click().type('900018 {enter}', {delay:200});
cy.wait(2000);

cy.get('.border-b > :nth-child(2) > .flex-row')
.click()
cy.wait(2000);

cy.contains('p.text-sm.font-medium', 'View bills')
  .should('be.visible')
  .click();
cy.wait(3000);

cy.get('.text-white > .q-btn__content').click()
cy.wait(4000);

cy.get('.text-primary-600 > .q-btn__content > .flex > .text-base').click()
cy.wait(2000);
cy.get('.text-white > .q-btn__content').click()
cy.wait(4000);


// Step 1: Click the dropdown trigger to open the dropdown
cy.get('div.mb-4:nth-child(1) > div:nth-child(2)')  // Target the dropdown trigger element
  .click();  // Click to open the dropdown
cy.wait(4500);
// Step 2: Wait for the dropdown to open (optional, adjust the wait time if needed)
cy.wait(5500);  // Optional wait time to allow the dropdown options to appear

// Step 3: Find all the options in the dropdown, filter out the option with value '0', and select the first valid one
cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')  // Target the <select> element
  .find('option')  // Find all the <option> elements
  .not(':contains("None")')  // Exclude options with the text '0'
  .first()  // Select the first valid option that is not equal to "0"
  .then((firstOption) => {
    const value = firstOption.val();  // Get the value of the first valid option
    cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')  // Re-target the <select> element
      .select(value);  // Select the option with the first valid value
  });

  // Step 1: Click the dropdown trigger to open the dropdown
cy.get('div.mb-4:nth-child(1) > div:nth-child(2)')  // Target the dropdown trigger element
.click();  // Click to open the dropdown
cy.wait(4500);
// Step 2: Wait for the dropdown to open (optional, adjust the wait time if needed)
cy.wait(5500);  // Optional wait time to allow the dropdown options to appear

// Step 3: Find all the options in the dropdown, filter out the option with value '0', and select the first valid one
cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')  // Target the <select> element
.find('option')  // Find all the <option> elements
.not(':contains("None")')  // Exclude options with the text '0'
.first()  // Select the first valid option that is not equal to "0"
.then((firstOption) => {
  const value = firstOption.val();  // Get the value of the first valid option
  cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')  // Re-target the <select> element
    .select(value);  // Select the option with the first valid value
});

// Optional: Verify that the selection has been made (check the value of the select)
cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
  .should('not.have.value', 'None');  // Verify that the selected value is not '0'

/// Optional: Verify that the selection has been made (check the value of the select)
cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
  .should('not.have.value', 'None');  // Verify that the selected value is not 'None'

// Optional: Verify that the selection has been made (check the value of the select)
cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
  .should('not.have.value', 'None');  // Verify that the selected value is not 'None'

// Step 1: Select the "Monthly Service Fee" from the dropdown
cy.get('div.mb-4:nth-child(3) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
  .select('Monthly Service Fee');  // Use the text or value that corresponds to the "Monthly Service Fee" option

// Optional: Wait for a moment to ensure the selection is applied
cy.wait(3000);

// Optional: Verify that the selection has been correctly applied
cy.get('div.mb-4:nth-child(3) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
  .should('have.value', 'Monthly Service Fee');  // Ensure the value has been set to "Monthly Service Fee"

// Step 1: Select the "Cash" payment method from the dropdown
cy.get('div.mb-4:nth-child(4) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
  .select('Cash');  // Use the exact visible text or value of the "Cash" option

// Optional: Wait for a moment to ensure the selection is applied
cy.wait(3000);

// Optional: Verify that the correct value ("Cash") has been selected
cy.get('div.mb-4:nth-child(4) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
  .should('have.value', 'Cash');  // Ensure the value has been set to "Cash"


  cy.get(':nth-child(4) > :nth-child(2) > .relative > .rounded-lg').click().type('221345', {delay:200})
  cy.wait(2000);

  cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white').click()
  cy.wait(3000);

  cy.get('.swal2-confirm').click()
  cy.wait(5500);

});

  });

