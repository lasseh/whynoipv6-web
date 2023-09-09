<template>
  <div class="flex flex-col min-h-screen overflow-hidden" ref="anchorTop">
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
        <div class="pt-32 pb-4 md:pt-32 md:pb-4">
          <ChangelogTable :changelogs="changelog" />
        </div>

        <!-- Pagination -->
        <div class="mt-4">
          <Pagination :offset="offset" :domainsLength="changelog.length" :updateOffset="updateOffset" :scrollToAnchor="scrollToAnchor" />
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
import Pagination from "@/components/Pagination.vue";

// Services
import ChangelogService from "@/services/ChangelogService";

// Types
import { Changelog } from "@/types/Changelog";

export default defineComponent({
  name: "Changelog",
  components: {
    Header,
    PageIllustration,
    Footer,
    ChangelogTable,
    Pagination,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const initialOffset = parseInt(route.query.offset as string) || 0;
    const state = reactive({
      changelog: [] as Changelog.Log[],
      offset: initialOffset,
    });

    // Fetch changelogs
    async function getChangelog(offset: number): Promise<void> {
      const response = await ChangelogService.getChangelog(offset);
      state.changelog = response.data;
    }

    // Fetch the campaign details on component mount
    onMounted(() => {
      getChangelog(state.offset);
    });

    // Pagination
    const anchorTop: Ref<HTMLElement | null> = ref(null);
    const scrollToAnchor = () => {
      if (anchorTop.value) {
        anchorTop.value.scrollIntoView({ behavior: "auto" });
      }
    };
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
          getChangelog(offsetValue);
        }
      }
    );

    return {
      ...toRefs(state),
      scrollToAnchor,
      anchorTop,
      updateOffset,
    };
  },
});
</script>
