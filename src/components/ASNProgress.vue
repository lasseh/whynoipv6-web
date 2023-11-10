<!-- NO IN USE!! -->
<template>
  <div>
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-white">
        {{ asn.name }}
        <span class="text-xs font-medium text-gray-500 pl-2">AS{{ asn.number }}</span>
      </span>
      <!-- <span class="text-sm font-medium text-gray-500">{{ percentIPv6 }}% v6 Ready</span> -->
    </div>
    <div class="mb-1 flex h-3 overflow-hidden rounded text-xs">
      <div class="flex flex-col justify-center bg-emerald-600 text-black" :style="{ width: percentIPv6 }"></div>
      <div class="flex flex-col justify-center bg-violet-950 text-black" :style="{ width: percentIPv4 }"></div>
    </div>
    <div class="mb-3 flex items-center justify-between text-xs">
      <div class="text-gray-400">{{ formattedCountV6 }} IPv6 Enabled</div>
      <div class="text-gray-400">{{ formattedCountV4 }} IPv4 Only</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Metric } from "@/types/Metric";

export default defineComponent({
  name: "ASNProgress",
  props: {
    asn: {
      type: Object as () => Metric.ASN,
      required: true,
    },
  },
  setup(props) {
    const calculatePercentage = (count_v4 = 0, count_v6 = 0) => {
      const total = count_v4 + count_v6;
      if (total === 0) return ["0%", "0%"];
      return [`${((count_v4 / total) * 100).toFixed(2)}%`, `${((count_v6 / total) * 100).toFixed(2)}%`];
    };

    const percentages = computed(() => calculatePercentage(props.asn.count_v4, props.asn.count_v6));
    const [percentIPv4, percentIPv6] = percentages.value;

    const formattedCountV4 = computed(() => formatLargeNumber(props.asn.count_v4));
    const formattedCountV6 = computed(() => formatLargeNumber(props.asn.count_v6));

    function formatLargeNumber(number?: number): string {
      if (!number) return "0";
      return number >= 1000 ? `${(number / 1000).toFixed(0)}k` : number.toString();
    }

    return {
      percentIPv4,
      percentIPv6,
      formattedCountV4,
      formattedCountV6,
    };
  },
});
</script>
