<script lang="ts">
/**
 * RoutesApps Component
 *
 * @description * Use this component to render the App view in `RouteTabs`.
 *
 * @components
 * - `BannerRoutesApp`: Component to display a banner for an App.
 * - `SectionHeading`: Component to render a heading.
 *
 * @example
 * <routes-apps></routes-apps>
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=5190%3A125828&mode=dev)
 */

// libraries
import { defineComponent } from 'vue';

// components
import BannerRoutesApp from './BannerRoutesApp.vue';
import SectionHeading from '../global/SectionHeading.vue';

// config
import { rideToWorkByBikeConfig } from '../../boot/global_vars';

// fixtures
import apps from '../../../test/cypress/fixtures/bannerRoutesAppList.json';

// types
import type { BannerRoutesAppType } from '../types/Banner';

export default defineComponent({
  name: 'RoutesApps',
  components: {
    BannerRoutesApp,
    SectionHeading,
  },
  setup() {
    const urlAppStore = rideToWorkByBikeConfig.urlAppStore;
    const urlGooglePlay = rideToWorkByBikeConfig.urlGooglePlay;

    return {
      apps: apps as BannerRoutesAppType[],
      urlAppStore,
      urlGooglePlay,
    };
  },
});
</script>

<template>
  <div data-cy="routes-apps" class="q-my-xl">
    <!-- Section: Apps for automatic logging -->
    <section>
      <!-- Title -->
      <section-heading class="q-mb-md" data-cy="routes-apps-title-auto">
        {{ $t('routes.titleAutomaticLogging') }}
        <template #perex>
          {{ $t('routes.hintAutomaticLogging') }}
        </template>
      </section-heading>
      <!-- App banners -->
      <div class="flex column gap-16">
        <banner-routes-app
          v-for="app in apps"
          :app="app"
          :key="app.title"
          data-cy="banner-routes-app"
        />
      </div>
    </section>
    <!-- Section: Apps for manual logging -->
    <section class="q-mt-md">
      <!-- Title -->
      <section-heading class="q-mb-md" data-cy="routes-apps-title-manual">
        {{ $t('routes.titleManualLogging') }}
        <template #perex>
          {{ $t('routes.hintManualLogging') }}
        </template>
      </section-heading>
      <div class="flex item-center gap-16" data-cy="routes-apps-buttons">
        <!-- Button: Google Play -->
        <a
          :href="urlGooglePlay"
          target="_blank"
          data-cy="routes-apps-google-play"
        >
          <q-img
            src="~assets/svg/googleplay.svg"
            :ratio="3.375"
            height="40px"
            width="135px"
            :alt="$t('login.bannerAppButtons.googlePlayAltText')"
          />
        </a>
        <!-- Button: App Store -->
        <a :href="urlAppStore" target="_blank" data-cy="routes-apps-app-store">
          <q-img
            src="~assets/svg/appstore.svg"
            :ratio="3"
            height="40px"
            width="120px"
            :alt="$t('login.bannerAppButtons.appStoreAltText')"
          />
        </a>
      </div>
    </section>
  </div>
</template>
