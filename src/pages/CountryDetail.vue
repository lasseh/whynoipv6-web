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

            <header class="mb-8" ref="tableTop">
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <h1 class="h2 mb-4" data-aos="fade-up">{{ campaign.name }}</h1>
                <p class="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">{{ campaign.description }}</p>
              </div>
            </header>

            <!-- CampaingDomains -->
            <!-- <div ref="tableTop"> -->
            <div>
              <CampaignDomainTable :domains="domains" />
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8">
          <div class="flex justify-center">
            <nav class="flex" role="navigation" aria-label="Navigation">
              <div class="mr-2">
                <button
                  @click="
                    () => {
                      scrollToAnchor();
                      offset = Math.max(0, offset - 50);
                    }
                  "
                  :disabled="offset === 0"
                  class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-zinc-800 hover:bg-indigo-500 border border-zinc-700 text-zinc-300 hover:text-white shadow-sm"
                  :class="{ 'cursor-not-allowed opacity-50': offset === 0 }"
                >
                  <span class="">Previous</span>
                </button>
              </div>
              <div class="ml-2">
                <button
                  @click="
                    () => {
                      scrollToAnchor();
                      offset = offset + 50;
                    }
                  "
                  :disabled="domains.length < 50"
                  class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-zinc-800 hover:bg-indigo-500 border border-zinc-700 text-zinc-300 hover:text-white shadow-sm"
                  :class="{ 'cursor-not-allowed opacity-50': domains.length < 50 }"
                >
                  <span class="">Next</span>
                </button>
              </div>
            </nav>
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

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import ChangelogTable from "@/components/ChangelogTable.vue";
import CampaignDomainTable from "@/components/CampaignDomainTable.vue";

// Services
import CampaignService from "@/services/CampaignService";
import ChangelogService from "@/services/ChangelogService";
import { Campaign } from "@/types/Campaign";
import { Changelog } from "@/types/Changelog";

export default defineComponent({
  name: "CountryDetail",
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
    const tableTop: Ref<HTMLElement | null> = ref(null);
    const state = reactive({
      campaign: {} as Campaign.Campaign,
      domains: [] as Campaign.CampaignDomain[],
      campaignChangelog: [] as Changelog.Log[],
      offset: 0,
    });

    async function getCampaign(uuid: string, offset: number) {
      const response = await CampaignService.getCampaign2(uuid, offset);
      // Populate the campaign_uuid field in the domains
      response.data.domains.forEach((domain: Campaign.CampaignDomain) => {
        domain.campaign_uuid = response.data.campaign.uuid;
      });
      state.domains = response.data.domains;
      state.campaign = response.data.campaign;
    }

    async function getCampaignChangelog(uuid: string) {
      const response = await ChangelogService.getCampaignChangelog(uuid);
      state.campaignChangelog = response.data;
    }

    const scrollToAnchor = () => {
      if (tableTop.value) {
        tableTop.value.scrollIntoView({ behavior: "auto" });
      }
    };

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
      scrollToAnchor,
      tableTop,
    };
  },
});
</script>
