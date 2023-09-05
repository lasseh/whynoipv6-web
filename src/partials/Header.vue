<template>
  <header class="absolute w-full z-30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-20">
        <!-- Site branding -->
        <div class="shrink-0 mr-4">
          <!-- Logo -->
          <router-link to="/" class="block" aria-label="WhyNoIPv6">
            <h2 class="bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent from-fuchsia-500 to-fuchsia-700">Why No IPv6?</h2>
          </router-link>
        </div>

        <!-- Desktop navigation -->
        <nav class="hidden md:flex md:grow">
          <!-- Desktop menu links -->
          <ul class="flex grow justify-end flex-wrap items-center">
            <li>
              <router-link to="/domain" active-class="underline" class="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out font-bold">Domains</router-link>
            </li>
            <li>
              <router-link to="/campaign" active-class="underline" class="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out font-bold">Campaigns</router-link>
            </li>
            <li>
              <router-link to="/countries" active-class="underline" class="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out font-bold">Countries</router-link>
            </li>
            <li>
              <router-link to="/metric" active-class="underline" class="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out font-bold">Metrics</router-link>
            </li>
            <!-- 1st level: hover -->
            <Dropdown title="More">
              <li>
                <router-link to="/contact" class="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">Contact us</router-link>
              </li>
              <li>
                <router-link to="/help" class="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">Help center</router-link>
              </li>
              <li>
                <router-link to="/404" class="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">404</router-link>
              </li>
            </Dropdown>
          </ul>

          <!-- Desktop sign in links -->
          <ul class="flex grow justify-end flex-wrap items-center">
            <li>
              <router-link to="/search" class="btn-sm text-white bg-fuchsia-700 hover:bg-fuchsia-800 ml-3">Search Domain</router-link>
            </li>
          </ul>
        </nav>

        <!-- Mobile menu -->
        <div class="md:hidden">
          <!-- Hamburger button -->
          <button class="hamburger" ref="hamburger" :class="{ active: mobileNavOpen }" aria-controls="mobile-nav" :aria-expanded="mobileNavOpen" @click="mobileNavOpen = !mobileNavOpen">
            <span class="sr-only">Menu</span>
            <svg class="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect y="4" width="24" height="2" rx="1" />
              <rect y="11" width="24" height="2" rx="1" />
              <rect y="18" width="24" height="2" rx="1" />
            </svg>
          </button>

          <!-- Mobile navigation -->
          <!-- <nav id="mobile-nav" ref="mobileNav" class="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" :style="[ mobileNavOpen ? { maxHeight: $refs.mobileNav.scrollHeight + 'px', opacity: 1 } : { maxHeight: 0, opacity: .8 } ]"> -->
          <!-- <nav id="mobile-nav" :ref="mobileNav" class="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" :style="[ mobileNavOpen ? { maxHeight: mobileNav.value?.scrollHeight + 'px', opacity: 1 } : { maxHeight: 0, opacity: .8 } ]"> -->
          <!-- <nav id="mobile-nav" :ref="mobileNav" class="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"  -->
          <!-- :style="[ mobileNavOpen ? { maxHeight: mobileNav.value?.scrollHeight + 'px' || '0px', opacity: 1 } : { maxHeight: 0, opacity: .8 } ]"> -->
          <!-- <nav id="mobile-nav" :ref="mobileNav" class="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
 :style="[ mobileNavOpen ? { maxHeight: mobileNav.value?.scrollHeight + 'px' || '0px', opacity: 1 } : { maxHeight: 0, opacity: .8 } ]"> -->

          <!-- ... -->
          <!-- ... -->
          <!-- <ul class="bg-gray-800 px-4 py-2">
              <li>
                <router-link to="/features" class="flex text-gray-300 hover:text-gray-200 py-2">Domains</router-link>
              </li>
              <li>
                <router-link to="/pricing" class="flex text-gray-300 hover:text-gray-200 py-2">Campaigns</router-link>
              </li>
              <li>
                <router-link to="/blog" class="flex text-gray-300 hover:text-gray-200 py-2">Countries</router-link>
              </li>
              <li>
                <router-link to="/about" class="flex text-gray-300 hover:text-gray-200 py-2">Metrics</router-link>
              </li>
              <li class="py-2 my-2 border-t border-b border-gray-700">
                <span class="flex text-gray-300 py-2">Support</span>
                <ul class="pl-4">
                  <li>
                    <router-link to="/contact" class="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Contact us</router-link>
                  </li>
                  <li>
                    <router-link to="/help" class="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Help center</router-link>
                  </li>
                  <li>
                    <router-link to="/404" class="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">404</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Dropdown from "@/utils/Dropdown.vue";

export default {
  components: { Dropdown },
  setup() {
    // State
    const mobileNav = ref<HTMLElement | null>(null);
    const mobileNavOpen = ref(false);

    // Methods
    const clickOutside = (e: Event) => {
      if (!mobileNavOpen.value || mobileNav.value?.contains(e.target as Node) || document.querySelector(".hamburger")?.contains(e.target as Node)) return;
      mobileNavOpen.value = false;
    };

    const keyPress = (event: KeyboardEvent) => {
      if (!mobileNavOpen.value || event.key !== "Escape") return;
      mobileNavOpen.value = false;
    };

    // Lifecycle hooks
    onMounted(() => {
      document.addEventListener("click", clickOutside);
      document.addEventListener("keydown", keyPress);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", clickOutside);
      document.removeEventListener("keydown", keyPress);
    });

    // Expose the required variables and methods to the template
    return { mobileNav, mobileNavOpen };
  },
};
</script>
