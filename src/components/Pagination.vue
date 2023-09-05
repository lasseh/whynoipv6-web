<template>
  <div class="flex justify-center">
    <nav class="flex" role="navigation" aria-label="Navigation">
      <div class="mr-2">
        <button @click="goToPreviousPage" :disabled="isPreviousDisabled" :class="previousButtonClass">
          <span>Previous</span>
        </button>
      </div>
      <div class="ml-2">
        <button @click="goToNextPage" :disabled="isNextDisabled" :class="nextButtonClass">
          <span>Next</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    offset: {
      type: Number,
      default: 0,
    },
    itemsCount: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 50,
    },
    onPageChange: {
      type: Function as PropType<(newOffset: number) => void>,
      required: true,
    },
  },
  computed: {
    isPreviousDisabled() {
      return this.offset === 0;
    },
    isNextDisabled() {
      return this.itemsCount < this.pageSize;
    },
    previousButtonClass() {
      return this.buttonClass(this.isPreviousDisabled);
    },
    nextButtonClass() {
      return this.buttonClass(this.isNextDisabled);
    },
  },
  methods: {
    buttonClass(isDisabled: boolean) {
      return [
        "inline-flex",
        "items-center",
        "justify-center",
        "rounded",
        "leading-5",
        "px-2.5",
        "py-2",
        "bg-zinc-800",
        "hover:bg-indigo-500",
        "border",
        "border-zinc-700",
        "text-zinc-300",
        "hover:text-white",
        "shadow-sm",
        {
          "cursor-not-allowed opacity-50": isDisabled,
        },
      ];
    },
    goToPreviousPage() {
      this.onPageChange(Math.max(0, this.offset - this.pageSize));
    },
    goToNextPage() {
      this.onPageChange(this.offset + this.pageSize);
    },
  },
});
</script>
