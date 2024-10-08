<script lang="ts">
/**
 * RegisterChallengePage Component
 *
 * The `RegisterChallengePage` displays registration process for each challenge
 *
 * @description * Use this component to allow users to register for an
 * individual challenge.
 *
 * @components
 * - `FormFieldSelectTable`: Component to render company select widget.
 * - `FormFieldListMerch`: Component to render list of merch options.
 * - `FormFieldOptionGroup`: Component to render radio buttons.
 * - `FormPersonalDetails`: Component to render personal details form.
 * - `FormSelectOrganization`: Component to render organization select widget.
 * - `LoginRegisterHeader`: Component to render page header.
 * - `TopBarCountdown`: Component to display countdown.
 *
 * @layout
 * - `LoginRegisterLayout`: Displayed within the `LoginLayout` template.
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=6385%3A26514&mode=dev)
 */

// libraries
import { defineComponent, ref } from 'vue';
import { QForm, QStepper } from 'quasar';

// config
import { rideToWorkByBikeConfig } from '../boot/global_vars';

// components
import FormFieldSelectTable from 'src/components/form/FormFieldSelectTable.vue';
import FormFieldListMerch from 'src/components/form/FormFieldListMerch.vue';
import FormFieldOptionGroup from 'src/components/form/FormFieldOptionGroup.vue';
import FormPersonalDetails from 'src/components/form/FormPersonalDetails.vue';
import FormSelectOrganization from 'src/components/form/FormSelectOrganization.vue';
import LoginRegisterHeader from 'components/global/LoginRegisterHeader.vue';
import TopBarCountdown from 'src/components/global/TopBarCountdown.vue';

// composables
import { useStepperValidation } from 'src/composables/useStepperValidation';

// types
import type { FormSelectTableOption } from 'src/components/types/Form';

