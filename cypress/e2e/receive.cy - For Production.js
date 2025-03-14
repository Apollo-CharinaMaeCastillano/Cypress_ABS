import 'cypress-iframe';

describe('Billing Portal Login Test', () => {
  // Suppress the ResizeObserver error
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return false; // Ignore this error
    }
  });

// BCD = 15
const accountNumbers = ['RES-202103-14511', '54766', '54992', '59465', '60146', '60335', '133558']

// // BCD = 30       
// const accountNumbers = ['RES-202103-14054', 'RES-202104-14868', 'RES-202104-14882', 'RES-202104-14885', 'RES-202104-15211',
//   'RES-202104-15432', 'RES-202106-22435', 'RES-202106-22443', 'RES-202107-23587', 'RES-202107-23776', 'RES-202109-26945', 
//   'RES-202108-25466', 'RES-202109-26945', 'RES-202109-27016', 'RES-202109-27596', 'RES-202109-27808', 'RES-202111-29837',
//   'RES-202111-30563', 'SME-202112-31518', 'RES-202112-31607', 'RES-202112-31941', 'RES-20221-33185', 'RES-20221-33211',
//    'RES-20222-34210', 'RES-20222-34738', 'RES-20223-36128', 'RES-20223-36163', '36739', '40834', '44520', '45107', '46881', 
//    '51567', '52959', '53954', '56012', '56046', '57018', '57106', '58806', '58997', '59544', '59747', '133397', '133750',
//     '133824', '134959', '135619', '135758', '135880', 'RES-202102-13097', 'RES-202102-13188', 'RES-202102-13299', 'RES-202103-14118', 
//     'RES-202103-14185', 'RES-202103-14214', 'RES-202104-15072', 'RES-202104-15209', 'RES-202104-15213', 'RES-202104-15285', 'RES-202104-15433',
//      'RES-202104-15435', 'RES-202105-16184', 'RES-202105-16343', 'RES-202106-22064', 'RES-202106-22485', 'RES-202106-23010', 
//      'RES-202107-23560', 'RES-202107-23613', 'RES-202108-25293', 'RES-202108-25477', 'RES-202108-25517', 'RES-202109-26912', 'RES-202109-27136',
//       'RES-202109-27332', 'RES-202109-27551', 'RES-202109-27769', 'RES-202110-28819', 'RES-202110-28950', 'RES-202110-29075',
//        'RES-202110-29173', 'RES-202111-30104', 'RES-202111-30321', 'RES-202111-30395', 'RES-202111-30650', 'RES-202112-31499', 
//        'RES-202112-31704', 'RES-202112-31724', 'RES-20221-32429', 'RES-20221-32699', 'RES-20221-32760', 'SME-20221-32764', 'RES-20221-33275',
//         'RES-20221-33309', 'RES-20221-33313', 'RES-20221-33356', 'RES-20221-33398', 'RES-20222-34011', 'RES-20222-34212', 'RES-20222-34351',
//          'RES-20222-34456', 'RES-20222-34475', 'RES-20222-34506', 'RES-20223-35801', 'RES-20223-36132', 'RES-20223-36180', 'RES-20223-36282', 
//          'RES-20223-36302', '36730', '36768', '37727', '37746', '37780', '38854', '38885', '39194', '39210', '39262', '39449', '40830', '41022', 
//          '41272', '41778', '43056', '43225', '43247', '43259', '44743', '44909', '46878', '47880', '51664', '53945', '55414', '57652', '57862', '58824', '59729', '59802']

  // Loop through each account number and perform actions
  accountNumbers.forEach((accountNumber) => {
    it(`should process account ${accountNumber} successfully`, () => {
      // Visit the billing portal
      cy.visit('https://billing-.payconnect.io/');
      cy.viewport(1920, 1080);

      // Handle Keycloak login within `cy.origin()`
      cy.origin('https://keycloak.payconnect.io', () => {
        cy.get('#username').type('billing.admin.tester', { delay: 100 });
        cy.get('#password').type('HelloWorld000!', { delay: 100 });
        cy.get('#kc-login').click();
      });

      // Wait for redirection and verify the correct URL
      cy.wait(5000); // Allow time for login redirect
      cy.url({ timeout: 10000 }).should('include', 'billing.payconnect.io');

      // Verify dashboard options
      cy.contains('Dashboard').should('be.visible');
      cy.contains('Accounts').should('be.visible');
      cy.contains('Transactions').should('be.visible');
      cy.contains('Settings').should('be.visible');

      // Navigate to Accounts and search for the account
      cy.get('.q-list > :nth-child(2) > .div').should('be.visible').click();
      cy.wait(2000);

      cy.get('#search-id').click().type(`${accountNumber}{enter}`, { delay: 200 });
      cy.wait(2000);

      cy.get('.border-b > :nth-child(1) > .flex-row').click();
      cy.wait(2000);

      // View bills
      cy.contains('p.text-sm.font-medium', 'View bills').should('be.visible').click();
      cy.wait(3000);

      // Perform dropdown actions
      cy.get('.text-white > .q-btn__content').click();
      cy.wait(2000);

      cy.get('.text-primary-600 > .q-btn__content > .flex > .text-base').click();
      cy.wait(2000);

      cy.get('.text-white > .q-btn__content').click();
      cy.wait(2000);

      // Select first valid option from dropdown
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
      cy.wait(2000);

      // Use cy.clear() and cy.type() for the date field with precise wait
      cy.get(':nth-child(3) > :nth-child(2) > .relative > .rounded-lg')
        .clear()
        .type('11/15/2024', { delay: 100 });
      cy.wait(2000);

      cy.get('div.mb-4:nth-child(4) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
        .select('Cash');
      cy.wait(2000);

      // Enter payment details and confirm
      cy.get(':nth-child(4) > :nth-child(2) > .relative > .rounded-lg')
        .click()
        .type('221345', { delay: 200 });
      cy.wait(2000);

      cy.get('[style="display: flex; justify-content: flex-end; margin-top: auto;"] > .text-white')
        .click();
      cy.wait(3000);

      cy.get('.swal2-confirm').click();
      cy.wait(2500);
    });
  });
});
