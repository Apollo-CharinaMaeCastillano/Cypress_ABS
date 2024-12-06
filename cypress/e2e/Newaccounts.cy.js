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
    
    // Verify the login page elements
    // cy.contains('Sign in to DataConnect').should('be.visible');
    // cy.contains('Username or email').should('be.visible');
    // cy.contains('Password').should('be.visible');

    // cy.contains('.w-screen').should('be.visible');
    // cy.contains('Email*').should('be.visible');
    // cy.contains('Password*').should('be.visible');

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
    cy.get('.q-card__section > :nth-child(6) > :nth-child(2) > .relative > .rounded-lg').select('30');
    cy.wait(1000); // Wait for dropdown options to load

    // Interact with the Note field
    cy.get(':nth-child(7) > .relative > .rounded-lg').should('be.visible').click().type('NEW CLIENT', { delay: 100 });
    cy.wait(1000);

    // Submit the form
    cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white').click();
    cy.wait(1000);  

      // Interact with elements after login
      cy.get('.q-list > :nth-child(2) > .div')
      .should('be.visible')
      .click();
    cy.wait(2000);
      
    cy.get('#search-id')
    .should('be.visible')
    .click()
    .type('TANGHAL {enter}', { delay: 100 });
  
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
// Select the date input element
cy.get(':nth-child(4) > :nth-child(2) > .relative > .rounded-lg')
  .click() // Ensure the field is focused
  .clear() // Clear any pre-filled value
  .type('2024-11-01', { delay: 100 }); // Type the date in YYYY-MM-DD format

  cy.get(':nth-child(5) > :nth-child(1) > .relative > .rounded-lg').click().type('24', {delay: 100})
  cy.get(':nth-child(6) > :nth-child(1) > .relative > .rounded-lg').click().type('0', {delay: 100})
  cy.get(':nth-child(7) > :nth-child(2) > .relative > .rounded-lg').click().type('160', {delay: 100})
  cy.get(':nth-child(7) > :nth-child(1) > .relative > .rounded-lg').click().type('202.137.119.5', {delay: 100})
  cy.get('.q-card__section > .q-btn')
  .should('be.visible')
  .click();
  cy.wait(2000);
  cy.get('.q-btn__content > .q-icon')
  .should('be.visible')
  .click();
  cy.wait(2000);
    // Submit the form
    cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white').click();
    cy.wait(3000);  
    cy.get('.swal2-confirm').click();
    //FOR ADDING CREDITS (1 MONTH ADVANCE PAYMENT 999 + INSTALLATION FEE ADVANCE PAYMENT + OTHER OTC )
    cy.wait(4000);
  
      cy.get('.q-mb-md > :nth-child(2) > :nth-child(2)')
      .click();
      cy.wait(2000);
      cy.get(':nth-child(1) > .relative > .rounded-lg').click().type('4359', {delay:200})
      // Step 1: Directly select "100 - Courtesy" from the dropdown
  cy.get('.q-card__section > :nth-child(2) > .relative > .rounded-lg').select('100 - Courtesy');

  // Step 2: Verify that "00 - Courtesy" is selected
  cy.get('.q-card__section > :nth-child(2) > .relative > .rounded-lg')
   .should('have.value', '100 - Courtesy'); // Confirm that "101 - Billing Error" is selected
      
   cy.get('[input-style="[object Object]"] > .relative > .rounded-lg').click().type('1 Month Advance Payment MRR + Installation Fee advance payment (Php 3360)', {delay:200})
      cy.wait(3000);  
      cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
      .should('be.visible')
      .click();
      cy.wait(4000);
      cy.get('.swal2-confirm')
      .click();
      cy.wait(3000);


      // FOR ADDING CHARGES ( CHARGES SHOULD BE INSTALLATION FEE 3360 )
  
      cy.contains('p.text-sm.font-medium', 'View bills')
     .should('be.visible')
      .click();


    // Fill the "Charge Name" field
    cy.get(':nth-child(4) > .relative > .rounded-lg')
      .click()
      .clear() // Ensure no pre-filled value exists
      .type('2024-11-01', { delay: 100 });

    // Fill the "Description" field
    cy.get(':nth-child(5) > .relative > .rounded-lg')
      .click()
      .clear()
      .type('Installation Fee Charge', { delay: 100 });

    // Submit the form
    cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
      .should('be.visible') // Confirm the button is visible
      .click();

  });
});
