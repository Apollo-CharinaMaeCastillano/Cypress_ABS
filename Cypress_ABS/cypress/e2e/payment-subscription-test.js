describe("Client Subscription", () => {
  before(() => {
    cy.log("Visiting Payconnect - Billing...");
    cy.visit("https://billing.payconnect.io/AccountPage");
  });

  beforeEach(() => {
    cy.log("Logging in...");
    cy.login("billing.admin.tester", "HelloWorld000!");
    cy.url().should("include", "/AccountPage");
  });

  it("Create new subscription for a customer", () => {
    cy.log("Simulate customer modification");

    cy.contains("Accounts").should("be.visible");

    cy.contains("Loading...").should("be.visible");
    cy.contains("Loading...").should("not.exist");

    cy.get("table tbody tr")
      .should("have.length.greaterThan", 0)
      .first()
      .click();

    cy.contains('button[type="button"]', "New Subscription")
      .should("be.visible")
      .click();

    cy.get('input[aria-label="Product Name"]').click();
    cy.get(
      'div[role="listbox"] div.q-virtual-scroll__content div[role="option"]',
    )
      .first()
      .click();

    cy.fillInput("Email", "test@mail.com");
    cy.fillInput("Address", "Test Address");
    cy.fillInput("Contact person", "Test Contact");
    cy.fillInput("Date Activated", "2024-10-18");
    cy.fillInput("TIN Number", "123456789-000");
    cy.fillInput("Contract Term (Months)", "5");

    cy.get('input[aria-label="Longitude"]')
      .scrollIntoView({ easing: "linear", duration: 500 })
      .should("be.visible");

    cy.fillInput("Non-VAT Percentage", "10");
    cy.fillInput("Bucket IP Address", "192.168.1.1");
    cy.fillInput("Cable Length (Meters)", "20");

    cy.contains("Open Map").click();
    cy.get('div[class="vue-map-container"]')
      .should("be.visible")
      .click("center");
    cy.contains("close").click();

    cy.contains('button[type="submit"]', "Save").should("be.visible").click();
  });
});
