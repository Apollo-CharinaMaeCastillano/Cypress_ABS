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
      cy.get('.q-list > :nth-child(2) > .div')
        .should('be.visible')
        .click();
      cy.wait(2000);
        
      cy.get('#search-id')
        .should('be.visible')
        .click().type('CHARINA MAE CASTILLANO', {delay: 100});

      cy.get('.q-btn__content > div')
        .should('be.visible')
        .click();
      cy.wait(2000);
  // Step 1: Directly select "SME" from the dropdown
  cy.get('.q-card__section > :nth-child(1) > .relative > .rounded-lg').select('SME');
  
  // Step 2: Verify that "SME" is selected
  cy.get('.q-card__section > :nth-child(1) > .relative > .rounded-lg')
     .should('have.value', 'SME'); // Confirm that "SME" is selected
  
  
      // Fill out the form fields using chained commands
      cy.get('.q-card__section > :nth-child(2) > :nth-child(1) > .relative > .rounded-lg').as('firstNameInput');
      cy.get('@firstNameInput').should('be.visible').click().type('Charina Mae', { delay: 100 });
      cy.get(':nth-child(2) > :nth-child(2) > .relative > .rounded-lg').should('be.visible').click().type('Remonde',{delay: 100});
      cy.get(':nth-child(3) > .relative > .rounded-lg').should('be.visible').click().type('Castillano', { delay: 100 });
      cy.get(':nth-child(3) > :nth-child(1) > .relative > .rounded-lg').should('be.visible').click().type('09938834210', { delay: 100 });
      cy.get(':nth-child(3) > :nth-child(2) > .relative > .rounded-lg').should('be.visible').click().type('charina@gmail.com', { delay: 100 });
      cy.get(':nth-child(4) > :nth-child(1) > .relative > .rounded-lg').should('be.visible').click().type('Obrero Office', { delay: 100 });
      cy.get(':nth-child(5) > [input-style="[object Object]"] > .relative > .rounded-lg').should('be.visible').click().type('Davao City', { delay: 100 });
  
      // Interact with the second dropdown (Region)
      cy.get(':nth-child(5) > :nth-child(2) > .relative > .rounded-lg').select('REGION XI - DAVAO REGION'); // Open the dropdown
      cy.wait(1000); // Wait for dropdown options to load
  
      // Step 1: Directly select "Region" from the dropdown
    cy.get('.q-card__section > :nth-child(5) > :nth-child(2) > .relative > .rounded-lg').select('REGION XI - DAVAO REGION');
  
    // Step 2: Verify that "REION XI - DAVAO REGION" is selected
    cy.get('.q-card__section > :nth-child(5) > :nth-child(2) > .relative > .rounded-lg')
     .should('have.value', 'REGION XI - DAVAO REGION'); // Confirm that "REGION XI - DAVAO REGION" is selected
  
  
      // Interact with the Zip Code field
      cy.get(':nth-child(6) > :nth-child(1) > .relative > .rounded-lg').should('be.visible').click().type('8000', { delay: 100 });
      cy.wait(1000);
  
      // Interact with the Bill Cycle Day input (force click)
      cy.get('.q-card__section > :nth-child(6) > :nth-child(2) > .relative > .rounded-lg').select('15');
      cy.wait(1000); // Wait for dropdown options to load
  
      // Interact with the Note field
      cy.get(':nth-child(7) > .relative > .rounded-lg').should('be.visible').click().type('NEW CLIENT', { delay: 100 });
      cy.wait(1000);
  
      // Submit the form
      cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white').click();
      cy.wait(1000);  
    });
  });
  