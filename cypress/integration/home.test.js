it("should load the page", () => {
  cy.visit("/");
  cy.findAllByText(/PartyZZ/i).should("have.length", 1);
});
