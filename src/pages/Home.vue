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
      <Notification />
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import HomeSaaS from "@/partials/HomeSaaS.vue";
import TopSinners from "@/partials/HomeSinners.vue";
import Searchbar from "@/partials/Searchbar.vue";
import HomeDomains from "@/partials/HomeDomains.vue";
import Notification from "@/components/Notification.vue";

// Services
onMounted(() => {
  document.title = "Why No IPv6?";
});
</script>
