<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <!-- Page illustration -->
      <div class="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
        <PageIllustration />
      </div>

      <section class="relative">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <!-- <div class="py-16 md:py-20"> -->
          <div class="pt-20 pb-4 md:pt-24 md:pb-4">
            <div class="py-4 max-w-9xl mx-auto">
              <!-- Page header -->
              <div class="sm:flex sm:justify-between sm:items-center mb-4">
                <!-- Left: Title -->
                <div class="mb-4 sm:mb-0">
                  <h1 class="text-2xl md:text-3xl text-zinc-100 font-bold">Country List</h1>
                </div>

                <!-- Right: Actions -->
                <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <!-- Search form -->
                  <form class="relative">
                    <label for="action-search" class="sr-only">Filter</label>
                    <input v-model="searchQuery" id="action-search" class="form-input pl-9 bg-zinc-800" type="search" placeholder="Filter…" />
                    <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                      <svg class="w-4 h-4 shrink-0 fill-current text-zinc-500 group-hover:text-zinc-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>

              <!-- content -->
              <div class="text-lg text-gray-400">
                <p class="mb-4 md:mr-32" data-aos="fade-up">This resource tracks the progress of IPv6 adoption globally by listing countries and their top domains that lack IPv6 support. Aimed at network administrators, policymakers, and anyone interested in the transition from IPv4 to IPv6, the data aims to highlight areas that need attention to build a more robust and future-proof Internet infrastructure.</p>
              </div>

              <div class="grid grid-cols-2 xl:grid-cols-8 gap-4">
                <router-link v-for="(country, index) in filteredCountryList" :key="index" :to="{ name: 'CountryDetail', params: { id: country.country_code } }" class="col-span-full sm:col-span-6 xl:col-span-4 bg-zinc-800/50 shadow-lg rounded-sm border border-zinc-700">
                  <div class="flex flex-col h-full p-5">
                    <div class="grow mt-1">
                      <div class="text-zinc-100 hover:text-white mb-1">
                        <div class="flex justify-between items-center">
                          <div class="inline-flex text-zinc-100 hover:text-white mb-1">
                            <div class="flex items-center">
                              <CountryFlag :countryCode="country.country_code" class="rounded-full" />
                              <h2 class="text-xl leading-snug font-semibold pl-2">{{ country.country }}</h2>
                            </div>
                          </div>
                          <div>
                            <div class="text-sm inline-flex font-medium rounded-md text-center px-2.5 py-1 ring-1 ring-inset" :class="country.colorClass">Rating: {{ country.rating }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <footer class="mt-3">
                      <div class="flex justify-between mb-1">
                        <span class="text-sm font-medium text-gray-400">v6 Ready</span>
                        <span class="text-sm font-medium text-gray-400">{{ country.percent }}%</span>
                      </div>
                      <div class="w-full rounded-md h-2.5 bg-gray-700">
                        <div :class="`h-2.5 rounded-md bg-gradient-to-r ${country.gradientColor}`" :style="{ width: country.percent + '%' }"></div>
                      </div>
                    </footer>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import CountryFlag from "@/components/CountryFlag.vue";
import { calculateRating } from "@/utils/Rating";

// Services
import CountryService from "@/services/CountryService";
import { Country } from "@/types/Country";

export default defineComponent({
  name: "CountryList",
  components: {
    Header,
    PageIllustration,
    Footer,
    CountryFlag,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      countryList: [] as Country.Country[],
      searchQuery: "",
    });

    async function fetchCountryList() {
      const response = await CountryService.getCountryList();
      state.countryList = response.data;

      // calculate rating per country
      state.countryList.forEach(country => {
        const { rating, colorClass, gradientColor } = calculateRating(country);
        country.rating = rating;
        country.colorClass = colorClass;
        country.gradientColor = gradientColor;
      });
    }

    // A computed property to get the filtered country list based on the search query
    const filteredCountryList = computed(() => {
      if (!state.searchQuery) {
        return state.countryList;
      }
      return state.countryList.filter(country => country.country.toLowerCase().includes(state.searchQuery.toLowerCase()));
    });

    onMounted(() => {
      document.title = "Country Overview - Why No IPv6?";
      fetchCountryList();
    });

    onUnmounted(() => {
      state.countryList = [];
      document.title = "Why No IPv6?";
    });

    return {
      ...toRefs(state),
      filteredCountryList,
    };
  },
});
</script>
