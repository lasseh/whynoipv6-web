<template>
  <div class="relative">
    <!-- Tracker Data -->
    <div class="group flex h-8 w-full items-center flex-row-reverse">
      <div v-for="(block, index) in data" :key="block.id || index" class="size-full overflow-hidden px-[0.5px] transition first:rounded-r-[4px] first:pr-0 last:rounded-l-[4px] last:pl-0 sm:px-px min-w-2 max-w-3 flex-1 opacity-80">
        <!-- Block -->
        <div :class="['size-full rounded-[1px]', colorMapping[block.status] || defaultBackgroundColor, hoverEffect ? 'hover:opacity-50' : '']" @mouseenter="toggleHover(index, true)" @mouseleave="toggleHover(index, false)"></div>

        <!-- Tooltip -->
        <div v-if="openStates[index]" class="absolute z-10 w-auto rounded-md px-2 py-1 text-sm text-fuchsia-600 bg-gray-800 border-slate-200 normal-case" style="top: -3rem; left: 50%; transform: translateX(-50%)">
          {{ formatDateTime(block.timestamp) }}
        </div>
      </div>
    </div>

    <!-- Timeline Labels -->
    <div class="flex justify-between mt-2 text-xs text-gray-500">
      <span class="hidden lg:block">90 days ago</span>
      <span class="hidden sm:block lg:hidden">60 days ago</span>
      <span class="sm:hidden">30 days ago</span>
      <span>Today</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, onMounted } from "vue";
import { formatDateTime } from "@/utils/Date";

// Define the props for the Tracker component
const props = defineProps({
  data: {
    type: Array as PropType<
      Array<{
        id: string | number;
        timestamp: string | Date;
        status: "supported" | "unsupported" | "no_record";
      }>
    >,
    required: true,
  },
  defaultBackgroundColor: {
    type: String,
    default: "bg-gray-800",
  },
  hoverEffect: {
    type: Boolean,
    default: false,
  },
});

// Define the color mapping for statuses
const colorMapping: Record<"supported" | "unsupported" | "no_record", string> = {
  supported: "bg-emerald-600",
  unsupported: "bg-pink-600",
  no_record: "bg-amber-500",
};

// Track hover states for tooltips
const openStates = ref<boolean[]>([]);

const toggleHover = (index: number, state: boolean) => {
  openStates.value[index] = state;
};

// Initialize hover states based on data length
onMounted(() => {
  openStates.value = Array(props.data.length).fill(false);
});
</script>

<style scoped></style>