export default defineComponent({
  name: 'RegisterChallengePage',
  components: {
    FormFieldSelectTable,
    FormFieldListMerch,
    FormFieldOptionGroup,
    FormPersonalDetails,
    FormSelectOrganization,
    LoginRegisterHeader,
    TopBarCountdown,
  },
  setup() {
    const challengeMonth = rideToWorkByBikeConfig.challengeMonth;
    const containerFormWidth = rideToWorkByBikeConfig.containerFormWidth;
    const doneIcon = `img:${
      new URL('../assets/svg/check.svg', import.meta.url).href
    }`;
    // Stepper 1 imgs
    const iconImgSrcStepper1 = `img:${
      new URL('../assets/svg/numeric-1-outline.svg', import.meta.url).href
    }`;
    const activeIconImgSrcStepper1 = `img:${
      new URL('../assets/svg/numeric-1-fill.svg', import.meta.url).href
    }`;
    const doneIconImgSrcStepper1 = doneIcon;
    // Stepper 2 imgs
    const iconImgSrcStepper2 = `img:${
      new URL('../assets/svg/numeric-2-outline.svg', import.meta.url).href
    }`;
    const activeIconImgSrcStepper2 = `img:${
      new URL('../assets/svg/numeric-2-fill.svg', import.meta.url).href
    }`;
    const doneIconImgSrcStepper2 = doneIcon;
    // Stepper 3 imgs
    const iconImgSrcStepper3 = `img:${
      new URL('../assets/svg/numeric-3-outline.svg', import.meta.url).href
    }`;
    const activeIconImgSrcStepper3 = `img:${
      new URL('../assets/svg/numeric-3-fill.svg', import.meta.url).href
    }`;
    const doneIconImgSrcStepper3 = doneIcon;
    // Stepper 4 imgs
    const iconImgSrcStepper4 = `img:${
      new URL('../assets/svg/numeric-4-outline.svg', import.meta.url).href
    }`;
    const activeIconImgSrcStepper4 = `img:${
      new URL('../assets/svg/numeric-4-fill.svg', import.meta.url).href
    }`;
    const doneIconImgSrcStepper4 = doneIcon;
    // Stepper 5 imgs
    const iconImgSrcStepper5 = `img:${
      new URL('../assets/svg/numeric-5-outline.svg', import.meta.url).href
    }`;
    const activeIconImgSrcStepper5 = `img:${
      new URL('../assets/svg/numeric-5-fill.svg', import.meta.url).href
    }`;
    const doneIconImgSrcStepper5 = doneIcon;
    // Stepper 6 imgs
    const iconImgSrcStepper6 = `img:${
      new URL('../assets/svg/numeric-6-outline.svg', import.meta.url).href
    }`;
    const activeIconImgSrcStepper6 = `img:${
      new URL('../assets/svg/numeric-6-fill.svg', import.meta.url).href
    }`;
    const doneIconImgSrcStepper6 = doneIcon;

    const participation = ref<string>('');

    const teamOptions: FormSelectTableOption[] = [
      {
        label: 'Zelený team',
        value: 'team-1',
        members: 2,
        maxMembers: 5,
      },
      {
        label: 'Modrý team',
        value: 'team-2',
        members: 5,
        maxMembers: 5,
      },
    ];
    const team = ref<string>('');

    const step = ref(1);
    const stepperRef = ref<typeof QStepper | null>(null);
    const stepCompanyRef = ref<typeof QForm | null>(null);
    const stepParticipationRef = ref<typeof QForm | null>(null);
    const stepPaymentRef = ref<typeof QForm | null>(null);
    const stepPersonalDetailsRef = ref<typeof QForm | null>(null);
    const stepTeamRef = ref<typeof QForm | null>(null);

    const { onBack, onContinue } = useStepperValidation({
      step,
      stepperRef,
      stepCompanyRef,
      stepParticipationRef,
      stepPaymentRef,
      stepPersonalDetailsRef,
      stepTeamRef,
    });

    return {
      challengeMonth,
      containerFormWidth,
      step,
      stepperRef,
      stepCompanyRef,
      stepPaymentRef,
      stepParticipationRef,
      stepPersonalDetailsRef,
      stepTeamRef,
      iconImgSrcStepper1,
      activeIconImgSrcStepper1,
      doneIconImgSrcStepper1,
      iconImgSrcStepper2,
      activeIconImgSrcStepper2,
      doneIconImgSrcStepper2,
      iconImgSrcStepper3,
      activeIconImgSrcStepper3,
      doneIconImgSrcStepper3,
      iconImgSrcStepper4,
      activeIconImgSrcStepper4,
      doneIconImgSrcStepper4,
      iconImgSrcStepper5,
      activeIconImgSrcStepper5,
      doneIconImgSrcStepper5,
      iconImgSrcStepper6,
      activeIconImgSrcStepper6,
      doneIconImgSrcStepper6,
      participation,
      team,
      teamOptions,
      onBack,
      onContinue,
    };
  },
});
</script>

