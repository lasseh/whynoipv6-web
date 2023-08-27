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
                <h1 class="h2 mb-4">{{ domain.domain }}</h1>
                <p class="text-xl text-gray-400">Provider: {{ domain.asn }}</p>
              </div>
            </header>

            <!-- TEMP, Looks like shit! -->
            <div class="bg-gray-800 p-6 rounded-lg shadow-md">
              <div class="font-bold text-xl mb-4 text-pink-600">Status</div>

              <!-- Table Starts Here -->
              <div class="border-t border-gray-200">
                <div class="py-2">
                  <span class="font-semibold">v6_aaaa:</span>
                  {{ domain.v6_aaaa }}
                </div>
                <div class="border-t border-gray-200 py-2">
                  <span class="font-semibold">v6_www:</span>
                  {{ domain.v6_www }}
                </div>
                <div class="border-t border-gray-200 py-2">
                  <span class="font-semibold">v6_ns:</span>
                  {{ domain.v6_ns }}
                </div>
              </div>

              <!-- Dates -->
              <div class="mt-4">
                <div class="py-2">
                  <span class="font-semibold">Last Checked:</span>
                  {{ domain.ts_check }}
                </div>
                <div class="py-2">
                  <span class="font-semibold">Last Updated:</span>
                  {{ domain.ts_updated }}
                </div>
              </div>
            </div>
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
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import ChangelogTable from "@/components/ChangelogTable.vue";

// Services
import DomainService from "@/services/DomainService";
import ChangelogService from "@/services/ChangelogService";
import { Changelog } from "@/types/Changelog";
import { Domain } from "@/types/Domain";

export default defineComponent({
  name: "DomainDetail",
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
      domain: {} as Domain.Domain,
      changelogs: [] as Changelog.Log[],
    });

    async function getDomainDetails(domain: any) {
      const response = await DomainService.getDomainDetails(domain);
      state.domain = response.data;
      console.log(state.domain);
    }
    async function getDomainChangelog(domain: any) {
      const response = await ChangelogService.getDomainChangelog(domain);
      state.changelogs = response.data;
    }

    // Fetch the campaign on component mount
    onMounted(() => {
      getDomainDetails(route.params.domain);
      getDomainChangelog(route.params.domain);
    });

    return {
      ...toRefs(state),
      route,
    };
  },
});
</script>
