describe('Books Page - Initial Load', () => {
  it('Visits the initial project page', () => {
    cy.visit('/books');
    cy.url().should('include', '/books');
    cy.get('[cy-testid="books-article"]').should('be.visible');
  });
});

describe('Books Page - Book Without Search', () => {
  it('Create Book Without Search', () => {
    cy.visit('/books');
    cy.url().should('include', '/books');
    cy.get('[cy-testid="books-article"]').should('be.visible');

    cy.get('[cy-testid="books-create-dialog-btn"]').click();
    cy.get('[cy-testid="books-main-expansion-panel"]')
      .should('be.visible')
      .click();

    cy.get('[cy-testid="books-dialog-submit"]').should('be.disabled');

    cy.get('[cy-testid="books-input-title"]')
      .should('be.visible')
      .type('Harry Potter and the Order of the Phoenix');

    cy.get('[cy-testid="books-input-firstPublishYear"]')
      .should('be.visible')
      .type('19975');

    cy.get('[cy-testid="books-input-author"]')
      .should('be.visible')
      .type('J.K. Rowling');

    cy.get('[cy-testid="books-dialog-next-2"]').click();

    cy.get('[cy-testid="books-input-summary"]')
      .should('be.visible')
      .type('The book was published in 1997');

    cy.get('[cy-testid="books-dialog-submit"]').should('be.disabled');

    cy.get('[cy-testid="books-dialog-previous-2"]').click();

    cy.get('[cy-testid="books-input-firstPublishYear"]').clear().type('1997');

    cy.get('[cy-testid="books-dialog-submit"]').should('be.enabled').click();

    //cy-testid="grid-item-title"
    cy.get('[cy-testid="grid-item-title"]').should(
      'contain',
      'Harry Potter and the Order of the Phoenix'
    );
  });

  it('Visits the initial project page', () => {
    cy.visit('/books');
    cy.url().should('include', '/books');
    cy.get('[cy-testid="books-article"]').should('be.visible');
  });
});

describe('Books Page - Update Book', () => {
  it('Update Book', () => {
    cy.visit('/books');
    cy.url().should('include', '/books');
    cy.get('[cy-testid="books-article"]').should('be.visible');

    cy.get('[cy-testid="grid-item"]').first().click();

    cy.get('[cy-testid="books-dialog-submit"]').should('be.enabled');

    cy.get('[cy-testid="books-input-title"]')
      .should('be.visible')
      .clear()
      .type('Another Title');

    cy.get('[cy-testid="books-dialog-submit"]').click();

    cy.get('[cy-testid="grid-item-title"]').should('contain', 'Another Title');
  });
});

describe('Books Page - Delete Book', () => {
  it('Delete Book', () => {
    cy.visit('/books');
    cy.url().should('include', '/books');
    cy.get('[cy-testid="books-article"]').should('be.visible');

    cy.get('[cy-testid="grid-item"]').first().click();

    cy.get('[cy-testid="books-dialog-submit"]').should('be.enabled');

    cy.get('[cy-testid="books-dialog-form"]').should('be.visible');

    cy.get('[cy-testid="books-dialog-delete"]').should('be.visible').click();
    cy.get('[cy-testid="books-dialog-delete-confirm"]')
      .should('be.visible')
      .click();

    cy.get('[cy-testid="grid-item-title"]').should(
      'not.contain.text',
      'The Great Gatsby'
    );
  });
});
