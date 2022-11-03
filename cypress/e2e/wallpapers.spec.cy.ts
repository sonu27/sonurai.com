describe('wallpapers', () => {
  beforeEach(() => {
    cy.viewport(1025, 900);
    cy.visit("http://localhost:3000/bingwallpapers");
  });

  it("correct number shown", () => {
    cy.get(".wallpaper").should("have.length", 24);
  });

  it("go to first", () => {
    cy.get(".wallpaper").first().click();
  });

  it("pagination", () => {
    cy.get(".pagination").contains("Next").click().wait(1000);
    cy.get(".pagination").contains("Prev").click();
  });
})
