import { createPinia, setActivePinia } from 'pinia';
import { colors } from 'quasar';
// import { computed } from 'vue';
import ProfileDetails from 'components/profile/ProfileDetails.vue';
import { i18n } from '../../boot/i18n';
import { rideToWorkByBikeConfig } from '../../boot/global_vars';
import { useLoginStore } from '../../stores/login';
import { getGenderLabel } from '../../utils/get_gender_label';
import { useOrganizations } from '../../composables/useOrganizations';
// import { useRegisterChallengeStore } from 'stores/registerChallenge';
import { interceptOrganizationsApi } from '../../../test/cypress/support/commonTests';
import { OrganizationType } from '../../components/types/Organization';
import { useChallengeStore } from '../../stores/challenge';

// colors
const { getPaletteColor } = colors;
const positive = getPaletteColor('positive');
const negative = getPaletteColor('negative');

const { getOrganizationLabels } = useOrganizations();

// selectors
const classSelectorToggleInner = '.q-toggle__inner';
const classSelectorToggleInnerFalsy = 'q-toggle__inner--falsy';
const classSelectorToggleInnerTruthy = 'q-toggle__inner--truthy';
const selectorAddressSubsidiary = 'profile-details-address-subsidiary';
const selectorDeliveryAddress = 'profile-details-delivery-address';
// const selectorDownloadInvoice = 'profile-details-download-invoice';
const selectorEmail = 'profile-details-email';
const selectorFormEmail = 'profile-details-form-email';
const selectorFormGender = 'profile-details-form-gender';
const selectorFormNickname = 'profile-details-form-nickname';
const selectorGender = 'profile-details-gender';
const selectorLanguage = 'profile-details-language';
const selectorLanguageSwitcher = 'profile-details-language-switcher';
const selectorNickname = 'profile-details-nickname';
const selectorOrganizationType = 'profile-details-organization-type';
const selectorOrganization = 'profile-details-organization';
const selectorPackage = 'profile-details-package';
const selectorPaymentState = 'profile-details-payment-state';
const selectorPersonalDetails = 'profile-details';
const selectorPhone = 'profile-details-phone';
// const selectorProfileCoordinatorContact = 'profile-coordinator-contact';
const selectorSize = 'profile-details-size';
// const selectorState = 'profile-details-state';
const selectorTeam = 'profile-details-team';
const selectorTelephoneOptIn = 'profile-details-telephone-opt-in';
const selectorDeleteAccount = 'delete-account';
// const selectorTrackingNumber = 'profile-details-tracking-number';
const selectorTitleChallengeDetails = 'profile-title-challenge-details';
const selectorTitlePersonalDetails = 'profile-title-personal-details';
const selectorTitleRegistrationDetails = 'profile-title-registration-details';
const selectorTitleStarterPackage = 'profile-title-starter-package';
const dataSelectorButtonCancel = '[data-cy="form-button-cancel"]';
const dataSelectorButtonSave = '[data-cy="form-button-save"]';
const dataSelectorEdit = '[data-cy="details-item-edit"]';
const dataSelectorInput = '[data-cy="form-input"]';
const dataSelectorInputEmail = '[data-cy="form-email"]';
const dataSelectorInputPassword = '[data-cy="form-password"]';
const dataSelectorIconPaymentState =
  '[data-cy="profile-details-payment-state-icon"]';
const dataSelectorLabel = '[data-cy="details-item-label"]';
const dataSelectorValue = '[data-cy="details-item-value"]';

// variables
const genderFemaleKey = 'global.woman';
const genderMaleKey = 'global.man';
const password = '123456a';

