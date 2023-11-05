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

      <section class="relative">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="py-12 md:py-20">
            <div class="py-4 max-w-9xl mx-auto">
              <!-- Page header -->
              <div class="sm:flex sm:justify-between sm:items-center mb-4">
                <!-- Left: Title -->
                <div class="mb-4 sm:mb-0">
                  <h1 class="text-2xl md:text-3xl text-zinc-100 font-bold">Campaigns</h1>
                </div>

                <!-- Right: Actions -->
                <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <!-- Search form -->
                  <form class="relative">
                    <label for="action-search" class="sr-only">Filter</label>
                    <input v-model="searchQuery" id="action-search" class="form-input pl-9 bg-zinc-800" type="search" placeholder="Filter…" />
                    <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                      <svg class="w-4 h-4 shrink-0 fill-current text-zinc-500 group-hover:text-zinc-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </button>
                  </form>

                  <!-- Create campaign button -->
                  <a href="https://github.com/lasseh/whynoipv6-campaign" target="_blank" title="Add Campaign on Github" class="btn bg-fuchsia-700 hover:bg-fuchsia-800 text-white">
                    <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span class="hidden xs:block ml-2">Create Campaign</span>
                  </a>
                </div>
              </div>

              <!-- Campaign info content -->
              <div class="text-lg text-gray-400">
                <p class="mb-4" data-aos="fade-up">Our Campaigns page serves as a rallying point for users like you who recognize the importance of IPv6. Here, we highlight user-submitted lists of domains that are still operating in the IPv4 realm. This page is more than just a compilation of domains; it's a call to action for businesses, website owners, and service providers to step up their game and move towards an IPv6-supported future.</p>
                <p class="mb-8" data-aos="fade-up">
                  Have you discovered a domain that hasn't embraced the IPv6 technology yet? We invite you to take an active role in our initiative. By submitting a issue to our
                  <a href="https://github.com/lasseh/whynoipv6-campaign" class="underline a-gradient" target="_blank">GitHub Repository</a>
                  , we can collectively advocate for the adoption of IPv6. Act today and help us promote the adoption of IPv6, one shame campaign at a time.
                </p>
              </div>

              <!-- Cards -->
              <div class="grid grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="300">
                <!-- Card -->
                <router-link v-for="campaign in filteredCampaignList" :key="campaign.id" :to="{ name: 'CampaignDetail', params: { uuid: campaign.uuid } }" class="col-span-full sm:col-span-6 xl:col-span-4 bg-zinc-800 shadow-lg rounded-sm border border-zinc-700">
                  <div class="flex flex-col h-full p-5">
                    <div class="grow mt-2">
                      <div class="inline-flex text-zinc-100 hover:text-white mb-1">
                        <h2 class="text-xl leading-snug font-semibold">{{ campaign.name }}</h2>
                      </div>
                      <div class="text-sm">{{ campaign.description }}</div>
                    </div>
                    <footer class="mt-5">
                      <div class="flex justify-between mb-1">
                        <span class="text-sm font-medium text-white">v6 Ready</span>
                        <span class="text-sm font-medium text-white">{{ campaign.percent }}%</span>
                      </div>
                      <div class="w-full rounded-full h-2.5 bg-gray-700">
                        <div class="bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 h-2.5 rounded-full" :style="{ width: campaign.percent + '%' }"></div>
                      </div>
                    </footer>
                  </div>
                </router-link>
              </div>

              <!-- Pagination -->
              <!-- <div class="mt-8">
          <Pagination :offset="offset" :domainsLength="campaignList.length" :updateOffset="updateOffset" :scrollToAnchor="scrollToAnchor" />
        </div> -->
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
import { defineComponent, onMounted, reactive, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import Pagination from "@/components/Pagination.vue";
import { calculateRating } from "@/utils/Rating";

// Services
import CampaignService from "@/services/CampaignService";
import { Campaign } from "@/types/Campaign";

export default defineComponent({
  name: "CampaignList",
  components: {
    Header,
    PageIllustration,
    Footer,
    Pagination,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const initialOffset = parseInt(route.query.offset as string) || 0;
    const state = reactive({
      campaignList: [] as Campaign.Campaign[],
      searchQuery: "",
      offset: initialOffset,
    });

    async function fetchCampaignList() {
      try {
        const response = await CampaignService.getCampaignList();
        state.campaignList = response.data;
      } catch (error) {
        console.error("Failed to fetch campaign list:", error);
        // Optionally handle error here, e.g. set an error message in the state.
      }
      // calculate rating per campaign
      state.campaignList.forEach(campaign => {
        const { rating, colorClass } = calculateRating(campaign);
        campaign.rating = rating;
        campaign.colorClass = colorClass;
        // Calculate percentage of domains with IPv6
        campaign.percent = Math.round((campaign.v6_ready / campaign.count) * 100);
      });
    }

    // A computed property to get the filtered country list based on the search query
    const filteredCampaignList = computed(() => {
      if (!state.searchQuery) {
        return state.campaignList;
      }
      return state.campaignList.filter(campaign => campaign.name.toLowerCase().includes(state.searchQuery.toLowerCase()));
    });

    onMounted(() => {
      fetchCampaignList();
    });

    return {
      ...toRefs(state),
      filteredCampaignList,
    };
  },
});
</script>
