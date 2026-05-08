import PlayVideoModalDialog from '../global/PlayVideoModalDialog.vue';

import { i18n } from '../../boot/i18n';
import { rideToWorkByBikeConfig } from '../../boot/global_vars';

describe('<PlayVideoModalDialog>', () => {
  context('desktop', () => {
    const videoFileName = rideToWorkByBikeConfig.urlLogRouteCalendarNumberVideo
      .split('/')
      .pop();
    beforeEach(() => {
      cy.mount(PlayVideoModalDialog, {
        props: {
          videoUrl: rideToWorkByBikeConfig.urlLogRouteCalendarNumberVideo,
          btnLabel: i18n.global.t('routes.logRouterPlayVideoBtnLabel'),
        },
      });
      cy.viewport('macbook-16');
    });

    coreTests(videoFileName);
  });

  context('mobile', () => {
    const videoFileName = rideToWorkByBikeConfig.urlLogRouteListNumberVideo
      .split('/')
      .pop();
    beforeEach(() => {
      cy.mount(PlayVideoModalDialog, {
        props: {
          videoUrl: rideToWorkByBikeConfig.urlLogRouteListNumberVideo,
          btnLabel: i18n.global.t('routes.logRouterPlayVideoBtnLabel'),
        },
      });
      cy.viewport('iphone-6');
    });

    coreTests(videoFileName);
  });
});

function coreTests(videoFileName) {
  it('renders component', () => {
    cy.playVideoModalDialog(videoFileName, i18n);
  });
}
