<script lang="ts">
/**
 * EmailVerification Component
 *
 * @description * Renders a confirmation message after user registers,
 * prompting user to confirm their address by clicking the link in the email.
 *
 * @props
 * - `fixture` (LoginResponse): The object representing
 *   Cypress loginRegisterResponseChallengeActive.json fixture file.
 *   It is used by Cypress component test to load user data and save
 *   into login store.
 *
 * @example
 * <email-verification />
 *
 * @see [Figma Design](https://www.figma.com/design/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?node-id=4858-103494&t=6I4I349ASWWgGjGu-1)
 */

// libraries
import { colors, Notify } from 'quasar';
import { computed, defineComponent, inject, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

// composables
import { i18n } from '../../boot/i18n';
import { useApiSendRegistrationConfirmationEmail } from '../../composables/useApiSendRegistrationConfirmationEmail';

// config
import { rideToWorkByBikeConfig } from '../../boot/global_vars';
import { routesConf } from '../../router/routes_conf';

// stores
import { useRegisterStore } from '../../stores/register';
import { useLoginStore } from '../../stores/login';

// types
import type { Logger } from '../types/Logger';
import type { LoginResponse } from '../types/Login';

export default defineComponent({
  name: 'EmailVerification',
  props: {
    fixture: Object as () => LoginResponse,
  },
  setup(props) {
    const logger = inject('vuejs3-logger') as Logger | null;
    const loginStore = useLoginStore();
    if (window.Cypress && props.fixture) {
      logger?.debug(
        `Set user fixture data <${JSON.stringify(props.fixture.loginResponse.user, null, 2)}> into the store.`,
      );
      loginStore.setUser(props.fixture.loginResponse.user);
      logger?.debug(
        `Get user data <${JSON.stringify(props.fixture.loginResponse.user, null, 2)}> from the store.`,
      );
    }
    const registerStore = useRegisterStore();
    const email = computed(() => loginStore.getUserEmail);
    const isEmailVerified = computed(() => registerStore.getIsEmailVerified);

    const checkIsEmailVerified = async (): Promise<void> => {
      logger?.debug(
        `Check if email is verified is user logged in <${loginStore.isUserLoggedIn}>.`,
      );
      if (!isEmailVerified.value && loginStore.isUserLoggedIn) {
        logger?.info(
          'Check if email is verified by <checkIsEmailVerified()> function.',
        );
        await registerStore.checkEmailVerification();
      } else {
        const message = loginStore.isUserLoggedIn
          ? 'Email is verified'
          : 'User is not logged in';
        logger?.debug(
          `${message}, disable <checkIsEmailVerified()>` +
            ` function runned in every <${rideToWorkByBikeConfig.checkIsEmailVerifiedInterval}> seconds.`,
        );
        clearTimeout(checkIsEmailVerifiedId);
      }
    };
    logger?.debug(
      'Email verification process <checkIsEmailVerified()> function' +
        ` run in every <${rideToWorkByBikeConfig.checkIsEmailVerifiedInterval}> seconds.`,
    );
    const checkIsEmailVerifiedId = setInterval(
      checkIsEmailVerified,
      rideToWorkByBikeConfig.checkIsEmailVerifiedInterval * 1000,
    );
    // check email verification on page load
    onMounted(() => {
      checkIsEmailVerified();
    });
    const router = useRouter();
    // once email is verified, redirect to home page
    watch(isEmailVerified, (newValue) => {
      if (newValue) {
        logger?.debug(
          `Email address <${email.value}> was verified successfully, redirect to <${routesConf['home']['path']}> URL.`,
        );
        router.push(routesConf['home']['path']);
      }
    });

    // colors
    const { getPaletteColor, changeAlpha } = colors;
    const whiteOpacity = changeAlpha(
      getPaletteColor('white'),
      rideToWorkByBikeConfig.colorWhiteBackgroundOpacity,
    );

    const onRegisterAgain = (): void => {
      logger?.debug(
        `User clicked register again button, logout user and redirect to <${routesConf['register']['path']}> URL.`,
      );
      // logout current user
      loginStore.logout();
      // redirect to register page
      router.push(routesConf['register']['path']);
    };

    const { isLoading, sendRegistrationConfirmationEmail } =
      useApiSendRegistrationConfirmationEmail(logger);
    /**
     * Resend confirmation email
     * @returns {Promise<void>}
     */
    const onResendConfirmationEmail = async (): Promise<void> => {
      const data = await sendRegistrationConfirmationEmail();
      // show success message if email was sent
      if (data && data.send_registration_confirmation_email === true) {
        Notify.create({
          message: i18n.global.t(
            'sendRegistrationConfirmationEmail.apiMessageSuccess',
          ),
          color: 'positive',
        });
      }
      // show info message if email was already confirmed
      else if (data && data.send_registration_confirmation_email === false) {
        Notify.create({
          message: i18n.global.t(
            'sendRegistrationConfirmationEmail.apiMessageAlreadyConfirmed',
          ),
          color: 'warning',
        });
      }
    };

    return {
      email,
      isLoading,
      onRegisterAgain,
      onResendConfirmationEmail,
      whiteOpacity,
    };
  },
});
</script>

<template>
  <div class="bg-primary text-white" data-cy="email-verification">
    <!-- Graphics -->
    <div class="q-mb-lg" data-cy="email-verification-graphics">
      <q-avatar
        size="64px"
        :style="{ backgroundColor: whiteOpacity, color: 'white' }"
        data-cy="email-verification-avatar"
      >
        <!-- Icon -->
        <q-icon
          size="40px"
          color="white"
          name="svguse:icons/email_confirmation/icons.svg#email"
          data-cy="email-verification-icon"
        />
      </q-avatar>
    </div>
    <!-- Heading -->
    <div class="q-mb-lg">
      <h1
        class="text-h5 text-bold q-my-none"
        data-cy="email-verification-title"
      >
        {{ $t('register.form.titleEmailVerification') }}
      </h1>
    </div>
    <!-- Text -->
    <div
      data-cy="email-verification-text"
      class="q-mb-lg"
      v-html="$t('register.form.textEmailVerification', { email })"
    />
    <!-- Button: Resend confirmation email -->
    <div>
      <q-btn
        outline
        unelevated
        rounded
        padding="xs xl"
        type="button"
        color="white"
        text-color="white"
        class="q-mb-xl"
        :label="$t('register.form.buttonResendConfirmationEmail')"
        :loading="isLoading"
        @click="onResendConfirmationEmail"
        data-cy="email-verification-resend-button"
      />
    </div>
    <!-- Link: Register again -->
    <div data-cy="email-verification-wrong-email-hint">
      {{ $t('register.form.hintWrongEmail') }}
      <router-link
        class="text-white"
        to="register"
        data-cy="email-verification-register-link"
        @click.prevent="onRegisterAgain"
        >{{ $t('register.form.linkRegister') }}</router-link
      >.
    </div>
  </div>
</template>
