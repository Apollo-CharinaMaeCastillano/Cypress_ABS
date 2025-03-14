import 'cypress-iframe';

describe('Billing Portal Login Test', () => {
  // Suppress the ResizeObserver error
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return false; // Ignore this error
    }
  });

  // BCD = 15
   const accountNumbers = ['RES-202103-14511', 'SME-202104-15396', 'RES-202105-15718', 'RES-202106-21801',
     'RES-202106-22200', 'RES-202107-23164', 'RES-202107-24077', 'RES-202108-24469', 'RES-202108-24569', 
     'RES-202108-25155', 'RES-202108-25738', 'RES-202109-27549', 'RES-202109-27554', 'RES-202109-27658', 'RES-202109-28026',
      'RES-202110-29399', 'RES-202111-30950', 'RES-202111-30993', 'RES-20222-34010', 'RES-20222-34687', 'RES-20222-34744',
       'RES-20222-34870', 'RES-20222-34884', 'RES-20222-34907', 'RES-20223-35760', 'RES-20223-35916', '38225', '38250',
        '40415', '40416', '45099', '45801', '46877', '49245', '49247', '51505', '53394', '53770', '54813', '59148', '59425',
         '59452', '59463', '59570', '59873', '59967', '134575', '135118', '135129', '135264', '135321', '135674', 
         'RES-202103-14292', 'RES-202103-14469', 'RES-202104-14572', 'RES-202104-14574', 'RES-202104-14614', 'RES-202105-15687',
         'RES-202105-15955', 'RES-202105-16257', 'RES-202106-18948', 'RES-202106-19037', 'RES-202106-20462', 'RES-202106-22017',
          'RES-202107-23198', 'RES-202107-23220', 'RES-202107-23363', 'RES-202107-23364', 'RES-202108-24410', 'RES-202108-24521', 
          'RES-202108-24930', 'RES-202108-25186', 'RES-202108-26047', 'RES-202108-26175', 'RES-202108-26177', 'RES-202109-26428',
           'RES-202109-26435', 'RES-202109-26606', 'RES-202109-26833', 'RES-202110-28403', 'RES-202110-28506', 'RES-202110-28578', 
           'RES-202110-29400', 'RES-202110-29402', 'RES-202110-29430', 'SME-202110-29631', 'RES-202111-30827', 'RES-202111-30926',
            'RES-202111-30932', 'RES-20221-33627', 'RES-20221-33731', 'RES-20222-33864', 'RES-20222-33938', 'RES-20223-35386', 
            'RES-20223-35595', 'RES-20223-35729', 'RES-20223-35748', '36858', '36929', '37277', '37282', '37842', '39271', '40027', 
            '40046', '40183', '40633', '40703', '42799', '44322', '44324', '44390', '44392', '44910', '45258', '47844', '49630', '52408',
             '53159', '53397', '54766', '54992', '59465', '60146', '60335', '133558']
  
   // BCD = 30       
   const accountNumbers = ['RES-202103-14054', 'RES-202104-14868', 'RES-202104-14882', 'RES-202104-14885', 'RES-202104-15211',
     'RES-202104-15432', 'RES-202106-22435', 'RES-202106-22443', 'RES-202107-23587', 'RES-202107-23776', 'RES-202109-26945', 
     'RES-202108-25466', 'RES-202109-26945', 'RES-202109-27016', 'RES-202109-27596', 'RES-202109-27808', 'RES-202111-29837',
     'RES-202111-30563', 'SME-202112-31518', 'RES-202112-31607', 'RES-202112-31941', 'RES-20221-33185', 'RES-20221-33211',
      'RES-20222-34210', 'RES-20222-34738', 'RES-20223-36128', 'RES-20223-36163', '36739', '40834', '44520', '45107', '46881', 
      '51567', '52959', '53954', '56012', '56046', '57018', '57106', '58806', '58997', '59544', '59747', '133397', '133750',
       '133824', '134959', '135619', '135758', '135880', 'RES-202102-13097', 'RES-202102-13188', 'RES-202102-13299', 'RES-202103-14118', 
       'RES-202103-14185', 'RES-202103-14214', 'RES-202104-15072', 'RES-202104-15209', 'RES-202104-15213', 'RES-202104-15285', 'RES-202104-15433',
        'RES-202104-15435', 'RES-202105-16184', 'RES-202105-16343', 'RES-202106-22064', 'RES-202106-22485', 'RES-202106-23010', 
        'RES-202107-23560', 'RES-202107-23613', 'RES-202108-25293', 'RES-202108-25477', 'RES-202108-25517', 'RES-202109-26912', 'RES-202109-27136',
         'RES-202109-27332', 'RES-202109-27551', 'RES-202109-27769', 'RES-202110-28819', 'RES-202110-28950', 'RES-202110-29075',
          'RES-202110-29173', 'RES-202111-30104', 'RES-202111-30321', 'RES-202111-30395', 'RES-202111-30650', 'RES-202112-31499', 
          'RES-202112-31704', 'RES-202112-31724', 'RES-20221-32429', 'RES-20221-32699', 'RES-20221-32760', 'SME-20221-32764', 'RES-20221-33275',
           'RES-20221-33309', 'RES-20221-33313', 'RES-20221-33356', 'RES-20221-33398', 'RES-20222-34011', 'RES-20222-34212', 'RES-20222-34351',
            'RES-20222-34456', 'RES-20222-34475', 'RES-20222-34506', 'RES-20223-35801', 'RES-20223-36132', 'RES-20223-36180', 'RES-20223-36282', 
            'RES-20223-36302', '36730', '36768', '37727', '37746', '37780', '38854', '38885', '39194', '39210', '39262', '39449', '40830', '41022', 
            '41272', '41778', '43056', '43225', '43247', '43259', '44743', '44909', '46878', '47880', '51664', '53945', '55414', '57652', '57862', '58824', '59729', '59802']


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
      cy.wait(200);

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