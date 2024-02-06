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
                <h1 class="h2 mb-4" data-aos="fade-up">Unmasking the Top 1M Websites of the World</h1>
                <p class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">Within the elite realm of the internet's top 1 million websites lies a distinct divide: the forward-thinking Heroes who've embraced IPv6, propelling us toward a brighter digital future, and the Sinners, who, despite their influence, hold us back by neglecting this advancement. Dive in as we spotlight these websites, celebrating the innovators and calling out those resisting progress.</p>
              </div>
            </header>

            <div class="mb-4">
              <div class="w-full flex flex-wrap -space-x-px">
                <button @click="applyFilter('sinners')" :class="['btn grow border-zinc-700 hover:bg-zinc-800/40 rounded-none first:rounded-l last:rounded-r', queryFilter === 'sinners' ? 'text-fuchsia-600 bg-zinc-600/20' : 'text-slate-300 bg-zinc-800/20']">Sinners</button>
                <button @click="applyFilter('heroes')" :class="['btn grow border-zinc-700 hover:bg-zinc-800/40 rounded-none first:rounded-l last:rounded-r', queryFilter === 'heroes' ? 'text-fuchsia-600 bg-zinc-600/20' : 'text-slate-300 bg-zinc-800/20']">Heroes</button>
              </div>
            </div>

            <!-- Domains -->
            <div>
              <DomainTable :domains="domainList" />
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

<script lang="ts" setup>
import { onMounted, reactive, toRefs, watch, ref, Ref, computed, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import DomainTable from "@/components/DomainTable.vue";
import Pagination from "@/components/Pagination.vue";

// Services
import DomainService from "@/services/DomainService";
import { Domain } from "@/types/Domain";

const router = useRouter();
const route = useRoute();
const initialOffset = parseInt(route.query.offset as string) || 0;
const state = reactive({
  domainList: [] as Domain.Domain[],
  offset: initialOffset,
});

const { domainList, offset } = toRefs(state);

async function fetchDomains() {
  await getDomains(state.offset, queryFilter.value);
}

async function getDomains(offset: number, filter: string) {
  let response;
  switch (filter.toLowerCase()) {
    case "heroes":
      response = await DomainService.getDomainHeroes(offset);
      break;
    case "sinners":
    default:
      response = await DomainService.getDomainList(offset);
      break;
  }
  state.domainList = response.data;
}

function applyFilter(filter: string) {
  state.offset = 0; // Reset offset to 0 when a new filter is applied
  router.push({ query: { filter } });
}

const queryFilter = computed(() => {
  const filterValue = route.query.filter;
  if (filterValue === null || typeof filterValue === "undefined") return "sinners";
  return Array.isArray(filterValue) ? filterValue[0] || "sinners" : filterValue;
});

// Fetch the campaign on component mount
onMounted(() => {
  window.scrollTo(0, 0);
  document.title = "IPv6 Sinners & Heroes";
  fetchDomains();
});

onUnmounted(() => {
  document.title = "Why No IPv6?";
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
</script>
