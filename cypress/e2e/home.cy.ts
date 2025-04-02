describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('[cy-testid="home-title"]').should('be.visible');
    cy.contains('Welcome to Booklify!');
    cy.contains('Booklify Catalogue');
  });
});
