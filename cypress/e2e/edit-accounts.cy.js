import CONSTANTS from '/cypress/support/constants.json'

describe('Edit/Update Customer Account Details  (By UI)', () => {

  beforeEach(() => {
    cy.log("Visiting Payconnect - Billing...");
    cy.visit(CONSTANTS.LINK);
    cy.log("Logging in...");
    cy.login(CONSTANTS.USERNAME, CONSTANTS.PASSWORD);
    cy.url().should("include", "/AccountPage");
  });

  it('Log in to Billing Site and Edit Account Test6', () => {

    cy.fillInput("Search Key", "Test")
    cy.get('i.q-icon').contains('search').click().wait(1000)

    cy.get('td.text-left').contains(`${CONSTANTS.TESTACCLNAME}, ${CONSTANTS.TESTACCFNAME}`).click()
    .wait(3000)
    cy.get('i.q-icon').contains('mode_edit').click()
    cy.wait(3000)

    cy.log('Editing Account...')

    cy.fillInput("First Name *", CONSTANTS.TESTNEWFNAME);
    cy.fillInput("Last Name *", CONSTANTS.TESTNEWLNAME);
    cy.fillInput("Contact Number *", CONSTANTS.TESTNEWNUM);
    cy.fillInput("Email address *", CONSTANTS.TESTNEWEMAIL);
    cy.fillInput("Address Line 1 *", CONSTANTS.TESTNEWADDRESS);
    cy.fillInput("City *", CONSTANTS.TESTNEWCITY);
    cy.get('[aria-label="Region *"]').click().get('div.q-item__label').contains('Region II - Cagayan Valley').click()
    cy.fillInput("Zip Code *", CONSTANTS.TESTNEWZIP);

    cy.log('Intercepting response code...')
    cy.intercept('PUT', 'https://md.payconnect.io/api/updateAccount', (req) => {
      expect(req.body).not.to.be.null
      console.log("req.body: ", req.body)
    }).as('req');

    cy.get('button.q-btn').contains('Save').click()


    cy.log('Validating response code...')
    cy.wait('@req').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  })

  it('Validates changes from the edit', () => {

    cy.fillInput("Search Key", "Test")
    cy.get('i.q-icon').contains('search').click().wait(1000)

    cy.log('Validating the edited acc')
    cy.get('td.text-left').contains(`${CONSTANTS.TESTNEWLNAME}, ${CONSTANTS.TESTNEWFNAME}`).click()
    cy.wait(3000)
    cy.get('td.row-lbl').contains('Name').siblings('.row-data').should('have.text', `${CONSTANTS.TESTNEWLNAME}, ${CONSTANTS.TESTNEWFNAME}`)
    cy.get('td.row-lbl').contains('Phone').siblings('.row-data').should('have.text', `${CONSTANTS.TESTNEWNUM}`)
    cy.get('td.row-lbl').contains('Street Address').siblings('.row-data').should('have.text', `${CONSTANTS.TESTNEWADDRESS}`)
    cy.get('td.row-lbl').contains('City').siblings('.row-data').should('have.text', `${CONSTANTS.TESTNEWCITY}`)
    cy.get('td.row-lbl').contains('Postal Code').siblings('.row-data').should('have.text', `${CONSTANTS.TESTNEWZIP}`)
  })
})