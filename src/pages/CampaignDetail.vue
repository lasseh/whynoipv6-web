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
          <div class="pt-32 pb-12 md:pt-40 md:pb-20">
            <!-- <div class="max-w-3xl mx-auto"> -->

            <header class="mb-8">
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <h1 class="h2 mb-4" data-aos="fade-up">{{ campaign.name }}</h1>
                <p class="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">{{ campaign.description }}</p>
              </div>
            </header>

            <!-- CampaingDomains -->
            <div>
              <CampaignDomainTable :domains="domains" />
            </div>
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
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import {
  Header,
  PageIllustration,
  Footer,
} from '@/partials';

// Partials
import ChangelogTable from "@/components/ChangelogTable.vue";
import CampaignDomainTable from "@/components/CampaignDomainTable.vue";

// Services
import CampaignService from "@/services/CampaignService";
import ChangelogService from "@/services/ChangelogService";
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
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      campaign: {} as Campaign.Campaign,
      domains: [] as Campaign.CampaignDomain[],
      campaignChangelog: [] as Changelog.Log[],
      offset: 0,
    });

    async function getCampaign(uuid: string, offset: number) {
      const response = await CampaignService.getCampaign2(uuid, offset);
      state.domains = response.data.domains;
      state.campaign = response.data.campaign;
    }
    async function getCampaignChangelog(uuid: string) {
      const response = await ChangelogService.getCampaignChangelog(uuid);
      state.campaignChangelog = response.data;
    }

    // Fetch the campaign on component mount
    onMounted(() => {
      getCampaign(route.params.uuid.toString(), state.offset);
      getCampaignChangelog(route.params.uuid.toString());
    });

    // Watch for changes in the offset
    watch(
      () => state.offset,
      newValue => {
        getCampaign(route.params.uuid.toString(), newValue);
      }
    );

    return {
      ...toRefs(state),
      route,
    };
  },
});
</script>
