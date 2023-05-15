import { whiteColor, hexToRgb } from '../../../test/cypress/utils/';

describe('Home page', () => {
  it('render <q-card>', () => {
    cy.visit(Cypress.config('baseUrl'));
    cy.task('getAppConfig', process).then((config) => {
      cy.dataCy('q-card')
        .should('be.visible')
        .and('have.css', 'width', config.width);
    });
  });

  it('render <q-card-section>', () => {
    cy.visit(Cypress.config('baseUrl'));
    cy.task('getAppConfig', process).then((config) => {
      cy.dataCy('q-card-section')
        .should('be.visible')
        .and('have.class', 'bg-primary', 'text-white')
        .and('have.css', 'background-color', hexToRgb(config.primaryColor));
    });
  });

  it('render <q-card-section-title>', () => {
    cy.visit(Cypress.config('baseUrl'));
    cy.task('getAppConfig', process).then((config) => {
      cy.dataCy('q-card-section-title')
        .should('be.visible')
        .and('have.class', 'text-h6')
        .and('have.text', config.title)
        .and('have.css', 'color', whiteColor);

      cy.dataCy('q-card-section-subtitle')
        .should('be.visible')
        .and('have.class', 'text-subtitle2')
        .and('have.text', config.subtitle)
        .and('have.css', 'color', whiteColor);
    });
  });

  it('render <q-card-section-subtitle>', () => {
    cy.visit(Cypress.config('baseUrl'));
    cy.task('getAppConfig', process).then((config) => {
      cy.dataCy('q-card-section-subtitle')
        .should('be.visible')
        .and('have.class', 'text-subtitle2')
        .and('have.text', config.subtitle)
        .and('have.css', 'color', whiteColor);
    });
  });
});
