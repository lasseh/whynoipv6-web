<template>
  <div class="has-tooltip relative inline-block">
    <span class="tooltip absolute rounded border border-slate-700 shadow-lg p-1 bg-gray-800 text-fuchsia-600 normal-case transform -translate-x-1/2 -translate-y-full">Supported</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  </div>
</template>

<style scoped>
.tooltip {
  visibility: hidden;
  left: 50%; /* Center horizontally */
  bottom: -50%;
  white-space: nowrap; /* Prevent tooltip text from wrapping */
}

.has-tooltip:hover .tooltip {
  visibility: visible;
  z-index: 50;
}
</style>
