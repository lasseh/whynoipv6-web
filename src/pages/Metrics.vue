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
          <!-- <div class="py-12 md:py-20"> -->
          <div class="pt-20 pb-4 md:pt-24 md:pb-4">
            <div class="py-4 max-w-9xl mx-auto">
              <!-- Page header -->
              <div class="sm:flex sm:justify-between sm:items-center mb-4">
                <!-- Left: Title -->
                <div class="mb-4 sm:mb-0">
                  <h1 class="text-2xl md:text-3xl text-zinc-100 font-bold">Metrics</h1>
                  <p class="text-lg text-gray-400">Insights into IPv6 Deployment Statistics within the Alexa Dataset.</p>
                </div>
              </div>
            </div>

            <!-- Tab Buttons -->
            <div class="flex mb-4">
              <button @click="applyFilterAndUpdateRoute('overview')" :class="tabClass('overview')">Overview</button>
              <button @click="applyFilterAndUpdateRoute('asn')" :class="tabClass('asn')">Network Providers</button>
            </div>
            <!-- Tab Content -->
            <div>
              <div v-if="queryFilter === 'overview'">
                <MetricCrawler />
              </div>
              <div v-if="queryFilter === 'asn'">
                <MetricASN />
              </div>
              <div v-if="queryFilter === 'byIPv6'">ipv6</div>
              <div v-if="queryFilter === 'byIPv4'">ipv4</div>
            </div>
          </div>

          <!-- Error message -->
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import MetricCrawler from "@/partials/MetricCrawler.vue";
import MetricASN from "@/partials/MetricASN.vue";

const router = useRouter();
const route = useRoute();
const queryFilter = ref<string>((route.query.t as string) || "overview");
const error = ref<string | null>(null);

// Watch for changes in route query
watch(
  () => route.query.t,
  newFilter => {
    if (typeof newFilter === "string" && newFilter !== queryFilter.value) {
      queryFilter.value = newFilter;
    }
  }
);

// Function to update the route
const updateRoute = (filterType: string) => {
  router.push({ query: { t: filterType } }).catch(err => {});
};

const applyFilterAndUpdateRoute = (filterType: string) => {
  updateRoute(filterType);
};

const tabClass = (filterType: string): string[] => {
  return ["btn grow border-zinc-700 hover:bg-zinc-800/20 rounded-none first:rounded-l last:rounded-r", queryFilter.value === filterType ? "text-fuchsia-600 bg-zinc-500/20" : "text-slate-300"];
};

// Initialize queryFilter from URL on mount
onMounted(() => {
  document.title = "Metrics - Why No IPv6?";
  if (typeof route.query.t === "string") {
    queryFilter.value = route.query.t;
  }
});

onUnmounted(() => {
  document.title = "Why No IPv6?";
});
</script>
