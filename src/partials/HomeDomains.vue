<template>
  <section class="relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-4 pb-4 md:pt-4 md:pb-4">
        <header class="mb-6">
          <!-- Title and excerpt -->
          <div class="text-center md:text-left">
            <h1 class="h3 mb-4" data-aos="fade-up">Top Alexa Sinners</h1>
            <p class="text-l text-gray-400" data-aos="fade-up" data-aos-delay="200">As a part of this shaming-strategy, we supply all interested parties with an updated list over Alexa’s top 1 million websites and their corresponding (lack of) IPv6 support clearly stated.</p>
            <p class="text-l text-gray-400" data-aos="fade-up" data-aos-delay="200">Each of the listed websites (top 100) lack an AAAA-record. In addition the nameserver-support for IPv6 is displayed.</p>
          </div>
        </header>

        <!-- DomainList -->
        <div>
          <DomainTable :domains="domainList" />
        </div>

        <!-- Button to domainlist-->
        <div class="mt-8">
          <div class="flex justify-center">
            <nav class="flex" role="navigation" aria-label="Navigation">
              <div class="ml-2">
                <!-- <a href="#0" class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-zinc-800 hover:bg-indigo-500 borderborder-zinc-700 text-zinc-300 hover:text-white shadow-sm">
                        <span class="sr-only">Load More</span>
                        View Domains
                      </a> -->
                <a href="/domain" class="inline-flex items-center justify-center right-2.5 bottom-2.5 focus:ring-3 focus:outline-none font-medium rounded-sm text-sm px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-900 focus:ring-fuchsia-800">
                  <span class="sr-only">Load More</span>
                  View Domains
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";

// Partials
import DomainTable from "@/components/DomainTable.vue";

// Services
import DomainService from "@/services/DomainService";
import { Domain } from "@/types/Domain";

export default defineComponent({
  name: "HomeDomains",
  components: {
    DomainTable,
  },
  setup() {
    const state = reactive({
      domainList: [] as Domain.Domain[],
    });

    async function getDomainList(offset: number) {
      const response = await DomainService.getDomainList();
      state.domainList = response.data;
    }

    // Fetch the campaign on component mount
    onMounted(() => {
      getDomainList(0);
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
