<template>
  <div class="mt-2">
    <div class="flex justify-center">
      <nav class="flex" role="navigation" aria-label="Navigation">
        <div class="mr-2">
          <button @click="goPrevious" :disabled="isPreviousDisabled" class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-zinc-700 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white shadow-sm" :class="{ 'cursor-not-allowed opacity-50': isPreviousDisabled }">
            <span>Previous</span>
          </button>
        </div>
        <div class="ml-2">
          <button @click="goNext" :disabled="isNextDisabled" class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-zinc-700 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white shadow-sm" :class="{ 'cursor-not-allowed opacity-50': isNextDisabled }">
            <span>Next</span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  offset: number;
  domainsLength: number;
  updateOffset: (newOffset: number) => void;
  scrollToAnchor: () => void;
}>();

const isPreviousDisabled = computed(() => props.offset === 0);
const isNextDisabled = computed(() => props.domainsLength < 50);

const goPrevious = () => {
  props.scrollToAnchor();
  props.updateOffset(Math.max(0, props.offset - 50));
};

const goNext = () => {
  props.scrollToAnchor();
  props.updateOffset(props.offset + 50);
};
</script>
