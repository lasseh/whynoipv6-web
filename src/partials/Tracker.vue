<script lang="ts" setup>
import { ref, defineProps } from "vue";

interface TrackerBlockProps {
  key?: string | number;
  color?: string;
  tooltip?: string;
  hoverEffect?: boolean;
  defaultBackgroundColor?: string;
}

interface TrackerProps {
  data: TrackerBlockProps[];
  defaultBackgroundColor?: string;
  hoverEffect?: boolean;
}

// Props for Tracker
defineProps<TrackerProps>();

// Hover state for blocks
const openStates = ref<boolean[]>([]);
const toggleHover = (index: number, state: boolean) => {
  openStates.value[index] = state;
};
</script>

<template>
  <div class="group flex h-8 w-full items-center">
    <div
      v-for="(block, index) in data"
      :key="block.key || index"
      class="size-full overflow-hidden px-[0.5px] transition first:rounded-l-[4px] first:pl-0 last:rounded-r-[4px] last:pr-0 sm:px-px min-w-2 max-w-3 flex-1 opacity-40"
    >
      <div
        :class="[
          'size-full rounded-[1px]',
          block.color || defaultBackgroundColor,
          hoverEffect ? 'hover:opacity-50' : ''
        ]"
        @mouseenter="toggleHover(index, true)"
        @mouseleave="toggleHover(index, false)"
      ></div>

      <!-- Tooltip -->
      <div
        v-if="openStates[index]"
        class="absolute z-10 w-auto rounded-md px-2 py-1 text-sm shadow-md text-white dark:text-gray-900 bg-gray-900 dark:bg-gray-50"
        style="top: -2rem; left: 50%; transform: translateX(-50%);"
      >
        {{ block.tooltip }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.size-full {
  width: 100%;
  height: 100%;
}
</style>
