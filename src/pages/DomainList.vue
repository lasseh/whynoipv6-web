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
                <h1 class="h2 mb-4" data-aos="fade-up">Domain List</h1>
                <p class="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">List of sinners</p>
              </div>
            </header>

                <!-- Filter domains -->
                  <div class="mb-4">
                    <div class="w-full flex flex-wrap -space-x-px">
                        <button class="btn grow bg-zinc-800 border-zinc-700 text-fuchsia-600 rounded-none first:rounded-l last:rounded-r">All</button>
                        <button class="btn grow bg-zinc-800 border-zinc-700 hover:bg-zinc-700/20 text-slate-300 rounded-none first:rounded-l last:rounded-r">Sinners</button>
                        <button class="btn grow bg-zinc-800 border-zinc-700 hover:bg-zinc-700/20 text-slate-300 rounded-none first:rounded-l last:rounded-r">Heroes</button>
                    </div>
                  </div>

            <!-- Domains -->
            <div>
              <DomainTable :domains="domainList" />
            </div>
          </div>
        </div>

         <!-- Pagination -->
              <!-- TODO: Needs work -->
              <div class="mt-8">
                <div class="flex justify-center">
                  <nav class="flex" role="navigation" aria-label="Navigation">
                    <div class="mr-2">
                      <span class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-zinc-800 border border-zinc-700 text-zinc-600">
                        <span class="sr-only">Previous</span>
                        <wbr />
                        <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
                          <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
                        </svg>
                      </span>
                    </div>
                    <ul class="inline-flex text-sm font-medium -space-x-px shadow-sm">
                      <li>
                        <span class="inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-zinc-800 border border-zinc-700 text-indigo-500">1</span>
                      </li>
                      <li>
                        <a class="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-zinc-800 hover:bg-indigo-500 border border-zinc-700 text-zinc-300 hover:text-white" href="#0">2</a>
                      </li>
                      <li>
                        <a class="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-zinc-800  hover:bg-indigo-500 border border-zinc-700 text-zinc-300 hover:text-white" href="#0">3</a>
                      </li>
                      <li>
                        <span class="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-zinc-800 border border-zinc-700 text-zinc-500">…</span>
                      </li>
                      <li>
                        <a class="inline-flex items-center justify-center rounded-r leading-5 px-3.5 py-2 bg-zinc-800 hover:bg-indigo-500 border border-zinc-700 text-zinc-300 hover:text-white" href="#0">9</a>
                      </li>
                    </ul>
                    <div class="ml-2">
                      <a href="#0" class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-zinc-800 hover:bg-indigo-500 border border-zinc-700 text-zinc-300 hover:text-white shadow-sm">
                        <span class="sr-only">Next</span>
                        <wbr />
                        <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
                          <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                        </svg>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>

      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import {
  Header,
  PageIllustration,
  Footer,
} from '@/partials';

// Partials
import DomainTable from "@/components/DomainTable.vue";

// Services
import DomainService from "@/services/DomainService";
import { Domain } from "@/types/Domain";

// Domain filters
const ALL = 'All';
const SINNERS = 'Sinners';
const HEROES = 'Heroes';

export default defineComponent({
  name: "DomainList",
  components: {
    Header,
    PageIllustration,
    Footer,
    DomainTable,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedCategory = ref(ALL);
    const state = reactive({
      domainList: [] as Domain.Domain[],
      offset: 0,
    });

    async function getDomainList(offset: number) {
      const response = await DomainService.getDomainList();
      state.domainList = response.data;
      console.log(response.data);
    }

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
    };
  },
});
</script>
