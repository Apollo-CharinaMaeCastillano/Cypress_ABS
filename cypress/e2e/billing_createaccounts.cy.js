describe('Billing Portal Login Test', () => {
  describe('Billing Portal Login Test', () => {
    // Suppress the ResizeObserver error
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        return false; // Ignore this error
      }
    });
  
    it('should log in successfully with valid credentials', () => {
      // Visit the billing portal
      cy.visit('https://billing.payconnect.io');
  
      // Set viewport size for a consistent testing environment
      cy.viewport(1920, 1080);
      
      // Verify the login page elements
      cy.contains('Sign in to DataConnect').should('be.visible');
      cy.contains('Username or email').should('be.visible');
      cy.contains('Password').should('be.visible');
  
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
  
      // Ensure any potential dialog is closed
      cy.get('.q-dialog__backdrop').should('not.exist');
      cy.wait(5000); // Additional wait to ensure UI is stable
  
      // Interact with elements after login
      cy.get('.q-list > :nth-child(2) > .q-item__section--main')
        .should('be.visible')
        .click();
      cy.wait(2000);
  
      cy.get('.q-btn__content > div')
        .should('be.visible')
        .click();
      cy.wait(2000);
  
      // Open the first dropdown for Customer Type
      cy.get('input[aria-label="Customer Type"]')
        .scrollIntoView()
        .click(); // Click to open the dropdown
  
      // Wait for dropdown options to load
      cy.wait(1000); 
  
      // Click on the "SME" option in the dropdown
      cy.get('.q-menu .q-item').contains('SME').should('be.visible').click({ force: true });

     // Fill up Account Sheet 
      cy.get('input[aria-label="First Name *"]').click().type('John')
      cy.get('input[aria-label="Middle Name"]').click().type('Lennon')
      cy.get('input[aria-label="Last Name *"]').click().type('Doe')
      cy.get('input[aria-label="Name Suffix"]').click().type('Jr.')
      cy.get('input[aria-label="Contact Number *"]').click().type('09938834210')
      cy.get('input[aria-label="Address Line 1 *"]').click().type('Davao City *')
      cy.get('input[aria-label="Address Line 2 "]').click().type('Davao City, Davao del Sur ')
      cy.get('input[aria-label="City *"]').click().type('Davao City')
      
      // Interact with the second dropdown (Region)
    cy.get('input[aria-label="Region *"]').scrollIntoView().click(); // Open the dropdown
    cy.wait(1000); // Wait for dropdown options to load

    // Select "REGION XI - DAVAO REGION" from the dropdown options
    cy.get('.q-menu .q-item')
    .contains('REGION XI - DAVAO REGION') // Use exact text to target the region
    .should('be.visible') // Ensure the option is visible
    .click({ force: true }); // Click to select the option
    cy.wait(1000);


    // Interact with the Zip Code field
    cy.get('input[aria-label="Zip Code *"]').should('be.visible').click().type('4000', { delay: 100 });
    cy.wait(1000);

    // Interact with the Bill Cycle Day input (force click)
    cy.get('input[aria-label="Bill Cycle Day"]').scrollIntoView().click({ force: true });
    cy.wait(1000); // Wait for dropdown options to load

    // Select the bill cycle day
    cy.get('.q-menu .q-item').contains('15').should('exist').click({ force: true });
    cy.wait(1000);

    // Interact with the Note field
    cy.get('input[aria-label="Note"]').should('be.visible').click().type('This is a test note.', { delay: 100 });
    cy.wait(1000);

    // Submit the form
    cy.get('.q-btn--flat > .q-btn__content > .block').click();
    cy.wait(1000);  
  });
});
