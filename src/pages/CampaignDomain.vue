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
      <section class="relative" ref="anchorTop">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-20 pb-4 md:pt-24 md:pb-4">
            <!-- Breadcrumb -->
            <div class="mb-4">
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                  <li class="inline-flex items-center">
                    <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
                      <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                      Home
                    </router-link>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                      </svg>
                      <router-link to="/campaign" class="ml-1 text-sm font-medium md:ml-2 text-gray-400 hover:text-white">Campaigns</router-link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div class="flex items-center">
                      <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                      </svg>
                      <router-link :to="`/campaign/${$route.params.uuid}`" class="ml-1 text-sm font-medium md:ml-2 text-gray-400 hover:text-white truncate">
                        {{ campaign.name }}
                      </router-link>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <div class="flex justify-between items-center mb-8">
              <div class="text-left">
                <h1 class="h2">{{ domain.domain }}</h1>
                <p class="text-base text-gray-400 pl-1">Provider: {{ domain.asn }}</p>
              </div>
            </div>

            <!-- Domain Status Card -->
            <div class="flex justify-between items-center">
              <div class="text-left">
                <div class="font-bold text-xl text-pink-600">Domain Status</div>
              </div>
              <!-- Rating Stars -->
              <div class="text-center">
                <div class="flex items-center space-x-1">
                  <template v-for="n in 4" :key="n">
                    <svg :class="n <= numberOfStars ? 'w-4 h-4 text-emerald-600' : 'w-4 h-4 text-gray-600'" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </template>
                </div>
              </div>
            </div>

            <!-- Domain Status -->
            <ul class="my-4 space-y-3">
              <li>
                <div class="flex justify-between items-center p-3 text-base rounded group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.v6_aaaa ? 'border-emerald-600' : 'border-pink-600'">
                  <span class="flex-1 ml-3 whitespace-nowrap font-mono text-sm">{{ domain.domain }}</span>
                  <span :class="domain.v6_aaaa ? 'text-emerald-600' : 'text-pink-600'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.v6_aaaa ? "Success" : "Missing" }}
                  </span>
                </div>
              </li>
              <li>
                <div class="flex justify-between items-center p-3 text-base rounded-sm group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.v6_www ? 'border-emerald-600' : 'border-pink-600'">
                  <span class="flex-1 ml-3 whitespace-nowrap font-mono text-sm">www.{{ domain.domain }}</span>
                  <span :class="domain.v6_www ? 'text-emerald-600' : 'text-pink-600'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.v6_www ? "Success" : "Missing" }}
                  </span>
                </div>
              </li>
              <li>
                <div class="flex justify-between items-center p-3 text-base rounded-sm group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.v6_ns ? 'border-emerald-600' : 'border-pink-600'">
                  <span class="flex-1 ml-3 whitespace-nowrap">Nameserver</span>
                  <span :class="domain.v6_ns ? 'text-emerald-600' : 'text-pink-600'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.v6_ns ? "Success" : "Missing" }}
                  </span>
                </div>
              </li>
              <li>
                <div class="flex justify-between items-center p-3 text-base rounded-sm group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.v6_aaaa ? 'border-emerald-600' : 'border-pink-600'">
                  <span class="flex-1 ml-3 whitespace-nowrap">E-Mail</span>
                  <span :class="domain.v6_aaaa ? 'text-emerald-600' : 'text-pink-600'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.v6_aaaa ? "Success" : "Missing" }}
                  </span>
                </div>
              </li>
              <!-- <li>
                <div class="flex justify-between items-center p-3 text-base rounded-sm group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.v6_curl ? 'border-emerald-600' : 'border-pink-600'">
                  <span class="flex-1 ml-3 whitespace-nowrap">Pure v6 connection</span>
                  <span :class="domain.v6_curl ? 'text-emerald-600' : 'text-pink-600'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.v6_curl ? "Success" : "Missing" }}
                  </span>
                </div>
              </li> -->
            </ul>

            <div class="inline-flex items-center text-xs font-normal text-gray-400">Last checked: {{ formattedTsCheck }}</div>
            <!-- End Domain Status Card -->
          </div>
        </div>

        <!-- Changelog -->
        <div>
          <ChangelogTable :changelogs="changelogs" />
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import ChangelogTable from "@/components/ChangelogTable.vue";
import { formatDateTime } from "@/utils/Date";

// Services
import CampaignService from "@/services/CampaignService";
import ChangelogService from "@/services/ChangelogService";
import { Changelog } from "@/types/Changelog";
import { Campaign } from "@/types/Campaign";

export default defineComponent({
  name: "CampaignDomainDetail",
  components: {
    Header,
    PageIllustration,
    Footer,
    ChangelogTable,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      domain: {} as Campaign.CampaignDomain,
      changelogs: [] as Changelog.Log[],
      campaign: {} as Campaign.Campaign,
    });

    async function getDomainDetails(uuid: any, domain: any) {
      const response = await CampaignService.getCampaignDomain(uuid, domain);
      state.domain = response.data;
    }
    async function getDomainChangelog(uuid: any, domain: any) {
      const response = await ChangelogService.getChangelogByCampaignDomain(uuid, domain);
      state.changelogs = response.data;
    }
    async function getCampaign(uuid: string, offset: number) {
      const response = await CampaignService.getCampaign(uuid, 0);
      state.campaign = response.data.campaign;
    }

    const formattedTsCheck = computed(() => {
      if (state.domain.ts_check) {
        return formatDateTime(state.domain.ts_check);
      }
      return "Not Checked Yet";
    });

    const numberOfStars = computed(() => {
      let count = 0;
      if (state.domain.v6_aaaa) count++;
      if (state.domain.v6_www) count++;
      if (state.domain.v6_ns) count++;
      if (state.domain.v6_curl) count++;
      return count;
    });

    // Fetch the campaign on component mount
    onMounted(() => {
      window.scrollTo(0, 0);
      getCampaign(route.params.uuid.toString(), 0);
      getDomainDetails(route.params.uuid, route.params.domain);
      getDomainChangelog(route.params.uuid, route.params.domain);
    });

    return {
      ...toRefs(state),
      route,
      formattedTsCheck,
      numberOfStars,
    };
  },
});
</script>
