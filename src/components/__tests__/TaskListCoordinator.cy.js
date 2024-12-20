import TaskListCoordinator from 'components/coordinator/TaskListCoordinator.vue';
import { i18n } from '../../boot/i18n';

describe('<TaskListCoordinator>', () => {
  it('has translation for all strings', () => {
    cy.testLanguageStringsInContext(
      ['labelShowPastTasks'],
      'coordinator',
      i18n,
    );
  });

  context('desktop', () => {
    beforeEach(() => {
      cy.clock(new Date('2024-01-01').getTime());
      cy.mount(TaskListCoordinator, {
        props: {},
      });
      cy.viewport('macbook-16');
    });

    coreTests();
  });

  context('mobile', () => {
    beforeEach(() => {
      cy.clock(new Date('2024-01-01').getTime());
      cy.mount(TaskListCoordinator, {
        props: {},
      });
      cy.viewport('iphone-6');
    });

    coreTests();
  });
});

function coreTests() {
  it('renders component', () => {
    // component
    cy.dataCy('task-list-coordinator').should('be.visible');
    // show past tasks button
    cy.dataCy('task-list-show-past')
      .should('be.visible')
      .and('contain', i18n.global.t('coordinator.labelShowPastTasks'));
    // icon
    cy.dataCy('task-list-show-past').find('i').should('be.visible');
    // no past tasks
    cy.dataCy('task-item-past').should('not.exist');
    // future tasks
    cy.fixture('taskListCoordinator').then((tasks) => {
      // take last three (these are the future tasks)
      tasks = tasks.slice(3);
      cy.dataCy('task-item-future')
        .should('be.visible')
        .and('have.length', 3)
        .each(($item, index) => {
          // title
          cy.wrap($item).should('contain', tasks[index].title);
          // date
          cy.wrap($item).should(
            'contain',
            i18n.global.d(new Date(tasks[index].date), 'numeric'),
          );
          // body
          cy.wrap($item).then(($item) => {
            const textContent = $item.text();
            cy.stripHtmlTags(tasks[index].body).then((text) => {
              expect(textContent).to.contain(text);
            });
          });
        });
      // first item will have month label (based on test data)
      cy.dataCy('task-item-future')
        .first()
        .should('contain', i18n.global.d(new Date(tasks[0].date), 'monthYear'));
      cy.dataCy('task-item-future')
        .last()
        .should('contain', i18n.global.d(new Date(tasks[2].date), 'monthYear'));
    });
  });

  it('allows to show past tasks', () => {
    // show past tasks
    cy.dataCy('task-list-show-past').should('be.visible').click();
    // tasks (three past)
    cy.fixture('taskListCoordinator').then((tasks) => {
      cy.dataCy('task-item-past')
        .should('be.visible')
        .and('have.length', 3)
        .each(($item, index) => {
          // title
          cy.wrap($item).should('contain', tasks[index].title);
          // date
          cy.wrap($item).should(
            'contain',
            i18n.global.d(new Date(tasks[index].date), 'numeric'),
          );
          // body
          cy.wrap($item).then(($item) => {
            const textContent = $item.text();
            cy.stripHtmlTags(tasks[index].body).then((text) => {
              expect(textContent).to.contain(text);
            });
          });
        });
      // first item will always have month label
      cy.dataCy('task-item-past')
        .first()
        .should('contain', i18n.global.d(new Date(tasks[0].date), 'monthYear'));
    });
    // hide past tasks
    cy.dataCy('task-list-show-past').should('be.visible').click();
    // no past tasks
    cy.dataCy('task-item-past').should('not.exist');
  });
}
