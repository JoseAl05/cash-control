// @ts-nocheck
import 'cypress-real-events';

describe('Generate an Expense', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn();
    });
  });

  it('Should open Expenses modal and create an expense', () => {
    cy.visit('/', {
      failOnStatusCode: false,
    });

    cy.get('button[id="register-expense"]').should('be.visible').click();

    cy.wait(1000);

    cy.get('h2').contains('Registrar Gasto.');
    cy.get('label').contains('Valor Gastado.');
    cy.get('label').contains('Descripcion del Gasto.');
    cy.get('label').contains('Fecha del Gasto.');

    cy.get('input[name*="value"').type('5000');
    cy.get('input[name*="description"').type('Prueba Gasto');
    cy.get('button[id*="calendar"]').click();
    cy.get('button[name*="day"]').contains('2').click();
    cy.get('button[id*="calendar"]').click();

    cy.wait(1000);

    cy.get('button[type=submit]').click();
  });

  it('Should open Incomes modal and create an income', () => {
    cy.visit('/', {
      failOnStatusCode: false,
    });

    cy.get('button[id="register-income"]').should('be.visible').click();
    cy.wait(1000);

    cy.get('h2').contains('Registrar Ingreso.');
    cy.get('label').contains('Ingreso.');
    cy.get('label').contains('Tipo de Ingreso.');
    cy.get('label').contains('Fecha del Ingreso.');

    cy.get('input[name*="value"').type('5000');
    cy.get('[name*=incomeType]').should('have.value', 'Sueldo').realClick();

    cy.contains('option', 'Sueldo');
    cy.contains('option', 'Boleta');
    cy.contains('option', 'Devolución');
    cy.contains('option', 'Regalo');
    cy.contains('option', 'Otro');

    cy.get('button[role*="combobox"]').click();
    cy.get('[name*=incomeType]')
      .should('have.value', 'Sueldo')
      .select('Sueldo', { force: true, log: true });

    cy.get('button[id*="calendar"]').click();
    cy.get('button[name*="day"]').contains('2').click();
    cy.get('button[id*="calendar"]').click();

    cy.wait(1000);

    cy.get('button[type=submit]').click();

    cy.reload();
  });
});
