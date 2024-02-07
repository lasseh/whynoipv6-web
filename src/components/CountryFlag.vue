<template>
  <img :src="flagUrl" alt="Country Flag" width="48" />
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  countryCode: string;
}>();

const flagUrl = computed(() => `https://hatscripts.github.io/circle-flags/flags/${props.countryCode.toLowerCase()}.svg`);
</script>
