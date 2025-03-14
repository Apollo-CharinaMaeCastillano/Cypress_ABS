import subscription from "../fixtures/subscription.json";

describe("Client Subscription", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.log("Visiting Payconnect - Billing...");
    cy.visit("https://billing.payconnect.io/AccountPage");
  });

  beforeEach(() => {
    cy.log("Loading subscriptions JSON...");

    cy.fixture("subscription").then((subscription) => {
      subscription = subscription;

      expect(subscription, "the same data").to.deep.equal(subscription);

      cy.log("Logging in...");
      cy.login("billing.admin.tester", "HelloWorld000!");
      cy.url().should("include", "/AccountPage");
    });
  });
  it("Create new subscription for a customer", () => {
    cy.log("Simulate customer modification");

    cy.contains("Accounts").should("be.visible");

    cy.contains("Loading...").should("be.visible");
    cy.contains("Loading...").should("not.exist");

    cy.fillInput("Search Key", subscription.accountName);

    cy.get('button[type="button"][title="Search"]').click();

    cy.get("table tbody tr:first > :nth-child(2)")
      .should("have.length.greaterThan", 0)
      .then(($row) => {
        cy.wrap($row).should("have.text", subscription.accountName);
      })
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

    cy.wait(3000);

    cy.fillInput("Email", subscription.email);
    cy.fillInput("Address", subscription.address);
    cy.fillInput("Contact person", subscription.contactPerson);
    cy.fillInput("Date Activated", subscription.dateActivated);
    cy.fillInput("TIN Number", subscription.tinNumber);
    cy.fillInput("Contract Term (Months)", subscription.contractTerm);

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

    cy.contains("OK").click();

    cy.get("table.q-table tbody tr")
      .should("have.length.greaterThan", 0)
      .first()
      .click();

    cy.contains("Subscription Details").should("be.visible");

    cy.wait(10000);

    cy.get('button[type="button"][title="Update Details"]')
      .should("exist")
      .and("be.visible")
      .then(($btn) => {
        cy.log(`Button text: ${$btn.text()}`);
        return cy.wrap($btn).click({ force: true });
      });

    cy.contains("Update Subscription").should("be.visible");

    cy.fillInput("Email", "test2@mail.com");
    cy.fillInput("Address", "Sample Address");
    cy.fillInput("TIN Number", "000123456-789");
    cy.fillInput("Contact person", "Contact 2");
    cy.fillInput("Contract Term (Months)", "10");

    cy.get('input[aria-label="Longitude"]')
      .scrollIntoView({ easing: "linear", duration: 500 })
      .should("be.visible");

    cy.contains("Status").click();
    cy.contains("Disconnected").click();

    cy.fillInput("Value-Added Tax (VAT) Percentage", "15");
    cy.fillInput("Non-VAT Percentage", "10");
    cy.fillInput("Cable Length (Meters)", "20");

    cy.contains('button[type="submit"]', "Save").should("be.visible").click();

    cy.contains("OK").click();
  });
});
