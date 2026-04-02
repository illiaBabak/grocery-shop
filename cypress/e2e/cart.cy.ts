describe('Cart', () => {
  beforeEach(() => {
    cy.window().then((win) => win.localStorage.removeItem('grocery-shop-cart'));
  });

  it('cart is initially empty', () => {
    cy.visit('/main');
    cy.get('[data-testid="cart-button"]').click();
    cy.get('[data-testid="cart-panel"]').should('be.visible');
    cy.get('[data-testid="cart-item"]').should('not.exist');
  });

  it('adds a product to cart and shows it', () => {
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();

    cy.get('[data-testid="cart-button"]').click();
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
    cy.get('[data-testid="cart-count"]').should('have.text', '1');
  });

  it('removes an item from cart', () => {
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();

    cy.get('[data-testid="cart-button"]').click();
    cy.get('[data-testid="cart-item"]').should('have.length', 1);

    cy.get('[data-testid="cart-remove-item"]').first().click();
    cy.get('[data-testid="cart-item"]').should('not.exist');
  });

  it('clears the entire cart', () => {
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();
    cy.go('back');
    cy.get('[data-testid="product-card"]').eq(1).click();
    cy.get('[data-testid="add-to-cart"]').click();

    cy.get('[data-testid="cart-button"]').click();
    cy.get('[data-testid="cart-item"]').should('have.length', 2);

    cy.get('[data-testid="cart-clear"]').click();
    cy.get('[data-testid="cart-item"]').should('not.exist');
  });

  it('shows total price', () => {
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();

    cy.get('[data-testid="cart-button"]').click();
    cy.get('[data-testid="cart-total"]')
      .invoke('text')
      .should('match', /\$\d+\.\d{2}/);
  });

  it('persists cart across page reloads via localStorage', () => {
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();

    cy.reload();
    cy.get('[data-testid="cart-button"]').click();
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
  });

  it('shows auth modal on checkout when not logged in', () => {
    cy.visit('/main');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();

    cy.get('[data-testid="cart-button"]').click();
    cy.get('[data-testid="cart-checkout"]').click();
    cy.get('[data-testid="auth-modal"]').should('be.visible');
    cy.get('[data-testid="guest-checkout"]').should('be.visible');
  });
});
