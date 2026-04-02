export {};

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.clearCookies();
  cy.visit('/login');
  cy.get('[data-testid="login-email"]').clear().type(email);
  cy.get('[data-testid="login-password"]').clear().type(password);
  cy.get('[data-testid="login-submit"]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.clearCookies();
  cy.visit('/register');
  cy.get('[data-testid="register-name"]').clear().type(name);
  cy.get('[data-testid="register-email"]').clear().type(email);
  cy.get('[data-testid="register-password"]').clear().type(password);
  cy.get('[data-testid="register-confirm-password"]').clear().type(password);
  cy.get('[data-testid="register-submit"]').click();
  cy.url().should('not.include', '/register');
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register(name: string, email: string, password: string): Chainable<void>;
    }
  }
}
