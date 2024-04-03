<template>
  <div class="flex flex-col min-h-screen overflow-hidden" ref="anchorTop">
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
          <div class="pt-32 pb-4 md:pt-32 md:pb-4">
            <header class="mb-8" ref="anchorTop">
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <!-- <h1 class="h3 mb-4" data-aos="fade-up">Changelog</h1> -->
                <p class="text-md text-gray-400" data-aos="fade-up" data-aos-delay="200">Live changelog from the crawler</p>
              </div>
            </header>

            <div class="mb-4">
              <div class="w-full flex flex-wrap -space-x-px">
                <button @click="applyFilter('tranco')" :class="['btn grow border-zinc-700 hover:bg-zinc-800/20 rounded-none first:rounded-l last:rounded-r', queryFilter === 'tranco' ? 'text-fuchsia-600 bg-zinc-500/20' : 'text-slate-300 bg-zinc-700/20']">Tranco</button>
                <button @click="applyFilter('campaign')" :class="['btn grow border-zinc-700 hover:bg-zinc-800/20 rounded-none first:rounded-l last:rounded-r', queryFilter === 'campaign' ? 'text-fuchsia-600 bg-zinc-500/20' : 'text-slate-300 bg-zinc-700/20']">Campaigns</button>
              </div>
            </div>
          </div>
        </div>

        <ChangelogTable :changelogs="changelog" :header="changelogHeader" />

        <!-- Pagination -->
        <div class="mt-4">
          <Pagination :offset="offset" :domainsLength="changelog.length" :updateOffset="updateOffset" :scrollToAnchor="scrollToAnchor" />
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs, watch, ref, Ref, computed, onBeforeUnmount, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout components
import { Header, PageIllustration, Footer } from "@/partials";

// Components
import ChangelogTable from "@/components/ChangelogTable.vue";
import Pagination from "@/components/Pagination.vue";

// Services
import ChangelogService from "@/services/ChangelogService";

// Types
import { Changelog } from "@/types/Changelog";

const router = useRouter();
const route = useRoute();
const initialOffset = parseInt(route.query.offset as string) || 0;
let intervalId: number | undefined;
const state = reactive({
  changelog: [] as Changelog.Log[],
  offset: initialOffset,
});

const { changelog, offset } = toRefs(state);

async function fetchChangelog() {
  await getChangelog(state.offset, queryFilter.value);
}

async function getChangelog(offset: number, filter: string): Promise<void> {
  let response;
  switch (filter.toLowerCase()) {
    case "campaign":
      response = await ChangelogService.getCampaignChangelog(offset);
      break;
    case "tranco":
    default:
      response = await ChangelogService.getChangelog(offset);
      break;
  }
  state.changelog = response.data;
}

function applyFilter(filter: string) {
  state.offset = 0; // Reset offset to 0 when a new filter is applied
  router.push({ query: { filter } });
}

const queryFilter = computed(() => {
  const filterValue = route.query.filter;
  if (filterValue === null || typeof filterValue === "undefined") return "tranco";
  return Array.isArray(filterValue) ? filterValue[0] || "tranco" : filterValue;
});

// Computed property for header text
const changelogHeader = computed(() => {
  return queryFilter.value === "campaign" ? "Campaign Changelogs" : "Domain Changelogs";
});

// Fetch the campaign details on component mount
onMounted(() => {
  fetchChangelog();
  intervalId = window.setInterval(fetchChangelog, 30000);
  document.title = "Changelog | IPv6 Crawler";
});

onUnmounted(() => {
  document.title = "Why No IPv6?";
});

// Clear the component before unmounting
onBeforeUnmount(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId);
  }
});

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

// Watch for changes in the offset query parameter
watch([() => state.offset, queryFilter], fetchChangelog);
</script>
