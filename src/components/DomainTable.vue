<template>
  <!-- Table -->
  <div class="overflow-x-auto">
    <table v-if="domains.length > 0" class="table-auto min-w-full text-slate-300">
      <!-- Table header -->
      <thead class="text-xs font-semibold uppercase text-fuchsia-600 border-t border-b border-slate-700">
        <tr>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left md:table-cell hidden">
            <div class="font-semibold text-left">Rank</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
            <div class="font-semibold text-left">Domain</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left md:block hidden">Base Domain</div>
            <div class="font-semibold text-left md:hidden">Base</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left">WWW</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left md:block hidden">Nameserver</div>
            <div class="font-semibold text-left md:hidden">NS</div>
          </th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody class="text-sm divide-y divide-slate-700 border-b border-slate-700">
        <tr v-for="(domain, index) in domains" :key="index" @mouseover="handleMouseOver(index, true)" @mouseout="handleMouseOver(index, false)" class="hover:bg-gray-800">
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left md:table-cell hidden">
            <div class="flex items-center">
              <div :class="computeRankClass(index)" class="inline-flex text-center font-mono text-xs text-slate-300 py-1 px-3 rounded-sm hover:bg-fuchsia-900 transition duration-150 ease-in-out">{{ domain.rank }}</div>
            </div>
          </td>
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2 text-left">
            <div class="flex items-center">
              <RouterLink :to="generateDomainUrl(domain)" class="font-medium text-slate-100">{{ domain.domain }}</RouterLink>
            </div>
          </td>
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="text-xs inline-flex font-medium rounded-full px-2.5 py-1">
              <CheckIcon v-if="domain.v6_aaaa" class="w-3 h-3 shrink-0 fill-current text-emerald-500" />
              <CrossIcon v-else class="w-3 h-3 shrink-0 fill-current text-pink-500" />
            </div>
          </td>
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="text-xs inline-flex font-medium rounded-full px-2.5 py-1">
              <CheckIcon v-if="domain.v6_www" class="w-3 h-3 shrink-0 fill-current text-emerald-500" />
              <CrossIcon v-else class="w-3 h-3 shrink-0 fill-current text-pink-500" />
            </div>
          </td>
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px text-center">
            <div class="text-xs inline-flex font-medium rounded-full px-2.5 py-1">
              <CheckIcon v-if="domain.v6_ns" class="w-3 h-3 shrink-0 fill-current text-emerald-500" />
              <CrossIcon v-else class="w-3 h-3 shrink-0 fill-current text-pink-500" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No Data Available State -->
    <div v-else class="flex justify-center">
      <div class="text-center">
        <div class="text-xl font-medium">No domains found</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// Page Layout
import { CheckIcon, CrossIcon } from "@/partials";

// Services
import { Domain } from "@/types/Domain";

export default defineComponent({
  name: "DomainTable",
  props: {
    domains: {
      type: Array as () => Domain.Domain[],
      default: () => [],
    },
  },
  components: {
    CheckIcon,
    CrossIcon,
  },
  setup() {
    // Ref for tracking hover state
    const hoverIndex = ref<number | null>(null);

    // Handler for mouseover and mouseout events
    const handleMouseOver = (index: number, isHovered: boolean) => {
      hoverIndex.value = isHovered ? index : null;
    };

    // Compute class for rank based on hover state
    const computeRankClass = (index: number) => {
      return hoverIndex.value === index ? "bg-fuchsia-900" : "bg-zinc-700/50";
    };

    // Generate URL for domain
    const generateDomainUrl = (domain: Domain.Domain) => {
      return `/domain/${domain.domain}`;
    };

    return {
      generateDomainUrl,
      handleMouseOver,
      computeRankClass,
    };
  },
});
</script>
