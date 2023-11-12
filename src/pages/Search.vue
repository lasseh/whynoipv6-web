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
      <section class="relative">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <!-- <div class="pt-32 pb-12 md:pt-40 md:pb-20"> -->
          <div class="pt-20 pb-4 md:pt-24 md:pb-4">
            <div class="pt-4 pb-4 md:pt-4 md:pb-4">
              <form action="/search" method="get">
                <label for="search" class="mb-2 text-sm font-medium sr-only text-white">Search</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input type="search" name="q" v-model="searchString" id="search" class="block w-full p-4 pl-10 text-sm border rounded-sm bg-gray-800 border-gray-700 placeholder-gray-400 text-white focus:ring-fuchsia-900 focus:border-fuchsia-900" placeholder="Search Domains" required />
                  <button type="submit" class="text-white absolute right-2.5 bottom-2.5 focus:ring-3 focus:outline-none font-medium rounded-sm text-sm px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-900 focus:ring-fuchsia-800">Search</button>
                </div>
              </form>
            </div>

            <div v-if="domainList">
              <header class="mb-4">
                <div class="text-left">
                  <h1 class="h2 mb-4" data-aos="fade-up">Domains</h1>
                </div>
              </header>
              <!-- Domains -->
              <div>
                <DomainTable :domains="domainList" />
              </div>
            </div>
          </div>

          <div v-if="campaignDomains && campaignDomains.length > 0">
            <header class="mb-4">
              <div class="text-left">
                <h1 class="h2 mb-4" data-aos="fade-up">Campaign Domains</h1>
              </div>
            </header>
            <!-- CampaingDomains -->
            <div>
              <CampaignDomainTable :domains="campaignDomains" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch, ref, PropType } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import DomainTable from "@/components/DomainTable.vue";
import CampaignDomainTable from "@/components/CampaignDomainTable.vue";

// Services
import DomainService from "@/services/DomainService";
import CampaignService from "@/services/CampaignService";
import { Domain } from "@/types/Domain";
import { Campaign } from "@/types/Campaign";

export default defineComponent({
  name: "SearchPage",
  components: {
    Header,
    PageIllustration,
    Footer,
    DomainTable,
    CampaignDomainTable,
  },
  props: {
    query: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const initialOffset = parseInt(route.query.offset as string) || 0;
    const state = reactive({
      domainList: Array<Domain.Domain>(),
      campaignDomains: Array<Campaign.CampaignDomain>(),
      searchString: ref(props.query),
      offset: initialOffset,
    });

    async function fetchSearchResult() {
      // If the query is empty, don't fetch anything
      if (!props.query || props.query === "undefined") {
        state.domainList = [];
        state.campaignDomains = [];
        return;
      }

      const domainResponse = await DomainService.searchDomain(props.query, state.offset);
      state.domainList = domainResponse.data.data;

      const campaignResponse = await CampaignService.searchDomain(props.query, state.offset);
      state.campaignDomains = campaignResponse.data.data;

      state.searchString = props.query;
    }

    onMounted(fetchSearchResult);
    watch(() => props.query, fetchSearchResult);

    return {
      ...toRefs(state),
      fetchSearchResult,
    };
  },
});
</script>
