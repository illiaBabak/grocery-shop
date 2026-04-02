describe('Products', () => {
  beforeEach(() => {
    cy.visit('/main');
  });

  it('displays product cards', () => {
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
  });

  it('navigates to product detail page on card click', () => {
    cy.get('[data-testid="product-card"]').first().click();
    cy.url().should('include', '/product/');
    cy.get('[data-testid="product-name"]').should('be.visible');
    cy.get('[data-testid="add-to-cart"]').should('be.visible');
  });

  it('filters products by search', () => {
    cy.get('[data-testid="search-input"]').clear().type('Apple{enter}');
    cy.url().should('include', 'search=Apple');
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
  });

  it('weight selector updates total price', () => {
    cy.get('[data-testid="product-card"]').first().click();

    cy.get('[data-testid="product-total-price"]')
      .invoke('text')
      .then((priceFor1kg) => {
        cy.get('[data-testid="weight-option"]').eq(1).click();
        cy.get('[data-testid="product-total-price"]').invoke('text').should('not.eq', priceFor1kg);
      });
  });
});
