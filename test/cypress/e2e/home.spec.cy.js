describe('Home page', () => {
  context('desktop', () => {
    beforeEach(() => {
      cy.visit(Cypress.config('baseUrl'));
      cy.viewport('macbook-16');
    });

    it('renders all components', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let i18n;
      cy.window().should('have.property', 'i18n');
      cy.window()
        .then((win) => {
          i18n = win.i18n;
        })
        .then(() => {
          cy.dataCy('q-main').should('be.visible');
          cy.dataCy('index-title')
            .should('be.visible')
            .and('have.css', 'font-size', '24px')
            .and('have.css', 'font-weight', '700')
            .and('contain', i18n.global.t('index.title'));
          cy.dataCy('countdown-event').should('be.visible');
          cy.dataCy('list-challenge').should('be.visible');
          cy.dataCy('banner-image').should('be.visible');
          cy.dataCy('heading-background').should('be.visible');
          cy.dataCy('list-event').should('be.visible');
        });
    });

    it('renders left drawer', () => {
      cy.dataCy('q-drawer').should('be.visible');
    });

    it('allows user to display help dialog and read all FAQ items', () => {
      cy.dataCy('button-help').last().should('be.visible').click();
      cy.dataCy('dialog-header').should('be.visible');
      cy.dataCy('list-faq-list')
        .find('.q-card')
        .each(($element) => {
          cy.wrap($element).should('not.be.visible');
        });
      cy.dataCy('list-faq-list')
        .find('.q-expansion-item')
        .each(($element) => {
          cy.wrap($element).should('be.visible');
          cy.wrap($element).click();
          cy.wrap($element)
            .find('.q-card__section')
            .should('be.visible')
            .and('not.be.empty');
        });
    });

    it('allows user to display and submit contact form', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let i18n;
      cy.window().should('have.property', 'i18n');
      cy.window()
        .then((win) => {
          i18n = win.i18n;
        })
        .then(() => {
          cy.dataCy('button-help').last().should('be.visible').click();

          cy.dataCy('dialog-header').should('be.visible');

          cy.dataCy('dialog-content').scrollTo(0, 1200);

          cy.dataCy('button-contact').should('be.visible').click();

          cy.dataCy('dialog-header').find('h3').should('be.visible');

          cy.dataCy('contact-form-subject-input')
            .should('be.visible')
            .type('question');

          cy.dataCy('contact-form-message-input')
            .should('be.visible')
            .type('what is the minimum distance to ride to work?');

          cy.dataCy('contact-form-email-input')
            .should('be.visible')
            .type('P7LlQ@example.com');

          cy.dataCy('contact-form-submit').should('be.visible').click();

          // TODO: test successful submission
        });
    });

    it('validates contact form if there are errors', () => {
      let i18n;
      cy.window().should('have.property', 'i18n');
      cy.window()
        .then((win) => {
          i18n = win.i18n;
        })
        .then(() => {
          cy.dataCy('button-help').last().should('be.visible').click();
          cy.dataCy('dialog-header').should('be.visible');
          cy.dataCy('dialog-content').scrollTo(0, 1200);
          cy.dataCy('button-contact').should('be.visible').click();
          cy.dataCy('dialog-header').find('h3').should('be.visible');
          cy.dataCy('dialog-content').scrollTo('bottom');
          cy.dataCy('contact-form-submit').should('be.visible').click();
          cy.dataCy('contact-form-subject')
            .find('.q-field__messages')
            .should('be.visible')
            .and('contain', i18n.global.t('index.contact.subjectRequired'));
          cy.dataCy('contact-form-subject')
            .find('.q-field__control')
            .should('have.class', 'text-negative');
          cy.dataCy('dialog-content').scrollTo('top');
          cy.dataCy('contact-form-subject-input')
            .should('be.visible')
            .type('question');
          // Input lost focus to apply lazy validation rules
          cy.dataCy('dialog-header').click();
          cy.dataCy('contact-form-subject')
            .find('.q-field__messages')
            .should('not.be.visible');
          cy.dataCy('contact-form-subject')
            .find('.q-field__control')
            .should('not.have.class', 'text-negative');
          cy.dataCy('dialog-content').scrollTo('bottom');
          cy.dataCy('contact-form-submit').should('be.visible').click();
          cy.dataCy('dialog-content').scrollTo('top');
          cy.dataCy('contact-form-message')
            .find('.q-field__messages')
            .should('be.visible')
            .and('contain', i18n.global.t('index.contact.messageRequired'));
          cy.dataCy('contact-form-message')
            .find('.q-field__control')
            .should('have.class', 'text-negative');
          cy.dataCy('contact-form-message-input')
            .should('be.visible')
            .type('what is the minimum distance to ride to work?');
          cy.dataCy('dialog-content').scrollTo('bottom');
          cy.dataCy('contact-form-submit').should('be.visible').click();
          cy.dataCy('contact-form-email')
            .find('.q-field__messages')
            .should('be.visible')
            .and('contain', i18n.global.t('index.contact.emailRequired'));
          cy.dataCy('contact-form-email')
            .find('.q-field__control')
            .should('have.class', 'text-negative');
        });
    });

    it('allows user to display event modal', () => {
      cy.dataCy('dialog-card-event').should('not.exist');
      cy.dataCy('list-event')
        .should('be.visible')
        .find('.card-link')
        .should('be.visible')
        .click();
      cy.dataCy('dialog-card-event').should('be.visible');
    });

    it('allows user to display offer modal', () => {
      cy.dataCy('dialog-offer').should('not.exist');
      cy.dataCy('list-card-offer-item').first().should('be.visible').click();
      cy.dataCy('dialog-offer').should('be.visible');
    });

    it('allows user to see all news items', () => {
      cy.dataCy('list-post').should('be.visible');
      cy.dataCy('list-post')
        .find('.swiper-slide:nth-child(1)')
        .should('be.visible');
      cy.dataCy('list-post')
        .find('.swiper-slide:nth-child(2)')
        .should('be.visible');
      cy.dataCy('list-post')
        .find('.swiper-slide:nth-child(3)')
        .should('be.visible');
      cy.dataCy('list-post')
        .find('.swiper-slide:nth-child(4)')
        .should('be.visible');
      cy.dataCy('list-post')
        .find('.swiper-slide')
        .then(($el) => {
          $el.each(() => {
            cy.dataCy('list-post')
              .find('swiper-container')
              .shadow()
              .find('.swiper-button-next')
              .click({ force: true });
          });
          cy.dataCy('list-post')
            .find('.swiper-slide:last-child')
            .should('be.visible');
        });
    });

    it('allows user to switch language', () => {
      let i18n;
      cy.window().should('have.property', 'i18n');
      cy.window()
        .then((win) => {
          i18n = win.i18n;
        })
        .then(() => {
          cy.dataCy('index-title')
            .should('be.visible')
            .and('contain', i18n.global.t('index.title'));
          const locales = i18n.global.availableLocales;
          locales.forEach((locale) => {
            let initialActiveLocale = i18n.global.locale;
            if (locale === initialActiveLocale) {
              return;
            }
            cy.dataCy('switcher-' + locale)
              .should('exist')
              .and('be.visible')
              .find('.q-btn')
              .click();
            cy.dataCy('switcher-' + initialActiveLocale)
              .find('.q-btn')
              .should('not.have', 'font-weight', '400');
            cy.dataCy('switcher-' + locale)
              .find('.q-btn')
              .should('have.css', 'font-weight', '700');
            cy.dataCy('index-title')
              .should('be.visible')
              .and('contain', i18n.global.messages[locale].index.title);
          });
        });
    });

    it('allows user to scroll to top using the footer button', () => {
      cy.dataCy('footer-top-button').should('be.visible').click();
      cy.dataCy('footer-top-button').should('be.visible').click();
      /**
       * Second click helps to overcome a ResizeObserver loop completed
       * with undelivered notifications error
       */
      cy.window().its('scrollY').should('equal', 0);
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      cy.visit(Cypress.config('baseUrl'));
      cy.viewport('iphone-6');
    });

    it('renders all components', () => {
      let i18n;
      cy.window().should('have.property', 'i18n');
      cy.window()
        .then((win) => {
          i18n = win.i18n;
        })
        .then(() => {
          cy.dataCy('q-main').should('be.visible');
          cy.dataCy('index-title')
            .should('be.visible')
            .and('have.css', 'font-size', '24px')
            .and('have.css', 'font-weight', '700')
            .and('contain', i18n.global.t('index.title'));
          cy.dataCy('countdown-event').should('be.visible');
          cy.dataCy('list-challenge').should('be.visible');
          cy.dataCy('banner-image').should('be.visible');
          cy.dataCy('heading-background').should('be.visible');
          cy.dataCy('list-event').should('be.visible');
        });
    });

    it('allows user to show and hide bottom panel on mobile', () => {
      cy.dataCy('footer-panel-menu').should('be.visible');
      cy.dataCy('footer-panel-menu')
        .should('be.visible')
        .find('.q-item')
        .should('have.length', 5);
      cy.dataCy('footer-panel-menu-hamburger').click();
      cy.dataCy('footer-panel-menu-dialog').should('be.visible');
      cy.dataCy('footer-panel-menu-dialog')
        .should('be.visible')
        .find('.q-item')
        .should('have.length', 5);
    });

    it('allows user to display help dialog and read all FAQ items', () => {
      cy.dataCy('button-help').first().should('be.visible').click();
      cy.dataCy('list-faq-list')
        .find('.q-card')
        .each(($element) => {
          cy.wrap($element).should('not.be.visible');
        });
      cy.dataCy('list-faq-list')
        .find('.q-expansion-item')
        .each(($element) => {
          cy.wrap($element).should('be.visible');
          cy.wrap($element).click();
          cy.wrap($element)
            .find('.q-card__section')
            .should('be.visible')
            .and('not.be.empty');
        });
    });

    it('allows user to display and submit contact form', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let i18n;
      cy.window().should('have.property', 'i18n');
      cy.window()
        .then((win) => {
          i18n = win.i18n;
        })
        .then(() => {
          cy.dataCy('button-help').first().should('be.visible').click();
          cy.dataCy('dialog-header').should('be.visible');
          cy.dataCy('dialog-content').scrollTo(0, 1200);
          cy.dataCy('button-contact').should('be.visible').click();
          cy.dataCy('dialog-header').find('h3').should('be.visible');
          cy.dataCy('dialog-content').scrollTo(0, 0);
          cy.dataCy('contact-form-subject-input')
            .should('be.visible')
            .type('question');
          cy.dataCy('contact-form-message-input')
            .should('be.visible')
            .type('what is the minimum distance to ride to work?');
          cy.dataCy('contact-form-email-input')
            .should('be.visible')
            .type('P7LlQ@example.com');
          cy.dataCy('contact-form-submit').should('be.visible').click();
          // TODO: test successful submission
        });
    });

    it('validates contact form if there are errors', () => {
      let i18n;
      cy.window().should('have.property', 'i18n');
      cy.window()
        .then((win) => {
          i18n = win.i18n;
        })
        .then(() => {
          cy.dataCy('button-help').first().should('be.visible').click();
          cy.dataCy('dialog-header').should('be.visible');
          cy.dataCy('dialog-content').scrollTo(0, 1200);
          cy.dataCy('button-contact').should('be.visible').click();
          cy.dataCy('dialog-header').find('h3').should('be.visible');
          cy.dataCy('dialog-content').scrollTo('bottom');
          cy.dataCy('contact-form-submit').should('be.visible').click();
          cy.dataCy('dialog-content').scrollTo('top');
          cy.dataCy('contact-form-subject')
            .find('.q-field__messages')
            .should('be.visible')
            .and('contain', i18n.global.t('index.contact.subjectRequired'));
          cy.dataCy('contact-form-subject')
            .find('.q-field__control')
            .should('have.class', 'text-negative');
          cy.dataCy('dialog-content').scrollTo('top');
          cy.dataCy('contact-form-subject-input')
            .should('be.visible')
            .type('question');
          // Input lost focus to apply lazy validation rules
          cy.dataCy('dialog-header').click();
          cy.dataCy('contact-form-subject')
            .find('.q-field__messages')
            .should('not.be.visible');
          cy.dataCy('contact-form-subject')
            .find('.q-field__control')
            .should('not.have.class', 'text-negative');
          cy.dataCy('dialog-content').scrollTo('bottom');
          cy.dataCy('contact-form-submit').should('be.visible').click();
          cy.dataCy('dialog-content').scrollTo('top');
          cy.dataCy('contact-form-message')
            .find('.q-field__messages')
            .should('be.visible')
            .and('contain', i18n.global.t('index.contact.messageRequired'));
          cy.dataCy('contact-form-message')
            .find('.q-field__control')
            .should('have.class', 'text-negative');
          cy.dataCy('contact-form-message-input')
            .should('be.visible')
            .type('what is the minimum distance to ride to work?');
          cy.dataCy('dialog-content').scrollTo('bottom');
          cy.dataCy('contact-form-submit').should('be.visible').click();
          cy.dataCy('contact-form-email')
            .find('.q-field__messages')
            .should('be.visible')
            .and('contain', i18n.global.t('index.contact.emailRequired'));
          cy.dataCy('contact-form-email')
            .find('.q-field__control')
            .should('have.class', 'text-negative');
        });
    });

    it('allows user to display event modal', () => {
      cy.dataCy('dialog-card-event').should('not.exist');
      cy.dataCy('list-event')
        .should('be.visible')
        .find('.card-link')
        .should('be.visible')
        .click();
      cy.dataCy('dialog-card-event').should('be.visible');
    });

    it('allows user to display offer modal', () => {
      cy.dataCy('dialog-offer').should('not.exist');
      cy.dataCy('list-card-offer-item').first().should('be.visible').click();
      cy.dataCy('dialog-offer').should('be.visible');
    });

    it('allows user to switch language', () => {
      let i18n;
      cy.window().should('have.property', 'i18n');
      cy.window()
        .then((win) => {
          i18n = win.i18n;
        })
        .then(() => {
          cy.dataCy('index-title')
            .should('be.visible')
            .and('contain', i18n.global.t('index.title'));
          const locales = i18n.global.availableLocales;
          locales.forEach((locale) => {
            let initialActiveLocale = i18n.global.locale;
            if (locale === initialActiveLocale) {
              return;
            }
            cy.dataCy('switcher-' + locale)
              .should('exist')
              .and('be.visible')
              .find('.q-btn')
              .click();
            cy.dataCy('switcher-' + initialActiveLocale)
              .find('.q-btn')
              .should('not.have', 'font-weight', '400');
            cy.dataCy('switcher-' + locale)
              .find('.q-btn')
              .should('have.css', 'font-weight', '700');
            cy.dataCy('index-title')
              .should('be.visible')
              .and('contain', i18n.global.messages[locale].index.title);
          });
        });
    });

    it('allows user to scroll to top using the footer button', () => {
      cy.dataCy('footer-top-button-mobile').should('be.visible').click();
      /**
       * Second click helps to overcome a ResizeObserver loop completed
       * with undelivered notifications error
       */
      cy.window().its('scrollY').should('equal', 0);
    });

    it('allows user to access menu in bottom panel', () => {
      cy.dataCy('footer-panel').should('be.visible');
      cy.dataCy('footer-panel-menu').should('be.visible');
      cy.dataCy('footer-panel-menu-hamburger').should('be.visible').click();
      cy.dataCy('footer-panel-menu-dialog')
        .should('be.visible')
        .find('.q-item')
        .should('have.length', 5);
    });
  });

  // TODO: test links

  // TODO: test switching language

  // TODO: test rewatching application guide

  // TODO: test adding event to calendar

  // TODO: test displaying notifications

  // TODO: test redirecting to other pages through menu

  // TODO: test outbound links to social media
});
