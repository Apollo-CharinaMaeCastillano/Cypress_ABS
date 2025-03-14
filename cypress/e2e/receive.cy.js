import 'cypress-iframe';

  describe('Billing Portal Login Test', () => {
    // Suppress the ResizeObserver error
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        return false; // Ignore this error
      }
    });

  //    // BCD = 15
  //  const accountNumbers = ['RES-202103-14511', 'SME-202104-15396', 'RES-202105-15718', 'RES-202106-21801',
  //   'RES-202106-22200', 'RES-202107-23164', 'RES-202107-24077', 'RES-202108-24469', 'RES-202108-24569', 
  //   'RES-202108-25155', 'RES-202108-25738', 'RES-202109-27549', 'RES-202109-27554', 'RES-202109-27658', 'RES-202109-28026',
  //    'RES-202110-29399', 'RES-202111-30950', 'RES-202111-30993', 'RES-20222-34010', 'RES-20222-34687', 'RES-20222-34744',
  //     'RES-20222-34870', 'RES-20222-34884', 'RES-20222-34907', 'RES-20223-35760', 'RES-20223-35916', '38225', '38250',
  //      '40415', '40416', '45099', '45801', '46877', '49245', '49247', '51505', '53394', '53770', '54813', '59148', '59425',
  //       '59452', '59463', '59570', '59873', '59967', '134575', '135118', '135129', '135264', '135321', '135674', 
  //       'RES-202103-14292', 'RES-202103-14469', 'RES-202104-14572', 'RES-202104-14574', 'RES-202104-14614', 'RES-202105-15687',
  //       'RES-202105-15955', 'RES-202105-16257', 'RES-202106-18948', 'RES-202106-19037', 'RES-202106-20462', 'RES-202106-22017',
  //        'RES-202107-23198', 'RES-202107-23220', 'RES-202107-23363', 'RES-202107-23364', 'RES-202108-24410', 'RES-202108-24521', 
  //        'RES-202108-24930', 'RES-202108-25186', 'RES-202108-26047', 'RES-202108-26175', 'RES-202108-26177', 'RES-202109-26428',
  //         'RES-202109-26435', 'RES-202109-26606', 'RES-202109-26833', 'RES-202110-28403', 'RES-202110-28506', 'RES-202110-28578', 
  //         'RES-202110-29400', 'RES-202110-29402', 'RES-202110-29430', 'SME-202110-29631', 'RES-202111-30827', 'RES-202111-30926',
  //          'RES-202111-30932', 'RES-20221-33627', 'RES-20221-33731', 'RES-20222-33864', 'RES-20222-33938', 'RES-20223-35386', 
  //          'RES-20223-35595', 'RES-20223-35729', 'RES-20223-35748', '36858', '36929', '37277', '37282', '37842', '39271', '40027', 
  //          '40046', '40183', '40633', '40703', '42799', '44322', '44324', '44390', '44392', '44910', '45258', '47844', '49630', '52408',
  //           '53159', '53397', '54766', '54992', '59465', '60146', '60335', '133558']

  const accountNumbers = ['SME-201901-442',
    '	RES-202001-1094',
    'RES-202005-2627',
    'RES-202006-2929',
    'RES-202007-3094',
    '	RES-202007-3397']

    // Loop through each account number and perform actions
    accountNumbers.forEach((accountNumber) => {
      it(`should process account ${accountNumber} successfully`, () => {
        // Visit the billing portal
        cy.visit('https://billing-sbx.payconnect.io/');
        cy.viewport(1920, 1080);

        // Handle Keycloak login within `cy.origin()`
        cy.origin('https://keycloak.payconnect.io', () => {
          cy.get('#username').type('billing.admin.tester', { delay: 100 });
          cy.get('#password').type('HelloWorld000!!', { delay: 100 });
          cy.get('#kc-login').click();
        });

        // Wait for redirection and verify the correct URL
        cy.wait(5000); // Allow time for login redirect
        cy.url({ timeout: 10000 }).should((url) => {
          expect(url).to.satisfy((u) =>
            u.includes('billing-sbx.payconnect.io') || u.includes('billing.payconnect.io')
          );
        });

        // Verify dashboard options
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Accounts').should('be.visible');
        cy.contains('Transactions').should('be.visible');
        cy.contains('Settings').should('be.visible');

        // Navigate to Accounts and search for the account
        cy.get('.q-list > :nth-child(2) > .div').should('be.visible').click();
        cy.wait(5000);

        cy.get('#search-id').click().type(`${accountNumber}{enter}`, { delay: 200 });
        cy.wait(5000);

        cy.get('.border-b > :nth-child(1) > .flex-row').click();
        cy.wait(5000);

        // View bills
        cy.contains('p.text-sm.font-medium', 'View bills').should('be.visible').click();
        cy.wait(9000);

        // Perform dropdown actions
        cy.get('.text-white > .q-btn__content').click();
        cy.wait(2000);

        cy.get('.text-primary-600 > .q-btn__content > .flex > .text-base').click();
        cy.wait(2000);

        cy.get('.text-white > .q-btn__content').click();
        cy.wait(2000);

        // Select first valid option from dropdown
        cy.get('div.mb-4:nth-child(1) > div:nth-child(2)').click();
        cy.wait(2500);

        cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
          .find('option')
          .not(':contains("None")')
          .first()
          .then((firstOption) => {
            cy.get('div.mb-4:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
              .select(firstOption.val());
          });

        // Select "Monthly Service Fee" and "Cash" payment method
        cy.get('div.mb-4:nth-child(3) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
          .select('Monthly Service Fee');
        cy.wait(4000);

        cy.get(':nth-child(3) > :nth-child(2) > .relative > .rounded-lg')
      .clear() // Clear any existing value
      .type('2025-02-13') // Enter the date
      .blur(); // Move focus away if necessary
      cy.wait(4000);


        
        cy.get('div.mb-4:nth-child(4) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
          .select('Cash');
        cy.wait(3000);

        // Enter payment details and confirm
        cy.get(':nth-child(4) > :nth-child(2) > .relative > .rounded-lg')
          .click()
          .type('221345', { delay: 200 });
        cy.wait(4000);

        cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
          .click();
        cy.wait(5000);

        cy.get('.swal2-confirm').click();
        cy.wait(5500);
      });
    });
  });