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
    
    // // Verify the login page elements
    // cy.contains('Sign in to DataConnect').should('be.visible');
    // cy.contains('Username or email').should('be.visible');
    // cy.contains('Password').should('be.visible');

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
    .click()
    .type('CHARINA {enter}', { delay: 100 });
  
  cy.wait(2000);
  
      cy.get('.border-b > :nth-child(2) > .flex-row')
      .click();
      cy.wait(2000);
      
      cy.get('.mb-2 > .q-btn')
      .should('be.visible')
      .click();
    cy.wait(2000);

    // Product Name
cy.get('.q-card__section >:nth-child(1) > :nth-child(2) > .relative > .rounded-lg').select('FG999');

// Verify that "FG999" is selected
cy.get('.q-card__section > :nth-child(1) > :nth-child(2) > .relative > .rounded-lg')
   .should('have.value', 'FG999'); // Confirm that "FG999" is selected

// Text Fields
cy.get(':nth-child(2) > :nth-child(1) > .relative > .rounded-lg').click().type('charina@apollotech.co', {delay: 100})  
cy.get(':nth-child(3) > [input-style="[object Object]"] > .relative > .rounded-lg').click().type('DAVAO CITY', {delay: 100})
cy.get(':nth-child(3) > :nth-child(2) > .relative > .rounded-lg').click().type('33212213', {delay:100})
cy.get(':nth-child(4) > [input-style="[object Object]"] > .relative > .rounded-lg').click().type('CHARINA CASTILLANO', {delay: 100})
// Open the calendar dropdown
cy.get('#q-portal--dialog--2 > div > div.q-dialog__inner.flex.no-pointer-events.q-dialog__inner--minimized.q-dialog__inner--standard.fixed-full.flex-center > div > form > div.q-card__section.q-card__section--vert.mt-4.p-0 > div:nth-child(4) > div:nth-child(2) > div > input')
  .should('be.visible')
  .type('2024-11-14'); // Input the date in YYYY-MM-DD format
  cy.get(':nth-child(5) > :nth-child(1) > .relative > .rounded-lg').click().type('24', {delay: 100})
  cy.get(':nth-child(6) > :nth-child(1) > .relative > .rounded-lg').click().type('0', {delay: 100})
  cy.get(':nth-child(7) > :nth-child(2) > .relative > .rounded-lg').click().type('160', {delay: 100})
  cy.get(':nth-child(7) > :nth-child(1) > .relative > .rounded-lg').click().type('202.137.119.5', {delay: 100})
  cy.get('.q-card__section > .q-btn')
  .should('be.visible')
  .click();
  cy.wait(2000);


    // Submit the form
    cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white').click();
    cy.wait(1000);  
  });
});
