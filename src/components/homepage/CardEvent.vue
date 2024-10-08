<script lang="ts">
/**
 * CardEvent Component
 *
 * The `CardEvent` component presents event-related details in a card format.
 *
 * @description
 * This component is used to display event details, such as date and time. It
 * also integrates with a modal dialog for displaying additional event details.
 * Border radius can be controlled by `config` parameter.
 *
 * Note: This component is commonly used within the `ListCardEvent`
 * component.
 *
 * @props
 * - `card` (Object): The card object containing event details. It should be of
 *   type `CardEventType`.
 *
 * @components
 * - `ButtonAddToCalendar`: Used to render an add to calendar button.
 * - `DialogDefault`: Used to display detailed information about the offer in a
 *   modal dialog.
 *
 * @example
 * <card-event
 *   :card="eventDetails"
 * />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=4858%3A105625&mode=dev)
 */

// libraries
import { defineComponent, ref } from 'vue';
import { date, Screen } from 'quasar';

// components
import ButtonAddToCalendar from '../global/ButtonAddToCalendar.vue';
import DialogDefault from '../global/DialogDefault.vue';

// types
import { CardEvent as CardEventType } from '../types';

// config
import { rideToWorkByBikeConfig } from '../../boot/global_vars';

const { formatDate } = date;

export default defineComponent({
  name: 'CardEvent',
  components: {
    ButtonAddToCalendar,
    DialogDefault,
  },
  props: {
    card: {
      type: Object as () => CardEventType,
      required: true,
    },
  },
  setup(props) {
    const modalOpened = ref(false);
    const eventDateTime = formatDate(
      new Date(props?.card?.dates),
      'ddd D. MMM. YYYY, HH:mm',
    );
    const setHorizontalPosition = (): boolean => (Screen.xs ? false : true);
    const borderRadius = rideToWorkByBikeConfig.borderRadiusCard;

    const iconSize = '18px';

    return {
      borderRadius,
      iconSize,
      modalOpened,
      eventDateTime,
      setHorizontalPosition,
    };
  },
});
</script>

<template>
  <div>
    <div
      class="overflow-hidden bg-white border-grey-5"
      :style="{ 'border-radius': borderRadius }"
      data-cy="card"
    >
      <q-card-section
        :horizontal="setHorizontalPosition()"
        class="q-pa-none"
        data-cy="card-section"
      >
        <!-- Bg image -->
        <q-img
          fit="cover"
          :ratio="2 / 1"
          :img-style="{
            borderRadius: setHorizontalPosition()
              ? `${borderRadius} 0 0 ${borderRadius}`
              : `${borderRadius} ${borderRadius} 0 0`,
          }"
          class="col-sm-2"
          :src="card?.thumbnail?.src"
          :alt="card?.thumbnail?.alt"
          data-cy="card-image"
        />
        <!-- Content -->
        <div
          class="col-grow flex gap-16 gap-x-32 wrap items-center q-pa-lg text-grey-10"
          data-cy="card-content"
        >
          <div class="col-grow">
            <!-- Event name link for open modal dialog -->
            <div class="text-subtitle1 text-bold" data-cy="card-title">
              <a
                href="#"
                class="card-link text-dark block"
                @click.prevent="modalOpened = true"
                data-cy="card-link"
              >
                {{ card?.title }}
              </a>
            </div>
            <!-- Event date and place description -->
            <div
              v-if="eventDateTime || card?.location"
              class="meta flex items-center gap-8 q-mt-sm text-grey-8"
            >
              <div
                v-if="eventDateTime"
                class="dates flex items-center"
                data-cy="card-dates"
              >
                <!-- Event calendar icon -->
                <q-icon
                  name="svguse:icons/card_event/icons.svg#calendar"
                  :size="iconSize"
                  class="q-pr-xs"
                  color="primary"
                  data-cy="card-dates-icon"
                />
                {{ eventDateTime }}
              </div>
              <div
                v-if="card?.location"
                class="location flex items-center"
                data-cy="card-location"
              >
                <!-- Event place icon -->
                <q-icon
                  name="svguse:icons/card_event/icons.svg#map-pin"
                  :size="iconSize"
                  class="q-pr-xs"
                  color="primary"
                  data-cy="card-location-icon"
                />
                {{ card?.location }}
              </div>
            </div>
          </div>
          <!-- Add to calendar btn -->
          <div class="overflow-hidden flex items-center">
            <div>
              <q-btn round outline color="primary" data-cy="calendar-button">
                <q-icon
                  name="svguse:icons/card_event/icons.svg#calendar-plus"
                  size="xs"
                  color="primary"
                  data-cy="calendar-button-icon"
                ></q-icon>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Modal dialog -->
      <dialog-default
        v-model="modalOpened"
        :horizontal="true"
        data-cy="dialog-card-event"
      >
        <!-- Title -->
        <template #title>
          {{ card?.title }}
        </template>
        <!-- Metadata -->
        <template v-if="eventDateTime || card?.location" #metadata>
          <div class="flex flex-wrap items-center gap-8 gap-x-32 q-mt-sm">
            <div
              v-if="eventDateTime"
              class="flex items-center text-grey-8"
              data-cy="dialog-meta"
            >
              <q-icon
                name="event"
                :size="iconSize"
                class="q-pr-xs"
                color="primary"
                data-cy="dialog-meta-date-icon"
              />
              {{ eventDateTime }}
            </div>
            <div
              v-if="card?.location"
              class="flex items-center text-grey-8"
              data-cy="dialog-meta"
            >
              <q-icon
                name="pedal_bike"
                :size="iconSize"
                class="q-pr-xs"
                color="primary"
                data-cy="dialog-meta-location-icon"
              />
              {{ card?.location }}
            </div>
          </div>
        </template>
        <!-- Content -->
        <template #content>
          <div class="row">
            <!-- Left column: Content -->
            <div
              class="col-12 col-md-6 q-px-md q-py-md"
              data-cy="dialog-col-left"
            >
              <div
                v-if="card?.content"
                v-html="card.content"
                data-cy="dialog-content"
              />
              <!-- Buttons -->
              <button-add-to-calendar
                class="q-mt-md"
                data-cy="button-add-to-calendar"
              />
            </div>
            <!-- Right column: Image -->
            <div
              class="col-12 col-md-6 q-px-md q-py-md"
              data-cy="dialog-col-right"
            >
              <!-- Image -->
              <q-img
                :src="card.image.src"
                :alt="card.image.alt"
                :ratio="1"
                data-cy="dialog-image"
              />
            </div>
          </div>
        </template>
      </dialog-default>
    </div>
  </div>
</template>

<style scoped lang="scss">
.border-grey-5 {
  border: 1px solid $grey-5;
}

.card-link {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
