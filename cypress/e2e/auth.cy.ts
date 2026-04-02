describe('Authentication', () => {
  const unique = Date.now();

  const testUser = {
    name: 'Test User',
    email: `test-${unique}@example.com`,
    password: 'password123',
  };

  describe('Register', () => {
    it('shows validation errors on empty submit', () => {
      cy.visit('/register');
      cy.get('[data-testid="register-submit"]').click();
      cy.get('[data-testid="register-name-error"]').should('be.visible');
      cy.get('[data-testid="register-email-error"]').should('be.visible');
      cy.get('[data-testid="register-password-error"]').should('be.visible');
    });

    it('registers a new user and redirects to home', () => {
      cy.register(testUser.name, testUser.email, testUser.password);
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('shows error for duplicate email', () => {
      cy.visit('/register');
      cy.get('[data-testid="register-name"]').type(testUser.name);
      cy.get('[data-testid="register-email"]').type(testUser.email);
      cy.get('[data-testid="register-password"]').type(testUser.password);
      cy.get('[data-testid="register-confirm-password"]').type(testUser.password);
      cy.get('[data-testid="register-submit"]').click();
      cy.get('[data-testid="register-error"]').should('be.visible');
    });
  });

  describe('Login', () => {
    it('shows validation errors on empty submit', () => {
      cy.visit('/login');
      cy.get('[data-testid="login-submit"]').click();
      cy.get('[data-testid="login-email-error"]').should('be.visible');
      cy.get('[data-testid="login-password-error"]').should('be.visible');
    });

    it('shows error for wrong credentials', () => {
      cy.visit('/login');
      cy.get('[data-testid="login-email"]').type('wrong@example.com');
      cy.get('[data-testid="login-password"]').type('wrongpassword');
      cy.get('[data-testid="login-submit"]').click();
      cy.get('[data-testid="login-error"]').should('be.visible');
    });

    it('logs in with valid credentials and redirects', () => {
      cy.login(testUser.email, testUser.password);
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});
