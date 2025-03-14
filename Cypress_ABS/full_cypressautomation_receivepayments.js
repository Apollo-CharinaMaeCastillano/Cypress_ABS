import 'cypress-iframe';

describe('Billing Portal Login Test', () => {
  // Suppress the ResizeObserver error
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return false; // Ignore this error
    }
  });

  // List of account numbers (first 10 accounts)
  const accountNumbers = [
    900096,900120,9000154, 900100, 34464, 900182, 900197, 1365, 9000169, 900185, 900201, 1462, 900192, 1303, 900174, 3558, 9220, 9282, 46424, 9567, 44389, 9636, 46369, 46370, 900000, 900026, 900017, 900039, 900018, 900029, 900041, 900003, 900015, 900082, 900033, 34390, 900090, 900097, 900103, 900103, 900136, 900093, 9000109, 900143, 900098,900096, 900120, 900154, 900100, 34390, 34464, 3558, 44389, 46369, 46424, 900000, 900003, 900015, 900017, 900018, 900026, 900029, 900033, 900039, 900041, 900082, 900090, 900093, 900096, 900097, 900098, 900100, 900103, 900109, 900120, 900136, 900143, 900154, 900169, 900174, 900182, 900185, 900192, 900197, 900201, 9220, 9282, 9567, 9636
  ];

  // Loop through each account number and perform the same actions
  accountNumbers.forEach((accountNumber) => {
    it(`should process account ${accountNumber} successfully`, () => {
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

      // Search for the account
      cy.get('.q-list > :nth-child(2) > .div')
        .should('be.visible')
        .click();
      cy.wait(2000);

      // Search the account by number dynamically
      cy.get('#search-id').click().type(`${accountNumber} {enter}`, { delay: 200 });
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
