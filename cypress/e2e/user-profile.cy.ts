describe('User Profile', () => {
  const unique = Date.now();
  const testUser = {
    name: 'Profile Tester',
    email: `profile-${unique}@example.com`,
    password: 'password123',
  };

  before(() => {
    cy.register(testUser.name, testUser.email, testUser.password);
  });

  beforeEach(() => {
    cy.login(testUser.email, testUser.password);
  });

  it('displays user info on profile page', () => {
    cy.visit('/user');
    cy.get('[data-testid="user-name"]').should('be.visible');
    cy.get('[data-testid="user-email"]').should('be.visible');
  });

  it('edits user name', () => {
    cy.visit('/user');
    cy.get('[data-testid="edit-name-btn"]').click({ force: true });
    cy.get('[data-testid="edit-name-input"]').clear().type('Updated Name');
    cy.get('[data-testid="edit-name-save"]').click();
    cy.get('[data-testid="user-name"]').should('be.visible');
  });

  it('shows empty order history for new user', () => {
    cy.visit('/user');
    cy.get('[data-testid="order-history"]').should('be.visible');
    cy.get('[data-testid="no-orders"]').should('be.visible');
  });

  it('redirects to login when not authenticated', () => {
    cy.clearCookies();
    cy.visit('/user');
    cy.url().should('include', '/login');
  });
});