describe('<ProfileDetails>', () => {
  it('has translation for all strings', () => {
    cy.testLanguageStringsInContext(
      [
        'buttonDownloadInvoice',
        'inviteTeamMembers',
        'descriptionNickname',
        'labelAddressSubsidiary',
        'labelDeliveryAddress',
        'labelEmail',
        'labelEmailEmpty',
        'labelGender',
        'labelGenderEmpty',
        'labelLanguage',
        'labelLanguageEmpty',
        'labelNickname',
        'labelNicknameEmpty',
        'labelNoValue',
        'labelOrganization',
        'labelOrganizationType',
        'labelPackage',
        'labelPaymentState',
        'labelPaymentStateNotPaid',
        'labelPaymentStatePaid',
        'labelPaymentStatePaidByCompany',
        'labelSize',
        'labelState',
        'labelTeam',
        'labelTelephoneOptIn',
        'labelTrackingNumber',
        'messageProfileIdMissing',
        'titleChallengeDetails',
        'titlePersonalDetails',
        'titleUpdateEmail',
        'titleUpdateGender',
        'titleUpdateNickname',
        'titleUpdateTeam',
        'titleRegistrationDetails',
      ],
      'profile',
      i18n,
    );
    cy.testLanguageStringsInContext(
      ['apiMessageError', 'apiMessageErrorWithMessage', 'apiMessageSuccess'],
      'putRegisterChallenge',
      i18n,
    );
  });

  context('desktop', () => {
    beforeEach(() => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeProfile.json').then(
        (responseRegisterChallenge) => {
          cy.fixture('apiGetHasOrganizationAdminResponseFalse').then(
            (responseHasOrganizationAdmin) => {
              cy.interceptRegisterChallengeGetApi(
                rideToWorkByBikeConfig,
                i18n,
                responseRegisterChallenge,
              );
              cy.interceptHasOrganizationAdminGetApi(
                rideToWorkByBikeConfig,
                i18n,
                responseRegisterChallenge.results[0].organization_id,
                responseHasOrganizationAdmin,
              );
              interceptOrganizationsApi(
                rideToWorkByBikeConfig,
                i18n,
                OrganizationType.company,
              );
              cy.interceptSubsidiariesGetApi(
                rideToWorkByBikeConfig,
                i18n,
                responseRegisterChallenge.results[0].organization_id,
              );
              cy.fixture('apiGetTeamsResponse').then((teamsResponse) => {
                cy.fixture('apiGetTeamsResponseNextFullTeam').then(
                  (teamsResponseNextFullTeam) => {
                    // intercept teams for first subsidiary
                    cy.interceptTeamsGetApi(
                      rideToWorkByBikeConfig,
                      i18n,
                      responseRegisterChallenge.results[0].subsidiary_id,
                      teamsResponse,
                      teamsResponseNextFullTeam,
                    );
                  },
                );
              });
              cy.interceptMyTeamGetApi(rideToWorkByBikeConfig, i18n);
              // we test with merchandise unavailable to make sure the merch is always shown
              cy.fixture('apiGetMerchandiseResponseUnavailable').then(
                (response) => {
                  cy.fixture('apiGetMerchandiseResponseUnavailableNext').then(
                    (responseNext) => {
                      cy.interceptMerchandiseGetApi(
                        rideToWorkByBikeConfig,
                        i18n,
                        response,
                        responseNext,
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.fixture('apiGetThisCampaign').then((apiGetThisCampaign) => {
        cy.wrap(useChallengeStore()).then((challengeStore) => {
          challengeStore.setMaxTeamMembers(
            apiGetThisCampaign['results'][0]['max_team_members'],
          );
        });
      });
      cy.viewport('macbook-16');
    });

    coreTests();
  });

  context('mobile', () => {
    beforeEach(() => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeProfile.json').then(
        (responseRegisterChallenge) => {
          cy.fixture('apiGetHasOrganizationAdminResponseFalse').then(
            (responseHasOrganizationAdmin) => {
              cy.interceptRegisterChallengeGetApi(
                rideToWorkByBikeConfig,
                i18n,
                responseRegisterChallenge,
              );
              cy.interceptHasOrganizationAdminGetApi(
                rideToWorkByBikeConfig,
                i18n,
                responseRegisterChallenge.results[0].organization_id,
                responseHasOrganizationAdmin,
              );
              interceptOrganizationsApi(
                rideToWorkByBikeConfig,
                i18n,
                OrganizationType.company,
              );
              cy.interceptSubsidiariesGetApi(
                rideToWorkByBikeConfig,
                i18n,
                responseRegisterChallenge.results[0].organization_id,
              );
              // intercept teams API
              cy.fixture('apiGetTeamsResponse').then((teamsResponse) => {
                cy.fixture('apiGetTeamsResponseNextFullTeam').then(
                  (teamsResponseNextFullTeam) => {
                    cy.interceptTeamsGetApi(
                      rideToWorkByBikeConfig,
                      i18n,
                      responseRegisterChallenge.results[0].subsidiary_id,
                      teamsResponse,
                      teamsResponseNextFullTeam,
                    );
                  },
                );
              });
              cy.interceptMyTeamGetApi(rideToWorkByBikeConfig, i18n);
              cy.interceptMerchandiseGetApi(rideToWorkByBikeConfig, i18n);
            },
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.fixture('apiGetThisCampaign').then((apiGetThisCampaign) => {
        cy.wrap(useChallengeStore()).then((challengeStore) => {
          challengeStore.setMaxTeamMembers(
            apiGetThisCampaign['results'][0]['max_team_members'],
          );
        });
      });
      cy.viewport('iphone-6');
    });

    coreTests();
  });

  context('payment individual - paid', () => {
    it('renders registration details section', () => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeIndividualPaid.json').then(
        (responseRegisterChallenge) => {
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseRegisterChallenge,
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.viewport('macbook-16');

      // registration payment state
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorLabel)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelPaymentState'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorValue)
        .should('contain', i18n.global.t('profile.labelPaymentStatePaid'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorIconPaymentState)
        .should('be.visible')
        .and('have.color', positive);
    });
  });

  context('payment individual - not paid', () => {
    it('renders registration details section', () => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeIndividualNotPaid.json').then(
        (responseRegisterChallenge) => {
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseRegisterChallenge,
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.viewport('macbook-16');

      // registration payment state
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorLabel)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelPaymentState'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorValue)
        .should('contain', i18n.global.t('profile.labelPaymentStateNotPaid'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorIconPaymentState)
        .should('be.visible')
        .and('have.color', negative);
    });
  });

  context('payment voucher - FULL', () => {
    it('renders registration details section', () => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeVoucherFull.json').then(
        (responseRegisterChallenge) => {
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseRegisterChallenge,
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.viewport('macbook-16');

      // payment state
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorLabel)
        .should('be.visible');
      // registration payment state
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorLabel)
        .should('contain', i18n.global.t('profile.labelPaymentState'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorValue)
        .should('contain', i18n.global.t('profile.labelPaymentStatePaid'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorIconPaymentState)
        .should('be.visible')
        .and('have.color', positive);
    });
  });

  context('payment voucher - HALF', () => {
    it('renders registration details section', () => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeVoucherHalf.json').then(
        (responseRegisterChallenge) => {
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseRegisterChallenge,
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.viewport('macbook-16');

      // registration payment state
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorLabel)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelPaymentState'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorValue)
        .should('contain', i18n.global.t('profile.labelPaymentStatePaid'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorIconPaymentState)
        .should('be.visible')
        .and('have.color', positive);
    });
  });

  context('payment company - waiting', () => {
    it('renders registration details section', () => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeCompanyWaiting.json').then(
        (responseRegisterChallenge) => {
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseRegisterChallenge,
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.viewport('macbook-16');

      // registration payment state
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorLabel)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelPaymentState'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorValue)
        .should('contain', i18n.global.t('profile.labelPaymentStateNotPaid'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorIconPaymentState)
        .should('be.visible')
        .and('have.color', negative);
    });
  });

  context('payment company - no admission', () => {
    it('renders registration details section', () => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeCompanyNoAdmission.json').then(
        (responseRegisterChallenge) => {
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseRegisterChallenge,
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.viewport('macbook-16');

      // registration payment state
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorLabel)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelPaymentState'));
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorValue)
        .should(
          'contain',
          i18n.global.t('profile.labelPaymentStatePaidByCompany'),
        );
      cy.dataCy(selectorPaymentState)
        .find(dataSelectorIconPaymentState)
        .should('be.visible')
        .and('have.color', positive);
    });
  });

  context('payment company - no merch', () => {
    it('renders registration details section', () => {
      setActivePinia(createPinia());
      cy.fixture('apiGetRegisterChallengeProfileNoMerch.json').then(
        (responseRegisterChallenge) => {
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseRegisterChallenge,
          );
        },
      );
      cy.mount(ProfileDetails, {
        props: {},
      });
      cy.viewport('macbook-16');

      // starter package (label)
      cy.dataCy(selectorPackage)
        .find(dataSelectorLabel)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelPackage'));
      // starter package (value)
      cy.dataCy(selectorPackage)
        .find(dataSelectorValue)
        .should('be.visible')
        .and('contain', i18n.global.t('form.merch.labelNoMerch'));
      // starter package size (label)
      cy.dataCy(selectorSize)
        .find(dataSelectorLabel)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelSize'));
      // starter package size (value)
      cy.dataCy(selectorSize)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelNoValue'));
    });
  });
});

function coreTests() {
  it('renders component', () => {
    cy.fixture('apiGetRegisterChallengeProfile.json').then((response) => {
      const personalDetails = response.results[0].personal_details;
      // component
      cy.dataCy(selectorPersonalDetails).should('be.visible');
      // page title
      cy.dataCy(selectorTitlePersonalDetails)
        .should('be.visible')
        .within(() => {
          cy.dataCy('section-heading-title')
            .should('be.visible')
            .and('contain', i18n.global.t('profile.titlePersonalDetails'));
        });
      // row nickname
      cy.dataCy(selectorNickname)
        .should('be.visible')
        .and('contain', personalDetails.nickname);
      // row email
      cy.dataCy(selectorEmail)
        .should('be.visible')
        .and('contain', personalDetails.email);
      // row gender
      cy.dataCy(selectorGender)
        .should('be.visible')
        .and('contain', getGenderLabel(personalDetails.sex, i18n));
      // row language
      cy.dataCy(selectorLanguage).should('be.visible');
      cy.dataCy(selectorLanguageSwitcher).should('be.visible');

      // title challenge details
      cy.dataCy(selectorTitleChallengeDetails)
        .should('be.visible')
        .within(() => {
          cy.dataCy('section-heading-title')
            .should('be.visible')
            .and('contain', i18n.global.t('profile.titleChallengeDetails'));
        });
      // row organizationType label
      cy.dataCy(selectorOrganizationType)
        .should('be.visible')
        .find(dataSelectorLabel)
        .should('contain', i18n.global.t('profile.labelOrganizationType'));
      // row organizationType value
      cy.wrap(
        getOrganizationLabels(response.results[0].organization_type).labelShort,
      ).then((organizationType) => {
        cy.dataCy(selectorOrganizationType)
          .find(dataSelectorValue)
          .should('contain', organizationType);
      });
      // row organization
      cy.fixture('formFieldCompany.json').then((formFieldCompanyResponse) => {
        cy.dataCy(selectorOrganization)
          .find(dataSelectorLabel)
          .should('contain', i18n.global.t('profile.labelOrganization'));
        cy.dataCy(selectorOrganization)
          .should('be.visible')
          .find(dataSelectorValue)
          .should('contain', formFieldCompanyResponse.results[0].name);
      });
      // row address/subsidiary
      cy.fixture('apiGetSubsidiariesResponse.json').then(
        (apiGetSubsidiariesResponse) => {
          cy.dataCy(selectorAddressSubsidiary)
            .find(dataSelectorLabel)
            .should('contain', i18n.global.t('profile.labelAddressSubsidiary'));
          cy.dataCy(selectorAddressSubsidiary)
            .find(dataSelectorValue)
            .should('be.visible')
            .and(
              'contain',
              apiGetSubsidiariesResponse.results[0].address.street,
            )
            .and(
              'contain',
              apiGetSubsidiariesResponse.results[0].address.street_number,
            )
            .and('contain', apiGetSubsidiariesResponse.results[0].address.psc)
            .and('contain', apiGetSubsidiariesResponse.results[0].address.city);
        },
      );
      // row address/subsidiary
      cy.fixture('apiGetTeamsResponse.json').then((apiGetTeamsResponse) => {
        cy.dataCy(selectorTeam)
          .find(dataSelectorLabel)
          .should('contain', i18n.global.t('profile.labelTeam'));
        cy.dataCy(selectorTeam)
          .find(dataSelectorValue)
          .should('contain', apiGetTeamsResponse.results[0].name);
      });
      // title challenge details
      cy.dataCy(selectorTitleStarterPackage)
        .should('be.visible')
        .within(() => {
          cy.dataCy('section-heading-title')
            .should('be.visible')
            .and('contain', i18n.global.t('profile.titleStarterPackage'));
        });
      // row package
      cy.fixture('apiGetMerchandiseResponse.json').then(
        (apiGetMerchandiseResponse) => {
          cy.dataCy(selectorPackage)
            .find(dataSelectorLabel)
            .should('contain', i18n.global.t('profile.labelPackage'));
          cy.dataCy(selectorPackage)
            .find(dataSelectorValue)
            .should('contain', apiGetMerchandiseResponse.results[0].name);
          // row package
          cy.dataCy(selectorSize)
            .find(dataSelectorLabel)
            .should('contain', i18n.global.t('profile.labelSize'));
          cy.dataCy(selectorSize)
            .find(dataSelectorValue)
            .should('contain', apiGetMerchandiseResponse.results[0].size);
        },
      );
      // row package
      // cy.dataCy(selectorState)
      //   .find(dataSelectorLabel)
      //   .should('contain', i18n.global.t('profile.labelState'));
      // cy.dataCy(selectorState)
      //   .find(dataSelectorValue)
      //   .should('contain', formPersonalDetails.package.state);
      // row tracking number
      // cy.dataCy(selectorTrackingNumber)
      //   .find(dataSelectorLabel)
      //   .should('contain', i18n.global.t('profile.labelTrackingNumber'));
      // cy.dataCy(selectorTrackingNumber)
      //   .find(dataSelectorValue)
      //   .should('contain', formPersonalDetails.package.trackingNumber);
      // delivery address
      cy.fixture('apiGetSubsidiariesResponse.json').then(
        (apiGetSubsidiariesResponse) => {
          cy.dataCy(selectorDeliveryAddress)
            .find(dataSelectorLabel)
            .should('contain', i18n.global.t('profile.labelDeliveryAddress'));
          cy.dataCy(selectorDeliveryAddress)
            .find(dataSelectorValue)
            .should('be.visible')
            .and(
              'contain',
              apiGetSubsidiariesResponse.results[0].address.recipient,
            )
            .and(
              'contain',
              apiGetSubsidiariesResponse.results[0].address.street,
            )
            .and(
              'contain',
              apiGetSubsidiariesResponse.results[0].address.street_number,
            )
            .and('contain', apiGetSubsidiariesResponse.results[0].address.psc)
            .and('contain', apiGetSubsidiariesResponse.results[0].address.city);
        },
      );
      // phone
      cy.dataCy(selectorPhone)
        .find(dataSelectorLabel)
        .should('contain', i18n.global.t('profile.labelPhone'));
      cy.dataCy(selectorPhone)
        .find(dataSelectorValue)
        .should('contain', response.results[0].personal_details.telephone);
      // contact participation
      cy.dataCy(selectorTelephoneOptIn)
        .should('be.visible')
        .and('contain', i18n.global.t('profile.labelTelephoneOptIn'));
      // coordinator contact
      // cy.dataCy(selectorProfileCoordinatorContact).should('be.visible');
    });
  });

  it('allows to edit nickname', () => {
    cy.fixture('apiGetRegisterChallengeProfile.json').then((response) => {
      cy.fixture('apiGetRegisterChallengeProfileUpdatedNickname.json').then(
        (responseNew) => {
          // wait for GET request
          cy.waitForRegisterChallengeGetApi(response);
          const personalDetails = response.results[0].personal_details;
          const personalDetailsNew = responseNew.results[0].personal_details;
          // nickname value
          cy.dataCy(selectorNickname)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', personalDetails.nickname);
          // nickname edit button
          cy.dataCy(selectorNickname)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          // nickname edit form
          cy.dataCy(selectorFormNickname).should('be.visible');
          // intercept POST request
          cy.interceptRegisterChallengePutApi(
            rideToWorkByBikeConfig,
            i18n,
            personalDetails.id,
            responseNew,
          );
          // override intercept GET request
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseNew,
          );
          // change nickname
          cy.dataCy(selectorFormNickname)
            .find(dataSelectorInput)
            .should('be.visible')
            .clear();
          cy.dataCy(selectorFormNickname)
            .find(dataSelectorInput)
            .type(personalDetailsNew.nickname);
          // cancel
          cy.dataCy(selectorFormNickname)
            .find(dataSelectorButtonCancel)
            .click();
          // nickname is the same
          cy.dataCy(selectorNickname)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', personalDetails.nickname);
          // change nickname
          cy.dataCy(selectorNickname)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          cy.dataCy(selectorFormNickname)
            .find(dataSelectorInput)
            .should('be.visible')
            .clear();
          cy.dataCy(selectorFormNickname)
            .find(dataSelectorInput)
            .type(personalDetailsNew.nickname);
          // save
          cy.dataCy(selectorFormNickname).find(dataSelectorButtonSave).click();
          // wait for GET request
          cy.waitForRegisterChallengeGetApi(responseNew);
          // nickname is different
          cy.dataCy(selectorNickname)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', personalDetailsNew.nickname);
          // reset nickname
          cy.dataCy(selectorNickname)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          cy.dataCy(selectorFormNickname)
            .find(dataSelectorInput)
            .should('be.visible')
            .clear();
          cy.dataCy(selectorFormNickname)
            .find(dataSelectorInput)
            .type(personalDetails.nickname);
          // intercept POST request
          cy.interceptRegisterChallengePutApi(
            rideToWorkByBikeConfig,
            i18n,
            personalDetails.id,
            response,
          );
          // override intercept GET request
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            response,
          );
          // save (enter)
          cy.dataCy(selectorFormNickname)
            .find(dataSelectorInput)
            .type('{enter}');
          // nickname is original value
          cy.dataCy(selectorNickname)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', personalDetails.nickname);
        },
      );
    });
  });

  it('allows to edit email', () => {
    cy.fixture('loginRegisterResponseChallengeActive.json').then(
      (loginRegisterResponseChallengeActive) => {
        cy.fixture('apiGetRegisterChallengeProfile.json').then((response) => {
          cy.fixture('apiGetRegisterChallengeProfileUpdatedEmail.json').then(
            (responseNew) => {
              const personalDetails = response.results[0].personal_details;
              const personalDetailsNew =
                responseNew.results[0].personal_details;
              // set current user to store
              cy.wrap(useLoginStore()).then((loginStore) => {
                loginStore.setUser(loginRegisterResponseChallengeActive.user);
              });
              // email value
              cy.dataCy(selectorEmail)
                .find(dataSelectorValue)
                .should('be.visible')
                .and('have.text', personalDetails.email);
              // email edit button
              cy.dataCy(selectorEmail)
                .find(dataSelectorEdit)
                .should('be.visible')
                .click();
              // email edit form
              cy.dataCy(selectorFormEmail).should('be.visible');
              // change email
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorInputEmail)
                .should('be.visible')
                .clear();
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorInputEmail)
                .type(personalDetailsNew.email);
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorInputPassword)
                .type(password);
              // cancel
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorButtonCancel)
                .click();
              // email is the same
              cy.dataCy(selectorEmail)
                .find(dataSelectorValue)
                .should('be.visible')
                .and('have.text', personalDetails.email);
              // change email
              cy.dataCy(selectorEmail)
                .find(dataSelectorEdit)
                .should('be.visible')
                .click();
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorInputEmail)
                .should('be.visible')
                .clear();
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorInputEmail)
                .type(personalDetailsNew.email);
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorInputPassword)
                .type(password);
              // intercept login API for checking the password
              cy.interceptLoginApi(
                rideToWorkByBikeConfig,
                i18n,
                loginRegisterResponseChallengeActive,
              );
              // intercept register-challenge POST request
              cy.interceptRegisterChallengePutApi(
                rideToWorkByBikeConfig,
                i18n,
                personalDetails.id,
                responseNew,
              );
              // override intercept register-challenge GET request
              cy.interceptRegisterChallengeGetApi(
                rideToWorkByBikeConfig,
                i18n,
                responseNew,
              );
              // save
              cy.dataCy(selectorFormEmail).find(dataSelectorButtonSave).click();
              // confirm password
              cy.wait('@loginRequest');
              // update register-challenge
              cy.wait('@putRegisterChallenge');
              // re-authenticate
              cy.wait('@loginRequest');
              // email is different
              cy.dataCy(selectorEmail)
                .find(dataSelectorValue)
                .should('be.visible')
                .and('have.text', personalDetailsNew.email);
              // deleting email is not possible
              cy.dataCy(selectorEmail)
                .find(dataSelectorEdit)
                .should('be.visible')
                .click();
              cy.dataCy(selectorFormEmail)
                .should('be.visible')
                .find(dataSelectorInputEmail)
                .clear();
              cy.dataCy(selectorFormEmail).find(dataSelectorButtonSave).click();
              cy.dataCy(selectorFormEmail).should('be.visible');
              // fill in original email
              cy.dataCy(selectorFormEmail)
                .should('be.visible')
                .find(dataSelectorInputEmail)
                .type(personalDetails.email);
              // cannot save without password
              cy.dataCy(selectorFormEmail).find(dataSelectorButtonSave).click();
              cy.dataCy(selectorFormEmail).should('be.visible');
              // fill in password
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorInputPassword)
                .type(password);
              // override intercept POST request
              cy.interceptRegisterChallengePutApi(
                rideToWorkByBikeConfig,
                i18n,
                personalDetails.id,
                response,
              );
              // override intercept GET request
              cy.interceptRegisterChallengeGetApi(
                rideToWorkByBikeConfig,
                i18n,
                response,
              );
              // save (enter)
              cy.dataCy(selectorFormEmail)
                .find(dataSelectorInputEmail)
                .type('{enter}');
              cy.dataCy(selectorEmail)
                .find(dataSelectorValue)
                .should('be.visible')
                .and('have.text', personalDetails.email);
            },
          );
        });
      },
    );
  });

  it('allows to edit gender', () => {
    cy.fixture('apiGetRegisterChallengeProfile.json').then((response) => {
      cy.fixture('apiGetRegisterChallengeProfileUpdatedGender.json').then(
        (responseNew) => {
          const personalDetails = response.results[0].personal_details;
          const personalDetailsNew = responseNew.results[0].personal_details;
          // gender value
          cy.dataCy(selectorGender)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', getGenderLabel(personalDetails.sex, i18n));
          // gender edit button
          cy.dataCy(selectorGender)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          // gender edit form
          cy.dataCy(selectorFormGender).should('be.visible');
          // intercept POST request
          cy.interceptRegisterChallengePutApi(
            rideToWorkByBikeConfig,
            i18n,
            personalDetails.id,
            responseNew,
          );
          // override intercept GET request
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseNew,
          );
          // change gender to woman
          cy.dataCy(selectorFormGender)
            .find('.q-radio__label')
            .contains(i18n.global.t(genderFemaleKey))
            .click();
          // cancel
          cy.dataCy(selectorFormGender).find(dataSelectorButtonCancel).click();
          // gender stays the same (male)
          cy.dataCy(selectorGender)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', getGenderLabel(personalDetails.sex, i18n));
          // gender edit button
          cy.dataCy(selectorGender)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          // gender edit form
          cy.dataCy(selectorFormGender).should('be.visible');
          // change gender
          cy.dataCy(selectorFormGender)
            .find('.q-radio__label')
            .contains(i18n.global.t(genderFemaleKey))
            .click();
          // save
          cy.dataCy(selectorFormGender).find(dataSelectorButtonSave).click();
          // gender is different
          cy.dataCy(selectorGender)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', getGenderLabel(personalDetailsNew.sex, i18n));
          // reset gender
          cy.dataCy(selectorGender)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          // intercept POST request
          cy.interceptRegisterChallengePutApi(
            rideToWorkByBikeConfig,
            i18n,
            personalDetails.id,
            response,
          );
          // override intercept GET request
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            response,
          );
          // gender edit form
          cy.dataCy(selectorFormGender).should('be.visible');
          // change gender
          cy.dataCy(selectorFormGender)
            .find('.q-radio__label')
            .contains(i18n.global.t(genderMaleKey))
            .click();
          // save
          cy.dataCy(selectorFormGender).find(dataSelectorButtonSave).click();
          // gender is male
          cy.dataCy(selectorGender)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', getGenderLabel(personalDetailsNew.sex, i18n));
        },
      );
    });
  });

  it('allows to edit telephone', () => {
    cy.fixture('apiGetRegisterChallengeProfile.json').then((response) => {
      cy.fixture('apiGetRegisterChallengeProfileUpdatedTelephone.json').then(
        (responseNew) => {
          // wait for GET request
          cy.waitForRegisterChallengeGetApi(response);
          const personalDetails = response.results[0].personal_details;
          const personalDetailsNew = responseNew.results[0].personal_details;
          // get initial phone value
          cy.dataCy(selectorPhone)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', personalDetails.telephone);
          // click edit phone button
          cy.dataCy(selectorPhone)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          // verify phone edit form
          cy.dataCy('profile-details-form-phone').should('be.visible');
          // intercept POST request
          cy.interceptRegisterChallengePutApi(
            rideToWorkByBikeConfig,
            i18n,
            personalDetails.id,
            responseNew,
          );
          // override intercept GET request
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            responseNew,
          );
          // change phone to new value
          cy.dataCy('profile-details-form-phone')
            .find('input')
            .should('be.visible')
            .clear();
          cy.dataCy('profile-details-form-phone')
            .find('input')
            .type(personalDetailsNew.telephone);
          // cancel
          cy.dataCy('profile-details-form-phone')
            .find(dataSelectorButtonCancel)
            .click();
          // phone stays the same
          cy.dataCy(selectorPhone)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', personalDetails.telephone);
          // click edit phone button
          cy.dataCy(selectorPhone)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          // verify phone edit form
          cy.dataCy('profile-details-form-phone').should('be.visible');
          // change phone to new value
          cy.dataCy('profile-details-form-phone')
            .find('input')
            .should('be.visible')
            .clear();
          cy.dataCy('profile-details-form-phone')
            .find('input')
            .type(personalDetailsNew.telephone);
          // save
          cy.dataCy('profile-details-form-phone')
            .find(dataSelectorButtonSave)
            .click();
          // phone is different
          cy.dataCy(selectorPhone)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', personalDetailsNew.telephone);
          // click edit phone button
          cy.dataCy(selectorPhone)
            .find(dataSelectorEdit)
            .should('be.visible')
            .click();
          // verify phone edit form
          cy.dataCy('profile-details-form-phone').should('be.visible');
          // change phone to old value
          cy.dataCy('profile-details-form-phone')
            .find('input')
            .should('be.visible')
            .clear();
          cy.dataCy('profile-details-form-phone')
            .find('input')
            .type(personalDetails.telephone);
          // intercept POST request
          cy.interceptRegisterChallengePutApi(
            rideToWorkByBikeConfig,
            i18n,
            personalDetails.id,
            response,
          );
          // override intercept GET request
          cy.interceptRegisterChallengeGetApi(
            rideToWorkByBikeConfig,
            i18n,
            response,
          );
          // save (enter)
          cy.dataCy('profile-details-form-phone').find('input').type('{enter}');
          // phone is original value
          cy.dataCy(selectorPhone)
            .find(dataSelectorValue)
            .should('be.visible')
            .and('have.text', personalDetails.telephone);
        },
      );
    });
  });

  it('allows to edit telephone opt-in setting', () => {
    cy.fixture('apiGetRegisterChallengeProfile.json').then((response) => {
      cy.fixture(
        'apiGetRegisterChallengeProfileUpdatedTelephoneOptIn.json',
      ).then((responseNew) => {
        const personalDetails = response.results[0].personal_details;
        cy.waitForRegisterChallengeGetApi(response);
        // telephone opt-in value
        cy.dataCy(selectorTelephoneOptIn)
          .find(classSelectorToggleInner)
          .should('have.class', classSelectorToggleInnerFalsy);
        // intercept POST request
        cy.interceptRegisterChallengePutApi(
          rideToWorkByBikeConfig,
          i18n,
          personalDetails.id,
          responseNew,
        );
        // override intercept GET request
        cy.interceptRegisterChallengeGetApi(
          rideToWorkByBikeConfig,
          i18n,
          responseNew,
        );
        // change telephone opt-in
        cy.dataCy(selectorTelephoneOptIn).click();
        // should be checked
        cy.dataCy(selectorTelephoneOptIn)
          .find(classSelectorToggleInner)
          .should('have.class', classSelectorToggleInnerTruthy);
      });
    });
  });

  // Team members list
  it('renders team members list', () => {
    cy.dataCy('team-members-list').should('be.visible');
    cy.dataCy('team-members').should('be.visible').click();
  });

  it('allows to change team', () => {
    cy.fixture('apiGetRegisterChallengeProfile.json').then((response) => {
      cy.fixture('apiGetRegisterChallengeProfileUpdatedTeam.json').then(
        (responseNew) => {
          const personalDetails = response.results[0].personal_details;
          cy.waitForRegisterChallengeGetApi(response);
          cy.waitForMyTeamGetApi();
          cy.fixture('apiGetTeamsResponse').then((teamsResponse) => {
            cy.fixture('apiGetTeamsResponseNextFullTeam').then(
              (teamsResponseNextFullTeam) => {
                cy.waitForTeamsGetApi(teamsResponse, teamsResponseNextFullTeam);
              },
            );
          });
          // team value is read from teams array
          cy.fixture('apiGetTeamsResponse.json').then((apiGetTeamsResponse) => {
            cy.dataCy(selectorTeam)
              .find(dataSelectorLabel)
              .should('contain', i18n.global.t('profile.labelTeam'));
            cy.dataCy(selectorTeam)
              .find(dataSelectorValue)
              .should('contain', apiGetTeamsResponse.results[0].name);
            // click edit team button
            cy.dataCy(selectorTeam)
              .find(dataSelectorEdit)
              .should('be.visible')
              .click();
            // verify change team dialog title
            cy.contains(i18n.global.t('profile.titleUpdateTeam')).should(
              'be.visible',
            );
            // verify team edit form
            cy.dataCy('profile-details-form-team').should('be.visible');
            // intercept POST request
            cy.interceptRegisterChallengePutApi(
              rideToWorkByBikeConfig,
              i18n,
              personalDetails.id,
              responseNew,
            );
            // override intercept GET request
            cy.interceptRegisterChallengeGetApi(
              rideToWorkByBikeConfig,
              i18n,
              responseNew,
            );
            // change team to new value
            cy.dataCy('profile-details-form-team')
              .find('.q-field__append')
              .should('be.visible')
              .click();
            // select new team
            cy.contains(apiGetTeamsResponse.results[1].name)
              .should('be.visible')
              .click();
            // save
            cy.dataCy('profile-details-form-team')
              .find(dataSelectorButtonSave)
              .click();
            // refetch data about teams to validate change
            cy.waitForMyTeamGetApi();
            cy.fixture('apiGetTeamsResponse').then((teamsResponse) => {
              cy.fixture('apiGetTeamsResponseNextFullTeam').then(
                (teamsResponseNextFullTeam) => {
                  cy.waitForTeamsGetApi(
                    teamsResponse,
                    teamsResponseNextFullTeam,
                  );
                },
              );
            });
            cy.waitForRegisterChallengeGetApi(responseNew);
            // team is different
            cy.dataCy(selectorTeam)
              .find(dataSelectorValue)
              .should('contain', apiGetTeamsResponse.results[1].name);
          });
        },
      );
    });
  });

  it("does not allow to change team if new team's max team members is reached", () => {
    cy.fixture('apiGetRegisterChallengeProfile.json').then((response) => {
      cy.fixture('apiGetRegisterChallengeProfileUpdatedTeam.json').then(
        (responseNew) => {
          const personalDetails = response.results[0].personal_details;
          cy.waitForRegisterChallengeGetApi(response);
          cy.waitForMyTeamGetApi();
          cy.fixture('apiGetTeamsResponse').then((teamsResponse) => {
            cy.fixture('apiGetTeamsResponseNextFullTeam').then(
              (teamsResponseNextFullTeam) => {
                cy.waitForTeamsGetApi(teamsResponse, teamsResponseNextFullTeam);
                const teamsResults = [
                  ...teamsResponse.results,
                  ...teamsResponseNextFullTeam.results,
                ];
                // team value is read from teams array
                cy.fixture('apiGetTeamsResponse.json').then(() => {
                  cy.dataCy(selectorTeam)
                    .find(dataSelectorLabel)
                    .should('contain', i18n.global.t('profile.labelTeam'));
                  // initial team name
                  cy.dataCy(selectorTeam)
                    .find(dataSelectorValue)
                    .should('contain', teamsResults[0].name);
                  // click edit team button
                  cy.dataCy(selectorTeam)
                    .find(dataSelectorEdit)
                    .should('be.visible')
                    .click();
                  // verify change team dialog title
                  cy.contains(i18n.global.t('profile.titleUpdateTeam')).should(
                    'be.visible',
                  );
                  // verify team edit form
                  cy.dataCy('profile-details-form-team').should('be.visible');
                  // intercept POST request
                  cy.interceptRegisterChallengePutApi(
                    rideToWorkByBikeConfig,
                    i18n,
                    personalDetails.id,
                    responseNew,
                  );
                  // override intercept GET request
                  cy.interceptRegisterChallengeGetApi(
                    rideToWorkByBikeConfig,
                    i18n,
                    responseNew,
                  );
                  // change team to new value
                  cy.dataCy('profile-details-form-team')
                    .find('.q-field__append')
                    .should('be.visible')
                    .click();
                  // select new FULL team
                  cy.contains(teamsResults[2].name)
                    .should('be.visible')
                    .click();
                  // save
                  cy.dataCy('profile-details-form-team')
                    .find(dataSelectorButtonSave)
                    .click();
                  // refetch data about teams to validate change
                  cy.waitForMyTeamGetApi();
                  cy.fixture('apiGetTeamsResponse').then((teamsResponse) => {
                    cy.fixture('apiGetTeamsResponseNextFullTeam').then(
                      (teamsResponseNextFullTeam) => {
                        cy.waitForTeamsGetApi(
                          teamsResponse,
                          teamsResponseNextFullTeam,
                        );
                      },
                    );
                  });
                  // show error message - full team
                  cy.contains(
                    i18n.global.t(
                      'postRegisterChallenge.messageTeamMaxMembersReached',
                    ),
                  ).should('be.visible');
                  // team is the same (despite previously overriding GET request)
                  cy.dataCy(selectorTeam)
                    .find(dataSelectorValue)
                    .should('contain', teamsResults[0].name);
                });
              },
            );
          });
        },
      );
    });
  });

  it('renders registration details section', () => {
    // title
    cy.dataCy(selectorTitleRegistrationDetails)
      .should('be.visible')
      .within(() => {
        cy.dataCy('section-heading-title')
          .should('be.visible')
          .and('contain', i18n.global.t('profile.titleRegistrationDetails'));
      });
    // payment state
    cy.dataCy(selectorPaymentState)
      .find(dataSelectorLabel)
      .should('be.visible');
    // registration payment state
    cy.dataCy(selectorPaymentState)
      .find(dataSelectorLabel)
      .should('contain', i18n.global.t('profile.labelPaymentState'));
    cy.dataCy(selectorPaymentState)
      .find(dataSelectorValue)
      .should(
        'contain',
        i18n.global.t('profile.labelPaymentStatePaidByCompany'),
      );
    cy.dataCy(selectorPaymentState)
      .find(dataSelectorIconPaymentState)
      .should('be.visible')
      .and('have.color', positive);
    // download invoice button
    // cy.dataCy(selectorDownloadInvoice)
    //   .should('be.visible')
    //   .and('contain', i18n.global.t('profile.buttonDownloadInvoice'));
  });

  it.skip('renders delete account section', () => {
    cy.dataCy(selectorDeleteAccount).should('be.visible');
  });
}
