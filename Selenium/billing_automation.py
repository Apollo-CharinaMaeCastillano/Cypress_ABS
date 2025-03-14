import 'cypress-iframe';
import Papa from 'papaparse';

describe('Billing Portal Login Test', () => {
  // Suppress ResizeObserver errors
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return false;
    }
  });

  before(() => {
    // Load CSV file before running tests
    cy.fixture('testdata.csv').then((csvData) => {
      // Parse CSV into JSON array
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
      }).data;
      cy.wrap(parsedData).as('accountData');
    });
  });

  it('Processes multiple accounts from CSV', function () {
    cy.get('@accountData').then((accounts) => {
      accounts.forEach((account) => {
        const { accountNumber, amount, itemDescription, date, paymentMethod, orNumber } = account;

        cy.visit('https://billing-sbx.payconnect.io/');
        cy.viewport(1920, 1080);

        // Handle Keycloak login
        cy.origin('https://keycloak.payconnect.io', () => {
          cy.get('#username').type('billing.admin.tester', { delay: 100 });
          cy.get('#password').type('HelloWorld000!!', { delay: 100 });
          cy.get('#kc-login').click();
        });

        cy.url({ timeout: 10000 }).should((url) => {
          expect(url).to.satisfy((u) =>
            u.includes('billing-sbx.payconnect.io') || u.includes('billing.payconnect.io')
          );
        });

        cy.contains('Dashboard').should('be.visible');
        cy.contains('Accounts').should('be.visible');
        cy.contains('Transactions').should('be.visible');
        cy.contains('Settings').should('be.visible');

        cy.get('.q-list > :nth-child(2) > .div').should('be.visible').click();
        cy.get('#search-id').click().type(`${accountNumber}{enter}`, { delay: 400 });
        cy.wait(4000);

        cy.get('.border-b > :nth-child(1) > .flex-row').click();
        cy.contains('p.text-sm.font-medium', 'View bills').should('be.visible').click();
        cy.wait(4000);
        cy.get('.text-white > .q-btn__content').click();
        cy.get('.text-primary-600 > .q-btn__content > .flex > .text-base').click();
        cy.get('.text-white > .q-btn__content').click();

        // Select first valid option from dropdown
        cy.get('div.mb-4:nth-child(1) > div:nth-child(2)').click();
        cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
          .find('option')
          .not(':contains("None")')
          .first()
          .then((firstOption) => {
            cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
              .select(firstOption.val());
          });

        // Select Item Description dynamically
        cy.get('div.mb-4:nth-child(3) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
          .select(itemDescription);
        cy.wait(4000);

        // Enter Date dynamically
        cy.get(':nth-child(3) > :nth-child(2) > .relative > .rounded-lg')
          .clear()
          .type(date)
          .blur();
        cy.wait(4000);

        // Select Payment Method dynamically
        cy.get('div.mb-4:nth-child(4) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
          .select(paymentMethod);
        cy.wait(3000);

        // Enter OR Number dynamically
        cy.get(':nth-child(4) > :nth-child(2) > .relative > .rounded-lg')
          .clear()
          .type(orNumber, { delay: 200 });
        cy.wait(4000);

        // Confirm transaction
        cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
          .click();
        cy.wait(5000);

        cy.get('.swal2-confirm').click();
        cy.wait(5500);
      });
    });
  });
});
