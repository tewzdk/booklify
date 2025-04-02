describe('Navigation test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('[cy-testid="home-article"]').should('be.visible');

    // Testing book navigation
    cy.get('[cy-testid="navigation-books"]').should('be.visible').click();
    cy.url().should('include', '/books');
    cy.get('[cy-testid="books-article"]').should('be.visible');

    // Testing about navigation
    cy.get('[cy-testid="navigation-about"]').should('be.visible').click();
    cy.url().should('include', '/about');
    cy.get('[cy-testid="about-article"]').should('be.visible');

    // Testing home navigation
    cy.get('[cy-testid="navigation-home"]').should('be.visible').click();
    cy.url().should('include', '/');
    cy.get('[cy-testid="home-article"]').should('be.visible');
  });
});
