<template>
  <div v-for="(asn, index) in asnData" :key="index">
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-white">
        {{ asn.name }}
        <span class="text-xs font-medium text-gray-500 pl-2">AS{{ asn.number }}</span>
      </span>
      <!-- <span class="text-sm font-medium text-gray-500">{{ percentIPv6 }}% v6 Ready</span> -->
    </div>
    <div class="mb-1 flex h-3 overflow-hidden rounded text-xs">
      <div class="flex flex-col justify-center bg-emerald-600 text-black" :style="{ width: calculatePercentage(asn.count_v4, asn.count_v6)[1] }"></div>
      <div class="flex flex-col justify-center bg-violet-950 text-black" :style="{ width: calculatePercentage(asn.count_v4, asn.count_v6)[0] }"></div>
    </div>
    <div class="mb-3 flex items-center justify-between text-xs">
      <div class="text-gray-400">{{ formatLargeNumber(asn.count_v6) }} IPv6 Enabled</div>
      <div class="text-gray-400">{{ formatLargeNumber(asn.count_v4) }} IPv4 Only</div>
    </div>
  </div>

  <div class="" v-if="asnData.length === 0">
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-white">
        Not Found
        <span class="text-xs font-medium text-gray-500 pl-2">AS404</span>
      </span>
    </div>
    <div class="mb-1 flex h-3 overflow-hidden rounded text-xs">
      <div class="flex flex-col justify-center bg-emerald-600 text-black" :style="{ width: 100 }"></div>
      <div class="flex flex-col justify-center bg-violet-950 text-black" :style="{ width: 0 }"></div>
    </div>
    <div class="mb-3 flex items-center justify-between text-xs">
      <div class="text-gray-400">0 IPv6 Enabled</div>
      <div class="text-gray-400">0 IPv4 Only</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Metric } from "@/types/Metric";

export default defineComponent({
  name: "NetworkProvider",
  props: {
    asnData: {
      type: Array as () => Metric.ASN[],
      required: true,
    },
  },
  methods: {
    calculatePercentage(count_v4 = 0, count_v6 = 0) {
      const total = count_v4 + count_v6;
      if (total === 0) return ["0%", "0%"];
      return [`${((count_v4 / total) * 100).toFixed(2)}%`, `${((count_v6 / total) * 100).toFixed(2)}%`];
    },
    formatLargeNumber(number?: number): string {
      if (!number) return "0";
      return number >= 1000 ? `${(number / 1000).toFixed(0)}k` : number.toString();
    },
  },
});
</script>