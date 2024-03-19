<template>
  <!-- Table -->
  <div class="overflow-x-auto">
    <table v-if="domains.length > 0" class="table-fixed min-w-full text-slate-300">
      <!-- Table header -->
      <thead class="text-xs font-semibold uppercase text-fuchsia-600 border-t border-b border-slate-700">
        <tr>
          <th class="px-5 py-3 whitespace-nowrap text-left">
            <div class="font-semibold text-left">Domain</div>
          </th>
          <th class="px-2 py-3 whitespace-nowrap">
            <div class="font-semibold text-center">Apex</div>
          </th>
          <th class="px-2 py-3 whitespace-nowrap">
            <div class="font-semibold text-center">WWW</div>
          </th>
          <th class="px-2 py-3 whitespace-nowrap">
            <div class="font-semibold text-center md:block hidden">E-Mail</div>
            <div class="font-semibold text-center md:hidden">MX</div>
          </th>
          <th class="px-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-center md:block hidden">Nameserver</div>
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
        <tr v-for="(domain, index) in domains" :key="index" :class="[{ 'bg-emerald-900/50': domain.base_domain == 'supported' && domain.www_domain == 'supported' && domain.nameserver == 'supported' }, { 'hover:bg-gray-800': true }]">
          <td class="px-5 py-3 whitespace-nowrap text-left">
            <div class="flex items-center">
              <router-link :to="{ name: 'CampaignDomainDetail', params: { uuid: domain.campaign_uuid, domain: domain.domain } }" class="font-medium text-slate-100">
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

    <!-- Empty state -->
    <div v-else class="flex justify-center">
      <div class="text-center">
        <div class="text-xl font-medium">No domains found</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

// Page Layout
import { CheckIcon, CrossIcon, MinusIcon } from "@/partials";

// Services
import { Campaign } from "@/types/Campaign";

interface Props {
  domains: Array<Campaign.CampaignDomain>;
}

const props = withDefaults(defineProps<Props>(), {
  domains: () => [],
});

const { domains } = toRefs(props);
</script>
