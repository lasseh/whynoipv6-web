<template>
  <img :src="flagUrl" alt="Country Flag" width="48" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    countryCode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const flagUrl = computed(() => `https://hatscripts.github.io/circle-flags/flags/${props.countryCode.toLowerCase()}.svg`);
    return { flagUrl };
  }
});
</script>
