describe('main navigation', () => {
  beforeEach(() => {
    cy.viewport(1025, 900);
    cy.visit("http://localhost:3000/");
  });

  it("links are working", () => {
    cy.get("nav").contains("Tags").click();
    cy.get("nav").contains("About").click();
    cy.get("nav").contains("Sonu Rai").click();
    cy.get("nav").contains("Wallpapers").click();
  });
})