<template>
  <top-bar-countdown data-cy="top-bar-countdown" />
  <q-page padding class="bg-secondary">
    <div class="q-px-lg">
      <!-- Page header -->
      <login-register-header data-cy="login-register-header" />
      <!-- Container -->
      <div
        class="q-mx-auto q-mt-xl"
        :style="{ 'max-width': containerFormWidth }"
      >
        <!-- Page title -->
        <h1
          class="text-h5 text-bold text-white q-my-none"
          data-cy="login-register-title"
        >
          {{
            $t(`register.challenge.titleRegisterToChallenge.${challengeMonth}`)
          }}
        </h1>
        <q-stepper
          animated
          header-nav
          vertical
          keep-alive
          ref="stepperRef"
          v-model="step"
          color="primary"
          class="bg-transparent q-py-none q-mt-lg"
          style="box-shadow: none"
          data-cy="stepper"
        >
          <!-- Step: Personal details -->
          <q-step
            :name="1"
            :title="$t('register.challenge.titleStepPersonalDetails')"
            :icon="iconImgSrcStepper1"
            :active-icon="activeIconImgSrcStepper1"
            :done-icon="doneIconImgSrcStepper1"
            :done="step > 1"
            :header-nav="step > 1"
            class="bg-white"
            data-cy="step-1"
          >
            <q-form ref="stepPersonalDetailsRef">
              <form-personal-details data-cy="form-personal-details" />
            </q-form>
            <q-stepper-navigation class="flex justify-end">
              <q-btn
                unelevated
                rounded
                color="primary"
                :label="$t('navigation.continue')"
                @click="onContinue"
                data-cy="step-1-continue"
              />
            </q-stepper-navigation>
          </q-step>
          <!-- Step: Payment -->
          <q-step
            :name="2"
            :title="$t('register.challenge.titleStepPayment')"
            :icon="iconImgSrcStepper2"
            :active-icon="activeIconImgSrcStepper2"
            :done-icon="doneIconImgSrcStepper2"
            :done="step > 2"
            :header-nav="step > 2"
            class="bg-white q-mt-lg"
            data-cy="step-2"
          >
            <q-form ref="stepPaymentRef">
              <register-challenge-payment />
            </q-form>
            <!-- TODO: Handle redirection to payment gateway and back to registration -->
            <q-stepper-navigation class="flex justify-end">
              <q-btn
                unelevated
                rounded
                outline
                color="primary"
                :label="$t('navigation.back')"
                @click="onBack"
                data-cy="step-2-back"
              />
              <q-btn
                unelevated
                rounded
                color="primary"
                :label="$t('navigation.continue')"
                @click="onContinue"
                class="q-ml-sm"
                data-cy="step-2-continue"
              />
            </q-stepper-navigation>
          </q-step>
          <!-- Step: Participation -->
          <q-step
            :name="3"
            :title="$t('register.challenge.titleStepParticipation')"
            :icon="iconImgSrcStepper3"
            :active-icon="activeIconImgSrcStepper3"
            :done-icon="doneIconImgSrcStepper3"
            :done="step > 3"
            :header-nav="step > 3"
            class="bg-white q-mt-lg"
            data-cy="step-3"
          >
            <q-form ref="stepParticipationRef">
              <p class="q-mb-md">
                {{ $t('form.participation.titleParticipation') }}
              </p>
              <form-field-option-group
                v-model="participation"
                name="participation"
                label="form.labelParticipation"
              />
              <p class="q-mt-lg q-mb-none">
                {{ $t('form.participation.hintPariticipation') }}
              </p>
            </q-form>
            <q-stepper-navigation class="flex justify-end">
              <q-btn
                unelevated
                rounded
                outline
                @click="onBack"
                color="primary"
                :label="$t('navigation.back')"
                data-cy="step-3-back"
              />
              <q-btn
                unelevated
                rounded
                @click="onContinue"
                color="primary"
                :label="$t('navigation.continue')"
                class="q-ml-sm"
                data-cy="step-3-continue"
              />
            </q-stepper-navigation>
          </q-step>
          <!-- Step: Company -->
          <q-step
            :name="4"
            :title="$t('register.challenge.titleStepCompany')"
            :icon="iconImgSrcStepper4"
            :active-icon="activeIconImgSrcStepper4"
            :done-icon="doneIconImgSrcStepper4"
            :done="step > 4"
            :header-nav="step > 4"
            class="bg-white q-mt-lg"
            data-cy="step-4"
          >
            <q-form ref="stepCompanyRef">
              <form-select-organization />
            </q-form>
            <q-stepper-navigation>
              <div class="flex justify-end">
                <q-btn
                  unelevated
                  rounded
                  outline
                  @click="onBack"
                  color="primary"
                  :label="$t('navigation.back')"
                  data-cy="step-4-back"
                />
                <q-btn
                  unelevated
                  rounded
                  color="primary"
                  :label="$t('navigation.continue')"
                  @click="onContinue"
                  class="q-ml-sm"
                  data-cy="step-4-continue"
                />
              </div>
              <div
                class="flex items-center gap-8 q-mt-md"
                data-cy="step-4-info"
              >
                <q-icon name="info" size="18px" color="primary" />
                <p class="q-mt-none q-mb-none text-caption text-grey-7">
                  {{ $t('form.company.textCoordinator') }}
                </p>
              </div>
            </q-stepper-navigation>
          </q-step>
          <!-- Step: Team -->
          <q-step
            :name="5"
            :title="$t('register.challenge.titleStepTeam')"
            :icon="iconImgSrcStepper5"
            :active-icon="activeIconImgSrcStepper5"
            :done-icon="doneIconImgSrcStepper5"
            :done="step > 5"
            :header-nav="step > 5"
            class="bg-white q-mt-lg"
            data-cy="step-5"
          >
            <q-form ref="stepTeamRef">
              <form-field-select-table
                v-model="team"
                variant="team"
                :options="teamOptions"
                :label="$t('form.team.labelTeam')"
                :label-button="$t('form.team.buttonAddTeam')"
                :label-button-dialog="$t('form.team.buttonAddTeam')"
                :title-dialog="$t('form.team.titleAddTeam')"
                data-cy="form-select-table-team"
              />
            </q-form>
            <q-stepper-navigation class="flex justify-end">
              <q-btn
                unelevated
                rounded
                outline
                @click="onBack"
                color="primary"
                :label="$t('navigation.back')"
                data-cy="step-5-back"
              />
              <q-btn
                unelevated
                rounded
                color="primary"
                :label="$t('navigation.continue')"
                @click="onContinue"
                class="q-ml-sm"
                data-cy="step-5-continue"
              />
            </q-stepper-navigation>
          </q-step>
          <!-- Step: Merch -->
          <q-step
            :name="6"
            :title="$t('register.challenge.titleStepMerch')"
            :icon="iconImgSrcStepper6"
            :active-icon="activeIconImgSrcStepper6"
            :done-icon="doneIconImgSrcStepper6"
            :done="step > 6"
            :header-nav="step > 6"
            class="bg-white q-mt-lg"
            data-cy="step-6"
          >
            <q-form ref="stepMerchRef">
              <form-field-list-merch />
            </q-form>
            <q-stepper-navigation class="flex justify-end">
              <q-btn
                unelevated
                rounded
                outline
                @click="onBack"
                color="primary"
                :label="$t('navigation.back')"
                data-cy="step-6-back"
              />
              <q-btn
                unelevated
                rounded
                color="primary"
                :label="$t('form.buttonCompleteRegistration')"
                @click="onContinue"
                class="q-ml-sm"
                data-cy="step-6-continue"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
// hide vertical line between steps
:deep(.q-stepper--vertical .q-stepper__dot:before),
:deep(.q-stepper--vertical .q-stepper__dot:after) {
  display: none;
}
// add rounded corners
:deep(.q-stepper__step) {
  border-radius: 16px;
}
// override step padding
:deep(.q-stepper__tab) {
  padding: 24px 24px;
}
:deep(.q-stepper__step-inner) {
  padding: 8px 24px 24px;
}
// override separate rule for last step padding
:deep(.q-stepper--vertical .q-stepper__step:last-child .q-stepper__step-inner) {
  padding-bottom: 24px;
}
// larger step dot (number)
:deep(.q-stepper__dot) {
  font-size: 38px;
  width: 38px;
  height: 38px;
  max-width: 38px;
  background-color: #fff;
  margin-right: 16px;
}
// larger step title
:deep(.q-stepper__title) {
  color: $grey-10;
  font-size: 16px;
  font-weight: 700;
}
:deep(.q-stepper__tab--done) {
  padding-right: 48px;
}
:deep(.q-stepper__tab--done:after) {
  content: '';
  position: absolute;
  background-image: url('../assets/svg/edit.svg');
  width: 24px;
  height: 24px;
  right: 24px;
}
</style>
