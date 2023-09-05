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

            <header class="mb-8" ref="tableTop">
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <h1 class="h2 mb-4" data-aos="fade-up">Domain List</h1>
                <p class="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">List of sinners</p>
              </div>
            </header>

            <!-- Filter domains -->
            <div class="mb-4">
              <div class="w-full flex flex-wrap -space-x-px">
                <button @click="getDomainList(0)" class="btn grow bg-zinc-800 border-zinc-700 text-fuchsia-600 rounded-none first:rounded-l last:rounded-r">All</button>
                <button class="btn grow bg-zinc-800 border-zinc-700 hover:bg-zinc-700/20 text-slate-300 rounded-none first:rounded-l last:rounded-r">Sinners</button>
                <button @click="getDomainHeroes(0)" class="btn grow bg-zinc-800 border-zinc-700 hover:bg-zinc-700/20 text-slate-300 rounded-none first:rounded-l last:rounded-r">Heroes</button>
              </div>
            </div>

            <!-- Domains -->
            <div>
              <DomainTable :domains="domainList" />
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8">
          <Pagination :offset="offset" :itemsCount="domainList.length" :pageSize="50" :onPageChange="updateOffset" />
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
import DomainTable from "@/components/DomainTable.vue";
import Pagination from "@/components/Pagination.vue";

// Services
import DomainService from "@/services/DomainService";
import { Domain } from "@/types/Domain";

// Domain filters
const ALL = "All";
const SINNERS = "Sinners";
const HEROES = "Heroes";

export default defineComponent({
  name: "DomainList",
  components: {
    Header,
    PageIllustration,
    Footer,
    DomainTable,
    Pagination,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedCategory = ref(ALL);
    const tableTop: Ref<HTMLElement | null> = ref(null);
    const state = reactive({
      domainList: [] as Domain.Domain[],
      offset: 0,
    });

    async function getDomainList(offset: number) {
      const response = await DomainService.getDomainList();
      state.domainList = response.data;
      console.log(response.data);
    }

    async function getDomainHeroes(offset: number) {
      const response = await DomainService.getDomainHeroes();
      state.domainList = response.data;
      console.log(response.data);
    }

    const scrollToAnchor = () => {
      if (tableTop.value) {
        tableTop.value.scrollIntoView({ behavior: "auto" });
      }
    };

    const updateOffset = (newOffset: number) => {
      scrollToAnchor();
      state.offset = newOffset;
    };

    // Fetch the campaign on component mount
    onMounted(() => {
      getDomainList(0);
    });

    // Watch for changes in the offset
    watch(
      () => state.offset,
      newValue => {
        getDomainList(newValue);
      }
    );

    return {
      ...toRefs(state),
      route,
      getDomainList,
      getDomainHeroes,
      scrollToAnchor,
      tableTop,
      updateOffset,
    };
  },
});
</script>
