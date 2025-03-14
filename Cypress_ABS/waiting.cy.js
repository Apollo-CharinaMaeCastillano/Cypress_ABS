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

    
    //Verify the login page elements

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

    // // Verify dashboard and main options
    // cy.contains('Dashboard').should('be.visible');
    // cy.contains('Accounts').should('be.visible');

    // cy.contains('Transactions').should('be.visible');

    // cy.contains('Settings').should('be.visible');

    // Ensure any potential dialog is closed
    cy.get('.q-dialog__backdrop').should('not.exist');
    cy.wait(5000); // Additional wait to ensure UI is stable

//     // ********* FOR ACCOUNT CREATION  ************

    // Interact with elements after login
    cy.get('.q-list > :nth-child(2) > .div')
      .should('be.visible')
      .click();
    cy.wait(2000);

    cy.get('.q-btn__content > div')
      .should('be.visible')
      .click();
    cy.wait(2000);
// Step 1: Directly select "Residential" from the dropdown
cy.get('.q-card__section > :nth-child(1) > .relative > .rounded-lg').select('Residential');

// Step 2: Verify that "Residential" is selected
cy.get('.q-card__section > :nth-child(1) > .relative > .rounded-lg')
   .should('have.value', 'Residential'); // Confirm that "Residential" is selected


    // Fill out the form fields using chained commands
    cy.get('.q-card__section > :nth-child(2) > :nth-child(1) > .relative > .rounded-lg').as('firstNameInput');
    cy.get('@firstNameInput').should('be.visible').click().type('RENIER', { delay: 100 });
    cy.get(':nth-child(2) > :nth-child(2) > .relative > .rounded-lg').should('be.visible').click().type('M.',{delay: 100});
    cy.get(':nth-child(3) > .relative > .rounded-lg').should('be.visible').click().type('MOLINA', { delay: 100 });
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

    cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white').click();
    cy.wait(2000);

    // Submit the form
    cy.get('.swal2-confirm').click();
    cy.wait(3000);
     



     cy.get('.q-list > :nth-child(2) > .div').click();
    cy.wait(2000);
    cy.get('.q-list > :nth-child(2) > .div').click(); // Click on the desired item
    cy.wait(2000); // Wait for any necessary loading or UI updates
    
    cy.get('#search-id') // Target the input field
      .click() // Focus on the input field
      .clear() // Clear any existing text
      .type('RENIER {enter}', { delay: 200 }); // Type the new text with a delay
    
    cy.wait(3000); // Wait for any results or UI updates

    

    
      
      // ******* FOR SUBSCRIPTION CREATION ********

    // cy.get('.q-list > :nth-child(2) > .div').click();
    // cy.wait(2000);

    //  cy.get('#search-id').click().type('133563 {enter}', {delay:200});
    
  cy.wait(2000);
  
    // cy.get('tbody > :nth-child(2) > :nth-child(2) > .flex-row')
    // .click();
    // cy.wait(3000);

     cy.get('.border-b > :nth-child(2) > .flex-row')
      .click();
      cy.wait(3000);
      
      cy.get('.justify-between > .q-btn')
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
  .type('2025-01-08', { delay: 100 }); // Type the date in YYYY-MM-DD format

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



    // ********** FOR ADDING CREDITS ************ 
    
    cy.get('.q-list > :nth-child(2) > .div')
    .click();
    cy.wait(2000);

      cy.get('#search-id').click().type('RENIER {enter}', {delay:200});
      cy.wait(2000);
  
     cy.get('.border-b > :nth-child(2) > .flex-row')
    .click();
    cy.wait(3000);

    // (INSTALLATION FEE ADVANCE PAYMENT PHP 3360)
    cy.wait(4000);
  
      cy.get('.q-mb-md > :nth-child(2) > :nth-child(2)')
      .click();
      cy.wait(3000);
      cy.get(':nth-child(1) > .relative > .rounded-lg').click().type('3360', {delay:200})
      // Step 1: Directly select "100 - Courtesy" from the dropdown
  cy.get('.q-card__section > :nth-child(2) > .relative > .rounded-lg').select('100 - Courtesy');

  // Step 2: Verify that "100 - Courtesy" is selected
  cy.get('.q-card__section > :nth-child(2) > .relative > .rounded-lg')
   .should('have.value', '100 - Courtesy'); // Confirm that "100 Courtesy" is selected
      
   cy.get('[input-style="[object Object]"] > .relative > .rounded-lg').click().type('Installation Fee advance payment (Php 3360)', {delay:200})
      cy.wait(3000);  
      cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
      .should('be.visible')
      .click();
      cy.wait(4000);
      cy.get('.swal2-confirm')
      .click();
      cy.wait(3000);

     // (1 MONTH ADVANCE PAYMENT 999) 

     cy.wait(4000);
  
      cy.get('.q-mb-md > :nth-child(2) > :nth-child(2)')
      .click();
      cy.wait(3000);
      cy.get(':nth-child(1) > .relative > .rounded-lg').click().type('999', {delay:200})
      // Step 1: Directly select "100 - Courtesy" from the dropdown
  cy.get('.q-card__section > :nth-child(2) > .relative > .rounded-lg').select('100 - Courtesy');

  // Step 2: Verify that "100 - Courtesy" is selected
  cy.get('.q-card__section > :nth-child(2) > .relative > .rounded-lg')
   .should('have.value', '100 - Courtesy'); // Confirm that "100 Courtesy" is selected
      
   cy.get('[input-style="[object Object]"] > .relative > .rounded-lg').click().type('1 MONTH ADVANCE MRR PAYMENT PHP 999', {delay:200})
      cy.wait(3000);  
      cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
      .should('be.visible')
      .click();
      cy.wait(4000);
      cy.get('.swal2-confirm')
      .click();
      cy.wait(3000);


      // ***** FOR ADDING CHARGES ( CHARGES SHOULD BE INSTALLATION FEE 3360 ) ******
  
      cy.get('.q-list > :nth-child(2) > .div')
      .click();
      cy.wait(2000);
  
        cy.get('#search-id').click().type('RENIER {enter}', {delay:200});
        cy.wait(2000);
    
       cy.get('.border-b > :nth-child(2) > .flex-row')
      .click();
      cy.wait(3000);
  
      // (CHARGE FOR INSTALLATION FEE PHP 3360)
      cy.wait(4000);
    
      cy.contains('p.text-sm.font-medium', 'View bills')
     .should('be.visible')
     .click();
      cy.wait(4000);

    // Fill the "Charge Name" field
    cy.get('.text-gray-iron-900 > .q-btn__content > .flex > .text-base')
    .click()
    cy.wait(4000);
    
    cy.get('.q-card__section > :nth-child(1) > .relative > .rounded-lg').click().type('0001', {delay:200})
    cy.wait(4000);

    // Ensure the <select> element is visible or exists
    cy.get('select.rounded-lg').should('exist').and('be.visible');

    // Select the desired option by its value
    cy.get('select.rounded-lg').select('Installation-Fee_Res-or-SME');

    // Verify the selection
    cy.get('select.rounded-lg')
    .should('have.value', 'Installation-Fee_Res-or-SME');

    cy.wait(4000);

    cy.get(':nth-child(4) > .relative > .rounded-lg')
      .click()
      .clear() // Ensure no pre-filled value exists
      .type('2025-01-07', { delay: 200 });

    // Fill the "Description" field
    cy.get(':nth-child(5) > .relative > .rounded-lg')
      .click()
      .clear()
      .type('Installation Fee Charge', { delay: 100 });

    // // Submit the form
    // cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
    //   .should('be.visible') // Confirm the button is visible
    //   .click();
    //   cy.wait(3000);

    cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
     .should('be.visible') // Confirm the button is visible
      .click();
      cy.wait(3000);

      cy.get('.swal2-confirm')
      .click();
      cy.wait(3000);



      // ******* Log-in in KAUI to Advance the Time ******

  //     cy.visit('http://10.160.0.83:30001');

  //     // Set viewport size for a consistent testing environment
  //     cy.viewport(1920, 1080);
  
  
  //     // Enter username
  
  //     cy.get('#user_kb_username')
  //     .click()
  //       .type('admin', { delay: 200 });
  
  
  //     // Enter password
  //     cy.get('#user_password')
  //       .click()
  //       .type('password', { delay: 200 });
  
  //     // Click the login button
  //     cy.get('.btn').click();
  
  
  //     // Wait for login and for the dialog to potentially disappear
  
  //     cy.wait(2000);
    
  //   cy.visit('http://10.160.0.83:30001/admin');

  //   // Set viewport size for a consistent testing environment
  //   cy.viewport(1920, 1080);

  //     cy.wait(2000); // Wait for any results or UI updates
      
  //     cy.get('body div.container div.row div.col-md-12 div.column-block div form.form-horizontal div.form-group div.col-sm-2 input.form-control')
  // .focus()  // Optional: Focus the input field before entering the date
  // .clear()  // Clear the current value if any
  // .type('2025-01-30');  // Set the date to 2025-01-15

  //   cy.get('.btn-default')
  //   .click()
  //   cy.wait(2000);
  
  //     // cy.get('.btn-default')
  //     // .click()
  //     // cy.wait(2000);

  //     // cy.get('body div.container div.row div.col-md-12 div.column-block div form.form-horizontal div.form-group div.col-sm-2 input.form-control')
  //     // .focus()  // Optional: Focus the input field before entering the date
  //     // .clear()  // Clear the current value if any
  //     // .type('2025-01-16');  // Set the date to 2025-01-16
    
  //     //   cy.get('.btn-default')
  //     //   .click()
  //     //   cy.wait(2000);

    // ******** Receive Payments for MSF ********
              describe('Billing Portal Login Test', () => {
                // Suppress the ResizeObserver error
                Cypress.on('uncaught:exception', (err, runnable) => {
                  if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
                    return false; // Ignore this error
                  }
                });
              
                it('should log in successfully with valid credentials', () => {
                  // Visit the billing portal
                  cy.visit('https://billing-sbx.payconnect.io/');
              
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
              
                  // Select the first item in the menu
                  cy.get('.q-list > :nth-child(2) > .div')
                    .should('be.visible')
                    .click();
                  cy.wait(2000);
              
                  // Search for the user "RENIER"
                  cy.get('#search-id').click().type('RENIER {enter}', { delay: 200 });
                  cy.wait(2000);
              
                  cy.get('.border-b > :nth-child(2) > .flex-row')
                  .click();
                cy.wait(2000);
              
                // View bills
                cy.contains('p.text-sm.font-medium', 'View bills')
                  .should('be.visible')
                  .click();
                cy.wait(3000);
              
                // Perform the necessary actions for the dropdowns
                cy.get('.text-white > .q-btn__content').click();
                cy.wait(2000);
              
                cy.get('.text-primary-600 > .q-btn__content > .flex > .text-base').click();
                cy.wait(2000);
                cy.get('.text-white > .q-btn__content').click();
                cy.wait(2000);
              
                // Click the dropdown trigger to open the dropdown
                cy.get('div.mb-4:nth-child(1) > div:nth-child(2)')
                  .click();  // Click to open the dropdown
                cy.wait(2500);
              
                // Wait for the dropdown to open (optional, adjust the wait time if needed)
                cy.wait(1500);  // Optional wait time to allow the dropdown options to appear
              
                // Find all the options in the dropdown, filter out the option with value '0', and select the first valid one
                cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
                  .find('option')
                  .not(':contains("None")')
                  .first()
                  .then((firstOption) => {
                    const value = firstOption.val();
                    cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
                      .select(value);  // Select the option with the first valid value
                  });
              
                // Select the "Monthly Service Fee" from the dropdown
                cy.get('div.mb-4:nth-child(3) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
                  .select('Monthly Service Fee');
                cy.wait(2000);
              
                // Select the "Cash" payment method from the dropdown
                cy.get('div.mb-4:nth-child(4) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
                  .select('Cash');
                cy.wait(2000);
              
                // Enter payment details and confirm the payment
                cy.get(':nth-child(4) > :nth-child(2) > .relative > .rounded-lg').click().type('221345', { delay: 200 });
                cy.wait(2000);
              
                cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white').click();
                cy.wait(3000);
              
                cy.get('.swal2-confirm').click();
                cy.wait(2500);
                });
              });
              
  });
});