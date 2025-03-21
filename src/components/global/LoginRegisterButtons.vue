<script lang="ts">
/**
 * LoginRegisterButtons Component
 *
 * The `LoginRegisterButtons` component is used for login or registration
 * via external providers such as Google, Facebook, etc.
 *
 * @description * Use this component to render the buttons and handle
 * authentication.
 *
 * Note: This component is commonly used in `FormLogin` and `FormRegister`.
 *
 * @props
 * - `variant` (String: 'login' | 'register', required): Determines the
 * function based on whether the component is used for login or
 * registration.
 *
 * @example
 * <login-register-buttons />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=6274%3A28817&mode=dev)
 */

import { Notify } from 'quasar';
import { defineComponent, inject } from 'vue';
import { CallbackTypes } from 'vue3-google-login';

// components
import { VFBLoginScope as VFacebookLoginScope } from 'vue-facebook-login-component-next';

// composables
import { i18n } from '../../boot/i18n';
import { useLocale } from '../../composables/useLocale';

// config
import { rideToWorkByBikeConfig } from '../../boot/global_vars';

// enums
import { FacebookLoginStatus } from '../types/Login';

// stores
import { useLoginStore } from '../../stores/login';

// types
import type { Logger } from '../types/Logger';
import type { FacebookLoginResponse } from '../types/Login';

export default defineComponent({
  name: 'LoginRegisterButtons',
  components: {
    VFacebookLoginScope,
  },
  props: {
    variant: {
      type: String as () => 'login' | 'register',
      required: true,
    },
  },
  setup() {
    const loginStore = useLoginStore();
    const logger: Logger | undefined = inject('vuejs3-logger');
    const facebookLoginAppId = rideToWorkByBikeConfig.facebookLoginAppId;

    /**
     * Hide Google login button if no client ID is provided.
     * Client ID is provided in `google_login.js` boot file.
     */
    const isGoogleLoginAvailable: boolean =
      !!rideToWorkByBikeConfig.googleLoginAppId &&
      rideToWorkByBikeConfig.googleLoginAppId !==
        rideToWorkByBikeConfig.secretString;

    logger?.debug(
      'Is Google login button widget available (Google ID' +
        ` <${rideToWorkByBikeConfig.googleLoginAppId}> is provided)` +
        ` <${isGoogleLoginAvailable}>.`,
    );

    const onGoogleLogin = async (response: CallbackTypes.CodePopupResponse) => {
      logger?.debug(
        `Google login component response <${JSON.stringify(response, null, 2)}>.`,
      );
      if (response) {
        await loginStore.authenticateWithGoogle(response);
      }
    };

    const onGoogleLoginError = (error: CallbackTypes.ErrorPopupResponse) => {
      logger?.error(`Google login component error <${error.message}>.`);

      /**
       * Types of error based on `TokenClientConfig` class defined in
       * the `vue3-google-login` library.
       */
      if (error.type === 'popup_failed_to_open') {
        Notify.create({
          message: i18n.global.t('login.messagePopupFailedToOpen'),
          color: 'negative',
        });
      } else if (error.type === 'popup_closed') {
        Notify.create({
          message: i18n.global.t('login.messagePopupClosed'),
          color: 'negative',
        });
      }
    };

    /**
     * Hide Facebook login button if no app ID is provided.
     * In this case, app ID is provided directly in the component.
     */
    const isFacebookLoginAvailable: boolean =
      !!rideToWorkByBikeConfig.facebookLoginAppId &&
      rideToWorkByBikeConfig.facebookLoginAppId !==
        rideToWorkByBikeConfig.secretString;

    logger?.debug(
      'Is Facebook login button widget available (Facebook ID' +
        ` <${rideToWorkByBikeConfig.facebookLoginAppId}> is provided)` +
        ` <${isFacebookLoginAvailable}>.`,
    );

    const facebookLoginSdkVersion =
      rideToWorkByBikeConfig.facebookLoginSdkVersion;
    logger?.debug(`Facebook login SDK version <${facebookLoginSdkVersion}>.`);

    const facebookLoginSdkOptions = JSON.parse(
      rideToWorkByBikeConfig.facebookLoginSdkOptions,
    );
    logger?.debug(
      `Facebook login SDK options <${JSON.stringify(facebookLoginSdkOptions, null, 2)}>.`,
    );

    const onFacebookLogin = (response: FacebookLoginResponse) => {
      logger?.debug(
        `Facebook login response <${JSON.stringify(response, null, 2)}>.`,
      );
      if (!response) {
        return;
      }
      logger?.debug(`Facebook login response status <${response.status}>.`);
      if (
        response.status === FacebookLoginStatus.connected &&
        response.authResponse
      ) {
        loginStore.authenticateWithFacebook(response.authResponse);
      } else if (response.status === FacebookLoginStatus.notAuthorized) {
        Notify.create({
          message: i18n.global.t('login.form.messageFacebookAuthNotAuthorized'),
          color: 'negative',
        });
      } else {
        Notify.create({
          message: i18n.global.t('login.form.messageFacebookAuthNotAvailable'),
          color: 'negative',
        });
      }
    };

    const onFacebookLogout = () => {
      logger?.info('Facebook logout.');
      loginStore.logout();
    };

    const { localeWithCountry } = useLocale();

    return {
      isGoogleLoginAvailable,
      isFacebookLoginAvailable,
      facebookLoginAppId,
      facebookLoginSdkVersion,
      facebookLoginSdkOptions,
      localeWithCountry,
      logger,
      onGoogleLogin,
      onGoogleLoginError,
      onFacebookLogin,
      onFacebookLogout,
    };
  },
});
</script>

