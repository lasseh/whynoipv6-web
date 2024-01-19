<template>
  <section v-if="!isLoading && totalsData.length > 0">
    <header class="mb-8">
      <div class="text-left">
        <h3 class="h4 mb-1">Data Overview</h3>
        <p class="text-l text-gray-400">The Alexa list contains 1 million domains, but not all of them exist. Here's the data for valid domains and their support for IPv6.</p>
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
        <h3 class="h4 mb-1">Alexa Top 1000</h3>
        <p class="text-l text-gray-400">Among the top 1000 domains listed on Alexa, the following are equipped with IPv6 support:</p>
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

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";

// Services
import MetricService from "@/services/MetricService";
import { Metric } from "@/types/Metric";

export default defineComponent({
  name: "MetricOverview",
  components: {},
  setup() {
    const state = reactive({
      totalsData: [] as Metric.Totals,
      isLoading: true,
    });
    async function getTotals() {
      const response = await MetricService.getTotals();
      state.totalsData = response.data;
      state.isLoading = false;
    }

    onMounted(() => {
      getTotals();
    });

    return {
      ...toRefs(state),
      getTotals,
    };
  },
  methods: {
    formatLargeNumber(number: number): string {
      if (number >= 1000) {
        return (number / 1000).toFixed(0) + "K";
      } else {
        return number.toString();
      }
    },
  },
});
</script>
