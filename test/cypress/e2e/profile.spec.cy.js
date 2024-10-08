import { routesConf } from '../../../src/router/routes_conf';

// selectors
const selectorProfilePage = 'profile-page';
const selectorProfilePageTitle = 'profile-page-title';
const selectorNickname = 'profile-details-nickname';
const selectorEmail = 'profile-details-email';
const selectorGender = 'profile-details-gender';
const selectorFormNickname = 'profile-details-form-nickname';
const selectorFormEmail = 'profile-details-form-email';
const selectorFormGender = 'profile-details-form-gender';
const dataSelectorEdit = '[data-cy="details-item-edit"]';
const dataSelectorInput = '[data-cy="form-input"]';
const dataSelectorInputEmail = '[data-cy="form-email"]';
const dataSelectorInputPassword = '[data-cy="form-password"]';
const dataSelectorButtonSave = '[data-cy="form-button-save"]';
const dataSelectorValue = '[data-cy="details-item-value"]';

// variables
const newNickname = 'Cyklobaron';
const newEmail = 'ride@dopracenakole.cz';
const password = 'testpassword123';
const genderFemale = 'female';
const genderFemaleKey = 'global.woman';

describe('Profile page', () => {
  context('desktop', () => {
    beforeEach(() => {
      cy.visit('#' + routesConf['profile']['children']['fullPath']);
      cy.viewport('macbook-16');
      // load config and i18n objects as aliases
      cy.task('getAppConfig', process).then((config) => {
        // alias config
        cy.wrap(config).as('config');
        cy.window().should('have.property', 'i18n');
        cy.window().then((win) => {
          // alias i18n
          cy.wrap(win.i18n).as('i18n');
        });
      });
    });

    coreTests();

    it('renders left drawer', () => {
      cy.dataCy('q-drawer').should('be.visible');
      cy.dataCy('drawer-header').should('be.visible');
      cy.dataCy('user-select').should('be.visible');
      cy.dataCy('drawer-toggle-buttons').should('be.visible');
      cy.dataCy('drawer-menu-top').should('be.visible');
      cy.dataCy('drawer-menu-bottom').should('be.visible');
    });
  });
});

function coreTests() {
  it('has translation for all strings', () => {
    cy.get('@i18n').then((i18n) => {
      cy.testLanguageStringsInContext(['titleProfile'], 'profile', i18n);
    });
  });

  it('renders page', () => {
    cy.get('@i18n').then((i18n) => {
      cy.dataCy(selectorProfilePage).should('be.visible');
      // title
      cy.dataCy(selectorProfilePageTitle)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.titleProfile'));
    });
  });

  it('allows user to change nickname, email, and gender', () => {
    cy.get('@i18n').then((i18n) => {
      // Change nickname
      cy.dataCy(selectorNickname).find(dataSelectorEdit).click();
      cy.dataCy(selectorFormNickname).find(dataSelectorInput).clear();
      cy.dataCy(selectorFormNickname).find(dataSelectorInput).type(newNickname);
      cy.dataCy(selectorFormNickname).find(dataSelectorButtonSave).click();
      cy.dataCy(selectorNickname)
        .find(dataSelectorValue)
        .should('have.text', newNickname);

      // Change email
      cy.dataCy(selectorEmail).find(dataSelectorEdit).click();
      cy.dataCy(selectorFormEmail).find(dataSelectorInputEmail).clear();
      cy.dataCy(selectorFormEmail).find(dataSelectorInputEmail).type(newEmail);
      cy.dataCy(selectorFormEmail)
        .find(dataSelectorInputPassword)
        .type(password);
      cy.dataCy(selectorFormEmail).find(dataSelectorButtonSave).click();
      cy.dataCy(selectorEmail)
        .find(dataSelectorValue)
        .should('have.text', newEmail);

      // Change gender
      cy.dataCy(selectorGender).find(dataSelectorEdit).click();
      cy.dataCy(selectorFormGender)
        .find('.q-radio__label')
        .contains(i18n.global.t(genderFemaleKey))
        .click();
      cy.dataCy(selectorFormGender).find(dataSelectorButtonSave).click();
      cy.dataCy(selectorGender)
        .find(dataSelectorValue)
        .should('have.text', genderFemale);
    });
  });
}
