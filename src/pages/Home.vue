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
      <HomeSaaS />
      <Searchbar />
      <TopSinners />
      <HomeDomains />
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import HomeInfo from "@/partials/HomeInfo.vue";
import HomeSaaS from "@/partials/HomeSaaS.vue";
import MetricTotals from "@/partials/HomeMetric.vue";
import TopSinners from "@/partials/HomeSinners.vue";
import Searchbar from "@/partials/Searchbar.vue";
import HomeDomains from "@/partials/HomeDomains.vue";

// Services

export default defineComponent({
  name: "Home",
  components: {
    Header,
    PageIllustration,
    Footer,
    HomeInfo,
    HomeSaaS,
    Searchbar,
    MetricTotals,
    TopSinners,
    HomeDomains,
  },
  onMounted() {
    document.title = "Why No IPv6?";
  },
});
</script>
