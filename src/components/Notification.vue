<template>
  <transition name="fade">
    <div role="alert" v-if="showNotification">
      <div class="flex-col w-full max-w-lg px-4 py-2 fixed bottom-4 right-4 flex gap-4 rounded-sm text-sm bg-zinc-800 shadow-lg border border-zinc-700 text-slate-300">
        <div class="flex w-full justify-between items-start">
          <div class="flex">
            <svg class="w-4 h-4 shrink-0 fill-current text-amber-500 mt-[3px] mr-3" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
            <div>
              <div class="font-medium text-slate-200 mb-1">No IPv6?!</div>
              <div>Your internet connection does not seem to support current internet standards. Please contact your internet provider and ask them about IPv6.</div>
            </div>
          </div>
          <button class="opacity-70 hover:opacity-80 ml-3 mt-[3px]" @click="hideNotification">
            <div class="sr-only">Close</div>
            <svg class="w-4 h-4 fill-current">
              <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";

const showNotification = ref(false);
let autoHideTimeout: ReturnType<typeof setTimeout>;

const checkIPv6 = async () => {
  try {
    const response = await axios.get("https://api64.ipify.org?format=json");
    const ip = response.data.ip;
    const isIPv6 = ip.includes(":");
    if (!isIPv6) {
      showNotification.value = true;
      // Auto-hide after 10 seconds
      autoHideTimeout = setTimeout(() => {
        showNotification.value = false;
      }, 15000);
    }
  } catch (error) {
    console.error("Error checking IP version:", error);
  }
};

const hideNotification = () => {
  showNotification.value = false;
  clearTimeout(autoHideTimeout); // Clear timeout if user manually closes the notification
};

onMounted(() => {
  checkIPv6();
  window.addEventListener("scroll", hideNotification, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", hideNotification);
});
</script>

<style>
/* Define enter and leave transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
