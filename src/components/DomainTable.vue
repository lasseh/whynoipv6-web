<template>
  <!-- Table -->
  <div class="overflow-x-auto">
    <table v-if="domains.length > 0" class="table-fixed min-w-full text-slate-300">
      <!-- Table header -->
      <thead class="text-xs font-semibold uppercase text-fuchsia-600 border-t border-b border-slate-700">
        <tr>
          <th class="px-5 py-3 whitespace-nowrap text-left md:table-cell hidden">
            <div class="font-semibold text-left">Rank</div>
          </th>
          <th class="md:px-2 px-5 py-3 whitespace-nowrap text-left">
            <div class="font-semibold text-left">Domain</div>
          </th>
          <th class="px-2 py-3 whitespace-nowrap">
            <div class="has-tooltip">
              <span class="tooltip rounded border border-slate-700 shadow-lg p-1 bg-gray-800 text-fuchsia-600 -mt-8 normal-case">Top-level domain query: dig AAAA domain.com</span>
              Apex
            </div>
          </th>
          <th class="px-2 py-3 whitespace-nowrap">
            <div class="has-tooltip">
              <span class="tooltip rounded border border-slate-700 shadow-lg p-1 bg-gray-800 text-fuchsia-600 -mt-8 normal-case">Query AAAA record for www.domain.com</span>
              WWW
            </div>
          </th>
          <th class="px-2 py-3 whitespace-nowrap">
            <div class="font-semibold text-center md:block hidden">
              <div class="has-tooltip">
                <span class="tooltip rounded border border-slate-700 shadow-lg p-1 bg-gray-800 text-fuchsia-600 -mt-8 normal-case">Query MX record for domain.com</span>
                E-Mail
              </div>
            </div>
            <div class="font-semibold text-center md:hidden">MX</div>
          </th>
          <th class="px-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-center md:block hidden">
              <div class="has-tooltip">
                <span class="tooltip rounded border border-slate-700 shadow-lg p-1 bg-gray-800 text-fuchsia-600 -mt-8 normal-case">Query NS record for domain.com</span>
                Nameserver
              </div>
            </div>
            <div class="font-semibold text-center md:hidden">NS</div>
          </th>
          <!-- Disable until crawler is ready -->
          <!-- <th class="px-2 py-3 whitespace-nowrap">
            <div class="font-semibold text-center md:block hidden">v6 Only</div>
            <div class="font-semibold text-center md:hidden">v6</div>
          </th> -->
        </tr>
      </thead>
      <!-- Table body -->
      <tbody class="text-sm divide-y divide-slate-700 border-b border-slate-700">
        <tr v-for="(domain, index) in domains" :key="index" @mouseover="handleMouseOver(index, true)" @mouseout="handleMouseOver(index, false)" class="hover:bg-gray-800">
          <td class="px-2 py-3 whitespace-nowrap md:table-cell hidden w-px text-center">
            <div class="flex items-center">
              <div :class="computeRankClass(index)" class="inline-flex text-center font-mono text-xs text-slate-300 py-1 px-3 rounded-sm hover:bg-fuchsia-900 transition duration-150 ease-in-out">{{ domain.rank }}</div>
            </div>
          </td>
          <td class="px-5 md:px-2 py-3 whitespace-nowrap text-left">
            <div class="flex items-center">
              <router-link :to="{ name: 'DomainDetail', params: { domain: domain.domain } }" class="font-medium text-slate-100">
                {{ domain.domain }}
              </router-link>
            </div>
          </td>
          <td class="px-2 py-3 whitespace-nowrap w-px md:w-[10%] text-center">
            <div class="inline-flex px-2.5 py-1">
              <CheckIcon v-if="domain.base_domain == 'supported'" class="text-emerald-500" />
              <CrossIcon v-if="domain.base_domain == 'unsupported'" class="text-pink-500" />
              <MinusIcon v-if="domain.base_domain == 'no_record'" class="text-amber-500" />
            </div>
          </td>
          <td class="px-2 py-3 whitespace-nowrap w-px md:w-[10%] text-center">
            <div class="inline-flex px-2.5 py-1">
              <CheckIcon v-if="domain.www_domain == 'supported'" class="text-emerald-500" />
              <CrossIcon v-if="domain.www_domain == 'unsupported'" class="text-pink-500" />
              <MinusIcon v-if="domain.www_domain == 'no_record'" class="text-amber-500" />
            </div>
          </td>
          <td class="px-2 py-3 whitespace-nowrap w-px md:w-[10%] text-center">
            <div class="inline-flex px-2.5 py-1">
              <CheckIcon v-if="domain.mx_record == 'supported'" class="text-emerald-500" />
              <CrossIcon v-if="domain.mx_record == 'unsupported'" class="text-pink-500" />
              <MinusIcon v-if="domain.mx_record == 'no_record'" class="text-amber-500" />
            </div>
          </td>
          <td class="px-2 py-3 whitespace-nowrap w-px md:w-[10%] text-center">
            <div class="inline-flex px-2.5 py-1">
              <CheckIcon v-if="domain.nameserver == 'supported'" class="text-emerald-500" />
              <CrossIcon v-if="domain.nameserver == 'unsupported'" class="text-pink-500" />
              <MinusIcon v-if="domain.nameserver == 'no_record'" class="text-amber-500" />
            </div>
          </td>
          <!-- <td class="px-2 py-3 whitespace-nowrap w-px text-center">
            <div class="inline-flex px-2.5 py-1">
              <CheckIcon v-if="domain.v6_curl" class="text-emerald-500" />
              <MinusIcon v-else class="text-pink-500" />
            </div>
          </td> -->
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

<script lang="ts" setup>
import { ref, computed, toRefs } from "vue";

// Page Layout
import { CheckIcon, CrossIcon, MinusIcon } from "@/partials";

// Services
import { Domain } from "@/types/Domain";

interface Props {
  domains: Array<Domain.Domain>;
}

const props = withDefaults(defineProps<Props>(), {
  domains: () => [],
});

const { domains } = toRefs(props);

// Ref for tracking hover state
const hoverIndex = ref<number | null>(null);

// Handler for mouseover and mouseout events
const handleMouseOver = (index: number, isHovered: boolean) => {
  hoverIndex.value = isHovered ? index : null;
};

// Compute class for rank based on hover state
const computeRankClass = computed(() => (index: number) => {
  return hoverIndex.value === index ? "bg-fuchsia-900" : "bg-zinc-700/50";
});
</script>

<style scoped>
.tooltip {
  visibility: hidden;
  position: absolute;
}

.has-tooltip:hover .tooltip {
  visibility: visible;
  z-index: 50;
}
</style>
