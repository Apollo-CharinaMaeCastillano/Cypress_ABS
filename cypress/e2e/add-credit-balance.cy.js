
describe('Adjustments (+) Add Credit', () => {

  beforeEach(() => {
    cy.log("Visiting Payconnect - Billing...");
    cy.visit(CONSTANTS.LINK);
    cy.log("Logging in...");
    cy.login(CONSTANTS.USERNAME, CONSTANTS.PASSWORD);
    cy.url().should("include", "/AccountPage");
  });

  it('Log in to Billing Site and Adds Credit to User Test6', () => {

    cy.fillInput("Search Key", "Test").wait(3000)
    cy.get('i.q-icon').contains('search').click().wait(1000)

    cy.log('Copying old credit balance as "oldCredit"...')
    cy.get('td.text-left').contains(CONSTANTS.TESTACCLNAME).siblings('.text-left').eq(2).invoke('text').then((text) => {
      const oldCredit = parseInt(text.trim(), 10); 
      cy.wrap(oldCredit).as('oldCredit'); 
    })

    cy.log('Copying old balance as "oldBalance"...')
    cy.get('td.text-left').contains(CONSTANTS.TESTACCLNAME).siblings('.text-left').eq(1).invoke('text').then((text) => {
      const oldBalance = parseInt(text.trim(), 10); 
      cy.wrap(oldBalance).as('oldBalance'); 
    })

    cy.log("Adding credit to account")
    cy.get('td.text-left').contains(CONSTANTS.TESTACCLNAME).click()
    cy.wait(3000)
    cy.get('i.q-icon').contains('account_balance_wallet').click()
    cy.wait(3000)
    cy.get('[aria-label="Enter amount"]').click().type(`${CONSTANTS.ADDCREDITVALUE}`)

    cy.log('Saving...')
    cy.get('button.q-btn').contains('Save').click()

    cy.log('Validating Changes...')
    cy.visit('https://billing.payconnect.io/AccountPage')
    // copy new credit balance
    
    cy.fillInput("Search Key", "Test").wait(3000)
    cy.get('i.q-icon').contains('search').click().wait(1000)
    cy.log('Copying new credit balance as "newCredit"...')
    cy.get('td.text-left').contains(CONSTANTS.TESTACCLNAME).siblings('.text-left').eq(2).invoke('text').then((text) => {
      const newCredit = parseInt(text.trim(), 10);
      cy.wrap(newCredit).as('newCredit'); 
    })
    // copy new balance
    cy.log('Copying new balance as "newBalance"...')
    cy.get('td.text-left').contains(CONSTANTS.TESTACCLNAME).siblings('.text-left').eq(1).invoke('text').then((text) => {
      const newBalance = parseInt(text.trim(), 10);
      cy.wrap(newBalance).as('newBalance'); 
    })

    // compare old and new credit balance
    cy.log('Comparing old values to new values')
    cy.get('@oldCredit').then((oldCredit) => {

      cy.get('@oldBalance').then((oldBalance) => {

        cy.get('@newCredit').then((newCredit) => {
          cy.get('@newBalance').then((newBalance) => {

            if (oldBalance > oldCredit) {
              const decrementedValue = oldBalance - CONSTANTS.ADDCREDITVALUE;
              expect(decrementedValue).to.eq(newBalance)
            } else {
              const incrementedValue = oldCredit + CONSTANTS.ADDCREDITVALUE; 
              expect(incrementedValue).to.eq(newCredit); 
            }
          })
        })
      })
    }) 
  })
})
