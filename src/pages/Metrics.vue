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
            <header class="mb-8">
              <div class="text-center md:text-left">
                <h1 class="h2 mb-4">Metrics</h1>
                <p class="text-lg text-gray-400">Graphs be nice.</p>
              </div>
            </header>
            <!-- Tab Buttons -->
            <div class="flex mb-4">
              <button @click="applyFilter('byCountry')" :class="tabClass('byCountry')">By Country</button>
              <button @click="applyFilter('byASN')" :class="tabClass('byASN')">By ASN</button>
              <button @click="applyFilter('byIPv6')" :class="tabClass('byIPv6')">By IPv6</button>
              <button @click="applyFilter('byIPv4')" :class="tabClass('byIPv4')">By IPv4</button>
            </div>
            <!-- Tab Content -->
            <div>
              <div v-if="queryFilter === 'byCountry'">
                <MetricCrawler />
              </div>
              <div v-if="queryFilter === 'byASN'">asn</div>
              <div v-if="queryFilter === 'byIPv6'">ipv6</div>
              <div v-if="queryFilter === 'byIPv4'">ipv4</div>
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
import { defineComponent, ref, toRefs } from "vue";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
// Import Metric_Crawler.vue here
import MetricCrawler from "@/partials/MetricCrawler.vue";

// Services

export default defineComponent({
  name: "Metrics",
  components: {
    Header,
    PageIllustration,
    Footer,
    MetricCrawler,
  },
  setup() {
    const queryFilter = ref<string>("byCountry"); // Default tab

    // Function to apply filter
    const applyFilter = (filterType: string) => {
      queryFilter.value = filterType;
    };

    // Function to get class of tab
    const tabClass = (filterType: string) => {
      return ["btn grow border-zinc-700 hover:bg-zinc-800/20 rounded-none first:rounded-l last:rounded-r", queryFilter.value === filterType ? "text-fuchsia-600 bg-zinc-500/20" : "text-slate-300 bg-zinc-700/20"];
    };

    return {
      applyFilter,
      queryFilter,
      tabClass,
    };
  },
});
</script>
