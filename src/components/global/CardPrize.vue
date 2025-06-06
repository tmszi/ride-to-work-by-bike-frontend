<script lang="ts">
/**
 * CardPrize Component
 *
 * @description * Use this component to show prize cards with dialog.
 * Card is clickable and shows a dialog with detailed information.
 *
 * @props
 * - `card` (CardPrize, required): The object representing a card.
 *   It should be of type `CardPrize`.
 *
 * @components
 * - `DialogDefault`: Used to display detailed information about the prize in a
 *   modal dialog.
 *
 * @example
 * <card-prize :card="card" />
 *
 * @see [Figma Design](https://www.figma.com/design/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?node-id=4858-104622&t=9iHoAuwC7HhXft7f-1)
 */

// libraries
import { Screen } from 'quasar';
import { defineComponent, ref } from 'vue';

// components
import DialogDefault from '../global/DialogDefault.vue';

// config
import { rideToWorkByBikeConfig } from '../../boot/global_vars';

// types
import type { CardPrizeType } from '../types';

export default defineComponent({
  name: 'CardPrize',
  components: {
    DialogDefault,
  },
  props: {
    card: {
      type: Object as () => CardPrizeType,
      required: true,
    },
  },
  setup() {
    const enabledCardPrizeDialog = true;

    const borderRadius = rideToWorkByBikeConfig.borderRadiusCard;
    const cardMaxWidth = Screen.sizes.sm;
    const modalOpened = ref(false);

    return {
      borderRadius,
      cardMaxWidth,
      modalOpened,
      enabledCardPrizeDialog,
    };
  },
});
</script>

<template>
  <q-card
    :v-ripple="enabledCardPrizeDialog"
    flat
    bordered
    class="full-height bg-white"
    :class="{ 'q-hoverable cursor-pointer': enabledCardPrizeDialog }"
    :style="{ 'border-radius': borderRadius, 'max-width': `${cardMaxWidth}px` }"
    data-cy="card-prize"
    @click.prevent="modalOpened = true"
  >
    <!-- Image -->
    <q-img
      :src="card.image.src"
      ratio="0.8"
      data-cy="card-prize-image"
      alt=""
    />

    <span class="q-focus-helper"></span>

    <!-- Content -->
    <q-card-section>
      <!-- Title -->
      <div
        class="card-prize-title text-body text-grey-10"
        data-cy="card-prize-title"
      >
        {{ card.title }}
      </div>
    </q-card-section>

    <!-- Modal dialog -->
    <dialog-default
      v-if="enabledCardPrizeDialog"
      v-model="modalOpened"
      :horizontal="true"
      :minWidth="card?.content || card?.description ? '50vw' : '30vw'"
      data-cy="dialog-prize"
    >
      <!-- Title -->
      <template #title>
        {{ card.title }}
      </template>
      <!-- Metadata -->
      <template #metadata>
        <div
          v-if="card?.metadata.length > 0"
          class="flex flex-wrap items-center gap-x-32 gap-y-8 q-mt-sm"
        >
          <div
            v-for="item in card.metadata"
            :key="item.id"
            class="flex items-center text-blue-grey-7"
            data-cy="dialog-meta"
          >
            <q-icon
              v-if="item.icon"
              :name="item.icon"
              size="18px"
              class="q-pr-xs"
              color="blue-grey-3"
            />
            <span v-if="item.text" v-html="item.text" />
          </div>
        </div>
      </template>
      <!-- Content -->
      <template #content>
        <!-- Left column: Content -->
        <div
          v-if="card?.content || card?.description || card?.link"
          class="col-12 col-md-6"
          data-cy="dialog-col-left"
        >
          <!-- Content: Edited by Auto*Mat administrators -->
          <div
            v-if="card?.content"
            v-html="card.content"
            class="q-px-md q-py-md"
            data-cy="dialog-content"
          />
          <!-- Description: Edited by City administrators -->
          <div
            v-if="card?.description"
            v-html="card.description"
            class="q-px-md q-py-md"
            data-cy="dialog-description"
          />
          <!-- Buttons -->
          <q-btn
            v-if="card.link"
            :to="card.link.url"
            color="black"
            unelevated
            rounded
            class="q-mt-md"
            data-cy="dialog-prize-link"
          >
            <div class="flex items-center no-wrap">
              {{ card.link.title }}
            </div>
          </q-btn>
        </div>
        <!-- Right column: Image -->
        <div class="col-12 col-md-6" data-cy="dialog-col-right">
          <div class="q-px-md q-py-md">
            <!-- Image -->
            <q-img
              :src="card.image.src"
              :alt="card.image.alt"
              data-cy="dialog-image"
              fit="contain"
            />
          </div>
        </div>
      </template>
    </dialog-default>
  </q-card>
</template>
