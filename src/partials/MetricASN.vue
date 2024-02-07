<template>
  <section>
    <!-- Page header -->
    <div class="sm:flex sm:justify-between sm:items-center mb-4">
      <!-- Left: Title -->
      <div class="mb-4 sm:mb-0">
        <h1 class="text-2xl md:2text-xl text-zinc-100 font-bold">Network Provider Readiness</h1>
      </div>

      <!-- Search -->
      <div class="hidden md:grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        <form class="relative" @submit.prevent="searchAsn(searchQuery)">
          <label for="action-search" class="sr-only">Search</label>
          <input v-model="searchQuery" id="action-search" class="form-input pl-9 bg-zinc-800 h-10" type="search" placeholder="Search…" />
          <button class="absolute inset-0 right-auto group text-xs font-medium" type="submit" aria-label="Search">
            <svg class="w-4 h-4 shrink-0 fill-current text-zinc-500 group-hover:text-zinc-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button>
        </form>
      </div>
    </div>

    <!-- info content -->
    <div class="text-lg text-gray-400">
      <p class="mb-4">Unveil the stark reality of network providers' shortcomings in promoting IPv6 adoption and supporting their customers. Our analysis, based on Alexa data, shines a spotlight on the persisting gaps in IPv6 readiness among these providers. It's time to hold them accountable for hindering progress and leaving customers behind. Explore our data and demand better connectivity for all.</p>
    </div>

    <!-- Search Mobile -->
    <div class="md:hidden grid grid-flow-col sm:auto-cols-max gap-2 mb-2">
      <form class="relative w-full" @submit.prevent="searchAsn(searchQuery)">
        <label for="action-search" class="sr-only">Search</label>
        <input v-model="searchQuery" id="action-search" class="form-input pl-9 bg-zinc-800 h-10 w-full" type="search" placeholder="Search…" />
        <button class="absolute inset-0 right-auto group text-xs font-medium" type="submit" aria-label="Search">
          <svg class="w-4 h-4 shrink-0 fill-current text-zinc-500 group-hover:text-zinc-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
          </svg>
        </button>
      </form>
    </div>

    <!-- Filter Buttons -->
    <div class="flex h-10 justify-end">
      <button @click="getOrderedAsnData('ipv4')" :class="tabClass('ipv4')">IPv4</button>
      <button @click="getOrderedAsnData('ipv6')" :class="tabClass('ipv6')">IPv6</button>
    </div>

    <NetworkProvider :asnData="asnData" />
  </section>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs, onUnmounted, computed, ref, PropType, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// Services
import MetricService from "@/services/MetricService";
import { Metric } from "@/types/Metric";
import NetworkProvider from "@/components/NetworkProvider.vue";

interface Props {
  query: string;
}

const props = withDefaults(defineProps<Props>(), {
  query: "",
});

const router = useRouter();
const route = useRoute();
const searchQuery = ref(props.query);
const state = reactive({
  isLoading: true,
  asnData: [] as Metric.ASN[],
});
const orderBy = computed(() => (route.query.order as string) || "ipv4");

const { query } = toRefs(props);
const { isLoading, asnData } = toRefs(state);

/**
 * Fetches ASN data based on the specified order.
 * @param {string} order - The order criterion for ASN data.
 */
async function getAsnData(order: string = "ipv4") {
  try {
    state.isLoading = true;
    const response = await MetricService.fetchAsnData(order);
    state.asnData = response.data;
  } catch (error) {
    console.error("Failed to fetch ASN data:", error);
  } finally {
    state.isLoading = false;
  }
}
async function getOrderedAsnData(order: string) {
  getAsnData(order);
  // Update the route without adding history and without refreshing the page
  router.replace({ query: { ...route.query, order } }).catch(err => {
    console.error("Failed to update route:", err);
  });
}

// Search for ASN data
async function searchAsn(searchQuery: string) {
  if (searchQuery.length < 2) {
    // Optionally, handle this condition outside of the function
    console.error("Search query is too short.");
    return;
  }

  state.asnData = [];
  MetricService.searchAsn(searchQuery)
    .then(response => {
      state.asnData = response.data;
      // Update the URL with the search query
      router.replace({ query: { ...route.query, q: searchQuery } }).catch(err => {
        console.error("Failed to update route:", err);
      });
    })
    .catch(error => {
      console.error("Failed to search ASN data:", error);
      // Update state to reflect that an error occurred, if needed
    });
}

const tabClass = (orderType: string): string[] => {
  return ["btn border-zinc-700 hover:bg-zinc-800/20 rounded-none first:rounded-l last:rounded-r", orderBy.value === orderType ? "text-fuchsia-600 bg-zinc-500/20" : "text-slate-300"];
};

onMounted(() => {
  const urlSearchQuery = route.query.q;

  if (typeof urlSearchQuery === "string" && urlSearchQuery.length >= 2) {
    searchQuery.value = urlSearchQuery; // Correctly use .value here
    searchAsn(searchQuery.value);
  } else {
    // If there is no valid search query in the URL, fetch ASN data normally
    getAsnData(orderBy.value);
  }
});

onUnmounted(() => {
  // reset the query parameter for order
  router.push({ query: { ...router.currentRoute.value.query, order: undefined } }).catch(err => {});
});
</script>
