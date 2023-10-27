// @ts-nocheck
describe('Sign In', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn();
    });
  });

  it('Should enter the main page', () => {
    cy.visit('/', {
      failOnStatusCode: false,
    });

    cy.url();

    cy.get('h1').contains('Resumen Gastos');
    cy.get('h1').contains('Resumen Ingresos');
  });

  it('Should navigate to incomes page and return to home page', () => {
    cy.visit('/', {
      failOnStatusCode: false,
    });

    cy.get('a[href*="ingresos"]').click();
    cy.get('button').contains('Ir al Home.').should('be.visible').click();
  });
});
