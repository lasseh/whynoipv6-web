<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <header class="mb-4">
      <div class="text-center md:text-left">
        <h1 class="h3" data-aos="fade-up">{{ header }}</h1>
      </div>
    </header>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full text-slate-300">
        <tbody class="text-xs font-mono divide-y divide-slate-700 border-b border-slate-700">
          <tr v-for="(logItem, index) in changelogs" :key="index" :class="index % 2 === 0 ? '' : 'bg-gray-800'">
            <td class="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
              <div class="flex">
                <div class="text-slate-100">{{ formatDateTime(logItem.ts) }}</div>
              </div>
            </td>
            <td class="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap text-right">
              <div class="flex">
                <div class="text-slate-100">{{ logItem.domain }}</div>
              </div>
            </td>
            <td class="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap md:w-1/2 w-1/2">
              <div class="flex">
                <div class="font-medium" :class="logItem.ipv6_status ? 'text-emerald-600' : 'text-pink-600'">
                  {{ logItem.message }}
                </div>
              </div>
            </td>
          </tr>
          <tr class="" v-if="changelogs.length === 0">
            <td class="py-1 px-6 text-center" colspan="2">
              <div class="font-medium">No changes yet</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Changelog } from "@/types/Changelog";
import { formatDateTime } from "@/utils/Date";

export default defineComponent({
  name: "ChangelogTable",
  props: {
    changelogs: {
      type: Array as () => Changelog.Log[],
      default: () => [],
    },
    header: {
      type: String,
      default: "Changelog",
    },
  },
  setup() {
    return {
      formatDateTime,
    };
  },
});
</script>
