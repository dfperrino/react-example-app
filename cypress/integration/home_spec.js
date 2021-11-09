describe('Home page', () => {
  it('Visits home page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="home-button"]').should('exist');
    cy.get('[data-testid="home-character"]').should('have.length', 62);
    cy.get('[data-testid="input-filter"]').type('pink');
    cy.get('[data-testid="home-character"]').should('have.length', 4);
    cy.get('[data-testid="input-remove-button"]').click();
    cy.get('[data-testid="home-character"]').should('have.length', 62);
  });
});
