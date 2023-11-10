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
            <header class="mb-6">
              <div class="text-left">
                <h1 class="h2 mb-1">Metrics</h1>
                <p class="text-lg text-gray-400">Discover the Stark Reality of IPv6 Deployment</p>
              </div>
            </header>
            <!-- Tab Buttons -->
            <div class="flex mb-4">
              <button @click="applyFilter('overview')" :class="tabClass('overview')">Overview</button>
              <button @click="applyFilter('asn')" :class="tabClass('asn')">Network Providers</button>
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
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import MetricCrawler from "@/partials/MetricCrawler.vue";
import MetricASN from "@/partials/MetricASN.vue";

export default defineComponent({
  name: "Metrics",
  components: {
    Header,
    PageIllustration,
    Footer,
    MetricCrawler,
    MetricASN,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const queryFilter = ref<string>((route.query.t as string) || "overview");

    // Watch for changes in route query and update the local state
    watch(
      () => route.query.t,
      newFilter => {
        if (typeof newFilter === "string") {
          queryFilter.value = newFilter;
        }
      }
    );

    const applyFilter = (filterType: string) => {
      queryFilter.value = filterType;
      // Update the route query parameter
      router.push({ query: { ...route.query, t: filterType } }).catch(err => {});
    };

    const tabClass = (filterType: string): string[] => {
      return ["btn grow border-zinc-700 hover:bg-zinc-800/20 rounded-none first:rounded-l last:rounded-r", queryFilter.value === filterType ? "text-fuchsia-600 bg-zinc-500/20" : "text-slate-300"];
    };

    // Initialize queryFilter from URL on mount
    onMounted(() => {
      if (typeof route.query.t === "string") {
        queryFilter.value = route.query.t;
      }
    });

    return {
      applyFilter,
      queryFilter,
      tabClass,
    };
  },
});
</script>
