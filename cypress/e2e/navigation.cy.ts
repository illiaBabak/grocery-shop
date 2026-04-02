describe('Navigation', () => {
  it('loads the landing page', () => {
    cy.visit('/');
    cy.get('[data-testid="logo"]').should('be.visible');
  });

  it('navigates from landing to products', () => {
    cy.visit('/');
    cy.get('[data-testid="start-shopping"]').click();
    cy.url().should('include', '/main');
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
  });

  it('header links work', () => {
    cy.visit('/main');
    cy.get('[data-testid="nav-about"]').click();
    cy.url().should('include', '/about');

    cy.get('[data-testid="nav-products"]').click();
    cy.url().should('include', '/main');
  });

  it('user link goes to login when not authenticated', () => {
    cy.clearCookies();
    cy.visit('/main');
    cy.get('[data-testid="user-link"]').click();
    cy.url().should('include', '/login');
  });

  it('shows 404 for unknown routes', () => {
    cy.visit('/nonexistent', { failOnStatusCode: false });
    cy.get('[data-testid="not-found"]').should('be.visible');
  });
});
