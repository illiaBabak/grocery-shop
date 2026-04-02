describe('Reviews', () => {
  const unique = Date.now();
  const testUser = {
    name: 'Reviewer',
    email: `reviewer-${unique}@example.com`,
    password: 'password123',
  };

  before(() => {
    cy.register(testUser.name, testUser.email, testUser.password);
  });

  it('shows login prompt for unauthenticated user', () => {
    cy.clearCookies();
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="review-login-prompt"]').should('be.visible');
  });

  it('shows review form for authenticated user', () => {
    cy.login(testUser.email, testUser.password);
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="review-form"]').should('be.visible');
    cy.get('[data-testid="review-submit"]').should('be.disabled');
  });

  it('submits a review successfully', () => {
    cy.login(testUser.email, testUser.password);
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();

    cy.get('[data-testid="review-star"]').eq(3).click();
    cy.get('[data-testid="review-content"]').type('Great product, very fresh!');
    cy.get('[data-testid="review-submit"]').should('not.be.disabled').click();

    cy.get('.Toastify').should('be.visible');
  });
});
