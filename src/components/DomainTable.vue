<template>
  <!-- Table -->
  <div class="overflow-x-auto">
    <table v-if="domains.length > 0" class="table-auto w-full text-slate-300">
      <!-- Table header -->
      <thead class="text-xs font-semibold uppercase text-slate-500 border-t border-b border-slate-700">
        <tr>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
            <div class="font-semibold text-left">Rank</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
            <div class="font-semibold text-left">Domain</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left">IPv6 at Domain Root</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left">IPv6 at WWW</div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-center">
            <div class="font-semibold text-right">IPv6 Nameserver</div>
          </th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody class="text-sm divide-y divide-slate-700 border-b border-slate-700">
        <tr v-for="(domain, index) in domains" :key="index" :class="[{ 'bg-emerald-900': domain.v6_aaaa && domain.v6_www && domain.v6_ns }, { 'hover:bg-gray-800': true }, { 'bg-grayyyyyy-800': index % 2 !== 0 }]">
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
            <div class="flex items-center">
              <a class="inline-flex text-center text-gray-400 py-1 px-3 rounded-sm bg-zinc-700/50 hover:bg-fuchsia-900 transition duration-150 ease-in-out">{{ domain.rank }}</a>
            </div>
          </td>
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2 text-left">
            <div class="flex items-center">
              <RouterLink :to="getDomainUrl(domain)" class="font-medium text-slate-100">{{ domain.domain }}</RouterLink>
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

  <!-- Empty state -->
  <div v-else class="flex justify-center">
    <div class="text-center">
      <div class="text-xl font-medium">No domains found</div>
    </div>
  </div>
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

// Page Layout
import {
  CheckIcon,
  CrossIcon,
} from '@/partials';

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
    const route = useRoute();

    function getDomainUrl(domain: Domain.Domain) {
      return `/domain/${domain.domain}`;
    }

    return {
      getDomainUrl,
    };
  },
});
</script>
