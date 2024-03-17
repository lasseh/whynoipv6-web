<template>
  <section v-if="!isLoading && totalsData.length > 0">
    <header class="mb-8">
      <div class="text-left">
        <h3 class="h4 mb-1">Overview</h3>
        <p class="text-lg text-gray-400 mb-2">
          In a detailed examination of IPv6 adoption, it's observed that among the top 1000 websites ranked by Tranco, only
          <span class="text-fuchsia-600">{{ totalsData[0].data.top_heroes }}</span>
          have IPv6 enabled. Furthermore, while
          <span class="text-fuchsia-600">{{ totalsData[0].data.top_nameserver }}</span>
          of these sites' nameservers support IPv6, indicating a slightly better uptake in infrastructure readiness, the overall picture across a wider dataset of
          <span class="text-fuchsia-600">{{ totalsData[0].data.domains }}</span>
          sites is less optimistic, with just
          <span class="text-fuchsia-600">{{ percentages }}</span>
          adopting IPv6.
        </p>
        <p class="text-lg text-gray-400">This slow transition to the more advanced, secure, and efficient IPv6 is concerning, especially considering its importance for the future scalability of the internet. The data highlights a significant lag in the global shift towards modern internet protocols, emphasizing the need for accelerated adoption efforts.</p>
      </div>
    </header>

    <div class="grid md:grid-cols-4 bg-gray-800 divide-y md:divide-y-0 md:divide-x divide-gray-700 px-6 md:px-0 md:py-4 text-center mb-8">
      <!-- 1st item -->
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-fuchsia-700 mb-2" data-aos="fade-up">{{ formatLargeNumber(totalsData[0].data.domains) }}</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">Total valid domains</div>
      </div>
      <!-- 3rd item -->
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-fuchsia-700 mb-2" data-aos="fade-up">{{ formatLargeNumber(totalsData[0].data.nameserver) }}</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">IPv6 Enabled Nameservers</div>
      </div>
      <!-- 2nd item -->
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-fuchsia-700 mb-2" data-aos="fade-up">{{ formatLargeNumber(totalsData[0].data.base_domain) }}</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">IPv6 Enabled domains</div>
      </div>
      <!-- 4rd item -->
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-fuchsia-700 mb-2" data-aos="fade-up">{{ formatLargeNumber(totalsData[0].data.heroes) }}</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">Fully IPv6 Ready Domains</div>
      </div>
    </div>

    <!-- Top 1k -->
    <header class="mb-8">
      <div class="text-left">
        <h3 class="h4 mb-1">Top 1000</h3>
        <p class="text-l text-gray-400">Among the top 1000 domains, the following are equipped with IPv6 support:</p>
      </div>
    </header>
    <div class="grid md:grid-cols-2 bg-gray-800 divide-y md:divide-y-0 md:divide-x divide-gray-700 px-6 md:px-0 md:py-4 text-center">
      <!-- 1st item -->
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-fuchsia-700 mb-2" data-aos="fade-up">{{ formatLargeNumber(totalsData[0].data.top_heroes) }}</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">Top 1k domains</div>
      </div>
      <!-- 2rd item -->
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-fuchsia-700 mb-2" data-aos="fade-up">{{ formatLargeNumber(totalsData[0].data.top_nameserver) }}</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">Top 1k IPv6 Enabled Nameservers</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs, computed } from "vue";

// Services
import MetricService from "@/services/MetricService";
import { Metric } from "@/types/Metric";

const state = reactive({
  totalsData: [] as Metric.Totals,
  isLoading: true,
});

const { totalsData, isLoading } = toRefs(state);

async function getTotals() {
  const response = await MetricService.getTotals();
  state.totalsData = response.data;
  state.isLoading = false;
}

const calculatePercentage = (count_v4 = 0, count_v6 = 0) => {
  const total = count_v4 + count_v6;
  if (total === 0) return ["0%", "0%"];
  return `${((count_v6 / total) * 100).toFixed(1)}%`;
};

const percentages = computed(() => calculatePercentage(state.totalsData[0].data.domains, state.totalsData[0].data.heroes));

onMounted(() => {
  getTotals();
});

const formatLargeNumber = (number: number): string => {
  if (number >= 1000) {
    return (number / 1000).toFixed(0) + "K";
  } else {
    return number.toString();
  }
};
</script>
