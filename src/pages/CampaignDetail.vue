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
          <div class="pt-32 pb-4 md:pt-32 md:pb-4">
            <!-- <div class="max-w-3xl mx-auto"> -->

            <header class="mb-8" ref="anchorTop">
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <h1 class="h2 mb-4" data-aos="fade-up">{{ campaign.name }}</h1>
                <p class="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">{{ campaign.description }}</p>
              </div>
            </header>

            <div class="flex justify-between items-center">
              <div>
                <div class="text-base inline-flex font-medium rounded-md text-center px-2.5 py-1" :class="campaign.colorClass">Rating: {{ campaign.rating }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-zinc-500 mb-2">{{ campaign.count }} Domains</div>
                <div class="text-sm font-medium text-zinc-500 mb-2">{{ campaign.v6_ready }} Domains V6 Ready</div>
              </div>
            </div>

            <!-- CampaingDomains -->
            <div>
              <CampaignDomainTable :domains="domains" />
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-6">
            <Pagination :offset="offset" :domainsLength="domains.length" :updateOffset="updateOffset" :scrollToAnchor="scrollToAnchor" />
          </div>
        </div>

        <!-- Changelog -->
        <div>
          <ChangelogTable :changelogs="campaignChangelog" />
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch, ref, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout components
import { Header, PageIllustration, Footer } from "@/partials";

// Components
import ChangelogTable from "@/components/ChangelogTable.vue";
import CampaignDomainTable from "@/components/CampaignDomainTable.vue";
import Pagination from "@/components/Pagination.vue";

// Services
import CampaignService from "@/services/CampaignService";
import ChangelogService from "@/services/ChangelogService";

// Types
import { Campaign } from "@/types/Campaign";
import { Changelog } from "@/types/Changelog";

export default defineComponent({
  name: "CampaignDetail",
  components: {
    Header,
    PageIllustration,
    Footer,
    ChangelogTable,
    CampaignDomainTable,
    Pagination,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const initialOffset = parseInt(route.query.offset as string) || 0;
    const state = reactive({
      campaign: {} as Campaign.Campaign,
      domains: [] as Campaign.CampaignDomain[],
      campaignChangelog: [] as Changelog.Log[],
      offset: initialOffset,
    });

    // Fetch campaign and domain details
    async function getCampaign(uuid: string, offset: number): Promise<void> {
      const response = await CampaignService.getCampaign(uuid, state.offset);

      // Populate the campaign_uuid field in the domains
      response.data.domains.forEach((domain: Campaign.CampaignDomain) => {
        domain.campaign_uuid = response.data.campaign.uuid;
      });

      state.domains = response.data.domains;
      state.campaign = response.data.campaign;

      // Calculate campaign rating
      const { rating, colorClass } = CampaignService.calculateCampaignRating(state.campaign);
      state.campaign.rating = rating;
      state.campaign.colorClass = colorClass;
    }

    // Fetch changelog details
    async function getCampaignChangelog(uuid: string): Promise<void> {
      const response = await ChangelogService.getCampaignChangelog(uuid);
      state.campaignChangelog = response.data;
    }

    // Fetch the campaign details on component mount
    onMounted(() => {
      getCampaign(route.params.uuid.toString(), initialOffset);
      getCampaignChangelog(route.params.uuid.toString());
    });

    // Pagination stuff
    const anchorTop: Ref<HTMLElement | null> = ref(null);
    const scrollToAnchor = () => {
      if (anchorTop.value) {
        anchorTop.value.scrollIntoView({ behavior: "auto" });
      }
    };
    // Update offset and update URL
    const updateOffset = (newOffset: number) => {
      scrollToAnchor();
      state.offset = newOffset;
      router.push({ query: { ...route.query, offset: newOffset.toString() } });
    };
    // Watch for changes in the offset query parameter
    watch(
      () => route.query.offset,
      newOffset => {
        const offsetValue = parseInt(newOffset as string);
        if (!isNaN(offsetValue)) {
          state.offset = offsetValue;
          getCampaign(route.params.uuid.toString(), offsetValue);
        }
      }
    );

    return {
      ...toRefs(state),
      route,
      scrollToAnchor,
      anchorTop,
      updateOffset,
    };
  },
});
</script>