<template>
  <div class="bg-primary">
    <!-- Button: Login Google -->
    <GoogleLogin
      v-if="isGoogleLoginAvailable"
      :callback="onGoogleLogin"
      :error="onGoogleLoginError"
      class="full-width"
    >
      <q-btn
        unelevated
        rounded
        outline
        color="white"
        class="full-width q-mb-md"
        data-cy="login-register-button-google"
      >
        <!-- Icon -->
        <q-icon
          name="fab fa-google"
          size="18px"
          color="white"
          class="q-mr-sm"
          data-cy="login-register-button-google-icon"
        />
        <!-- Label -->
        <span v-if="variant === 'login'">{{
          $t('login.buttons.buttonGoogle')
        }}</span>
        <span v-else-if="variant === 'register'">{{
          $t('register.buttons.buttonGoogle')
        }}</span>
      </q-btn>
    </GoogleLogin>
    <!-- Button: Login Facebook -->
    <v-facebook-login-scope
      v-if="isFacebookLoginAvailable"
      :app-id="facebookLoginAppId"
      v-slot="scope"
      :version="facebookLoginSdkVersion"
      :login-options="facebookLoginSdkOptions"
      :sdk-locale="localeWithCountry"
      @login="onFacebookLogin"
      @logout="onFacebookLogout"
    >
      <q-btn
        unelevated
        rounded
        outline
        color="white"
        class="full-width"
        data-cy="login-register-button-facebook"
        @click="scope.login"
      >
        <!-- Icon -->
        <q-icon
          name="facebook"
          size="24px"
          color="white"
          class="q-mr-sm"
          data-cy="login-register-button-facebook-icon"
        />
        <!-- Label -->
        <span v-if="variant === 'login'">{{
          $t('login.buttons.buttonFacebook')
        }}</span>
        <span v-else-if="variant === 'register'">{{
          $t('register.buttons.buttonFacebook')
        }}</span>
      </q-btn>
    </v-facebook-login-scope>
    <div
      v-if="
        variant === 'login' &&
        (isFacebookLoginAvailable || isGoogleLoginAvailable)
      "
      class="q-mt-md text-secondary"
      data-cy="login-social-media-btns-hint"
    >
      {{ $t('login.buttons.socialMediaBtnsHint') }}
    </div>
    <div
      v-if="
        variant === 'register' &&
        (isFacebookLoginAvailable || isGoogleLoginAvailable)
      "
      class="q-mt-md text-secondary"
      data-cy="register-social-media-btns-hint"
    >
      {{ $t('register.buttons.socialMediaBtnsHint') }}
    </div>
  </div>
</template>
