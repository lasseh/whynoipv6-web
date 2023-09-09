<template>
  <!-- Table -->
  <div class="overflow-x-auto">
    <table v-if="domains.length > 0" class="table-auto w-full text-slate-300">
      <!-- Table header -->
      <thead class="text-xs font-semibold uppercase text-fuchsia-600 border-t border-b border-slate-700">
        <tr>
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
        <tr v-for="(domain, index) in domains" :key="index" :class="[{ 'bg-emerald-900/50': domain.v6_aaaa && domain.v6_www && domain.v6_ns }, { 'hover:bg-gray-800': true }, { 'bg-grayyyyyyyyyyy-800': index % 2 !== 0 }]">
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2 text-left">
            <div class="flex items-center">
              <RouterLink :to="getCampaignUrl(domain)" class="font-medium text-slate-100">{{ domain.domain }}</RouterLink>
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
import { CheckIcon, CrossIcon } from "@/partials";

// Services
import { Campaign } from "@/types/Campaign";

export default defineComponent({
  name: "CampaignDomainTable",
  props: {
    domains: {
      type: Array as () => Campaign.CampaignDomain[],
      default: () => [],
    },
  },
  components: {
    CheckIcon,
    CrossIcon,
  },
  setup() {
    const route = useRoute();

    function getCampaignUrl(domain: Campaign.CampaignDomain) {
      return `/campaign/${domain.campaign_uuid}/${domain.domain}`;
    }

    return {
      getCampaignUrl,
    };
  },
});
</script>
