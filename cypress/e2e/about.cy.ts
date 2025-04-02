describe('About Page - Change Dark Mode', () => {
  it('Change to Dark Mode and Back to Light Mode', () => {
    cy.visit('/about');
    cy.get('[cy-testid="about-article"]').should('be.visible');

    // By default we want light mode
    cy.get('html').should('not.have.class', 'dark-mode');

    cy.get('[cy-testid="navigation-darkmode"]').should('be.visible').click();

    cy.get('html').should('have.class', 'dark-mode');

    cy.get('[cy-testid="navigation-darkmode"]').should('be.visible').click();

    cy.get('html').should('not.have.class', 'dark-mode');
  });
});

describe('About Page - Change Material Theme', () => {
  it('Visit About Page and Change Theme', () => {
    cy.visit('/about');
    cy.get('[cy-testid="about-article"]').should('be.visible');

    // By default we want Red theme
    testMaterialTheme('--mat-sys-primary', 'light-dark(#c00100, #ffb4a8)');

    // Change to Blue theme
    cy.get('[cy-testid="theme-button-blue-palette"]')
      .should('be.visible')
      .click();
    testMaterialTheme('--mat-sys-primary', 'light-dark(#343dff, #bec2ff)');

    // Change to Green theme
    cy.get('[cy-testid="theme-button-green-palette"]')
      .should('be.visible')
      .click();
    testMaterialTheme('--mat-sys-primary', 'light-dark(#026e00, #02e600)');

    // Change to Yellow theme
    cy.get('[cy-testid="theme-button-yellow-palette"]')
      .should('be.visible')
      .click();
    testMaterialTheme('--mat-sys-primary', 'light-dark(#626200, #cdcd00)');
  });
});

function testMaterialTheme(propertyValue: string, contain: string) {
  cy.window().then((win) => {
    const primaryColor = getComputedStyle(
      win.document.documentElement
    ).getPropertyValue(propertyValue);
    expect(primaryColor.trim()).to.contain(contain);
  });
}
