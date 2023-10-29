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

      <!-- Page sections -->
      <section class="relative">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-32 pb-12 md:pt-40 md:pb-20">
            <header class="mb-8" ref="anchorTop">
              <div class="text-center md:text-left">
                <h1 class="h2 mb-4" data-aos="fade-up">{{ countryInfo.country }}</h1>
              </div>
            </header>

            <div class="flex justify-between items-center">
              <div>
                <div class="text-base inline-flex font-medium rounded-md text-center px-2.5 py-1 ring-1 ring-inset" :class="countryInfo.colorClass">Rating: {{ countryInfo.rating }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-zinc-500 mb-2">{{ countryInfo.sites }} Domains</div>
                <div class="text-sm font-medium text-zinc-500 mb-2">{{ countryInfo.v6sites }} Domains V6 Ready</div>
              </div>
            </div>
            <div class="mt-3 mb-4">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-white">v6 Ready</span>
                <span class="text-sm font-medium text-white">{{ countryInfo.percent }}%</span>
              </div>
              <div class="w-full rounded-full h-2.5 bg-gray-700">
                <div class="bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 h-2.5 rounded-full" :style="{ width: countryInfo.percent + '%' }"></div>
              </div>
            </div>

            <div class="mb-4">
              <div class="w-full flex flex-wrap -space-x-px">
                <button @click="applyFilter('sinners')" :class="['btn grow border-zinc-700 hover:bg-zinc-800/20 rounded-none first:rounded-l last:rounded-r', queryFilter === 'sinners' ? 'text-fuchsia-600 bg-zinc-500/20' : 'text-slate-300 bg-zinc-700/20']">Sinners</button>
                <button @click="applyFilter('heroes')" :class="['btn grow border-zinc-700 hover:bg-zinc-800/20 rounded-none first:rounded-l last:rounded-r', queryFilter === 'heroes' ? 'text-fuchsia-600 bg-zinc-500/20' : 'text-slate-300 bg-zinc-700/20']">Heroes</button>
              </div>
            </div>

            <div>
              <DomainTable v-if="domainList.length > 0" :domains="domainList" />
              <div v-else class="text-center mt-4">No domains found for this country.</div>
            </div>

            <!-- Pagination -->
            <div class="mt-6">
              <Pagination :offset="offset" :domainsLength="domainList.length" :updateOffset="updateOffset" :scrollToAnchor="scrollToAnchor" />
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
import { defineComponent, onMounted, reactive, toRefs, watch, ref, Ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import DomainTable from "@/components/DomainTable.vue";
import Pagination from "@/components/Pagination.vue";
import { calculateRating } from "@/utils/Rating";

// Services
import CountryService from "@/services/CountryService";
import { Domain } from "@/types/Domain";
import { Country } from "@/types/Country";

export default defineComponent({
  name: "CountryDetail",
  components: {
    Header,
    PageIllustration,
    Footer,
    DomainTable,
    Pagination,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const initialOffset = parseInt(route.query.offset as string) || 0;
    const state = reactive({
      countryInfo: {} as Country.Country,
      domainList: [] as Domain.Domain[],
      offset: initialOffset,
      isLoading: false,
    });

    async function getCountryInfo(country: string) {
      const response = await CountryService.getCountryInfo(country);
      state.countryInfo = response.data;
      // Calculate rating and color class
      const { rating, colorClass } = calculateRating(state.countryInfo);
      state.countryInfo.rating = rating;
      state.countryInfo.colorClass = colorClass;
    }

    async function fetchDomains() {
      state.isLoading = true;
      await getDomains(route.params.id.toString(), state.offset, queryFilter.value);
      state.isLoading = false;
    }

    async function getDomains(country: string, offset: number, filter: string) {
      let response;
      switch (filter.toLowerCase()) {
        case "heroes":
          response = await CountryService.getCountryHeroes(country, offset);
          break;
        case "sinners":
        default:
          response = await CountryService.getCountrySinners(country, offset);
          break;
      }
      state.domainList = response.data || [];
    }

    function applyFilter(filter: string) {
      state.isLoading = true;
      state.offset = 0; // Reset offset to 0 when a new filter is applied
      router.push({ query: { filter } });
    }

    const queryFilter = computed(() => {
      const filterValue = route.query.filter;
      if (filterValue === null || typeof filterValue === "undefined") return "sinners";
      return Array.isArray(filterValue) ? filterValue[0] || "sinners" : filterValue;
    });

    onMounted(() => {
      getCountryInfo(route.params.id.toString());
      fetchDomains();
    });

    watch([() => state.offset, queryFilter], fetchDomains);

    // Pagination
    const anchorTop: Ref<HTMLElement | null> = ref(null);
    const scrollToAnchor = () => {
      if (anchorTop.value) {
        anchorTop.value.scrollIntoView({ behavior: "auto" });
      }
    };
    const updateOffset = (newOffset: number) => {
      scrollToAnchor();
      state.offset = newOffset;
      router.push({ query: { ...route.query, offset: newOffset.toString() } });
    };

    return {
      ...toRefs(state),
      scrollToAnchor,
      anchorTop,
      applyFilter,
      updateOffset,
      queryFilter,
    };
  },
});
</script>
