<template>
  <q-page class="row items-center justify-evenly">
    <ride-to-work-by-bike></ride-to-work-by-bike>
  </q-page>
</template>

<script lang="ts">
import RideToWorkByBike from 'components/RideToWorkByBike.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { RideToWorkByBike },
});
</script>
