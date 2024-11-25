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
          <!-- <div class="pt-32 pb-12 md:pt-40 md:pb-20"> -->
          <div class="pt-20 pb-4 md:pt-24 md:pb-4">
            <!-- Breadcrumb -->
            <div class="mb-4">
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                  <li class="inline-flex items-center">
                    <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
                      <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                      Home
                    </router-link>
                  </li>
                  <li aria-current="page">
                    <div class="flex items-center">
                      <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                      </svg>
                      <router-link to="/domain" class="ml-1 text-sm font-medium md:ml-2 text-gray-400 hover:text-white">Domains</router-link>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <div class="flex justify-between items-center mb-8">
              <div class="text-left">
                <h1 class="h2">{{ domain.domain }}</h1>
                <p class="text-base text-gray-400 pl-1">Provider: {{ domain.asn }}</p>
              </div>
              <div class="text-center">
                <div class="inline-flex text-center font-mono py-1 px-3 rounded-sm bg-fuchsia-900 hover:bg-fuchsia-900 transition duration-150 ease-in-out">Rank: {{ domain.rank }}</div>
              </div>
            </div>

            <!-- Twitter Button -->
            <div class="flex justify-end">
              <button type="button" @click="tweetShame(numberOfStars)" class="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-gray-800/30 mr-2 mb-2">
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17" style="color: #1da1f2">
                  <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd" />
                </svg>
                Tweet
              </button>
            </div>

            <!-- Domain Status Card -->
            <div class="flex justify-between items-center">
              <div class="text-center md:text-left">
                <div class="font-bold text-xl text-pink-600">Domain Status</div>
              </div>
              <!-- Rating Stars -->
              <div class="text-center">
                <div class="flex items-center space-x-1">
                  <template v-for="n in 4" :key="n">
                    <svg :class="n <= numberOfStars ? 'w-4 h-4 text-emerald-600' : 'w-4 h-4 text-gray-600'" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </template>
                </div>
              </div>
            </div>


            <!-- Domain Status -->
            <ul class="my-4 space-y-3">
              <li>
                <div class="flex justify-between items-center p-3 text-base rounded group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.base_domain == 'supported' ? 'border-emerald-600' : domain.base_domain == 'unsupported' ? 'border-pink-600' : 'border-amber-500'">
                  <span class="flex-1 ml-3 whitespace-nowrap font-mono text-sm">{{ domain.domain }}</span>
             <!-- <span class="">
              <Tracker
                 :data="blocks"
                 defaultBackgroundColor="bg-gray-300"
                 :hoverEffect="true"
                />
             </span> -->

                  <span :class="domain.base_domain == 'supported' ? 'text-emerald-600' : domain.base_domain == 'unsupported' ? 'text-pink-600' : 'text-amber-500'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.base_domain == "supported" ? "Success" : domain.base_domain == "unsupported" ? "Missing" : "No Record" }}
                  </span>
                </div>
              </li>
              <li>
                <div class="flex justify-between items-center p-3 text-base rounded group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.www_domain == 'supported' ? 'border-emerald-600' : domain.www_domain == 'unsupported' ? 'border-pink-600' : 'border-amber-500'">
                  <span class="flex-1 ml-3 whitespace-nowrap font-mono text-sm">www.{{ domain.domain }}</span>
                  <span :class="domain.www_domain == 'supported' ? 'text-emerald-600' : domain.www_domain == 'unsupported' ? 'text-pink-600' : 'text-amber-500'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.www_domain == "supported" ? "Success" : domain.www_domain == "unsupported" ? "Missing" : "No Record" }}
                  </span>
                </div>
              </li>
              <li>
                <div class="flex justify-between items-center p-3 text-base rounded group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.nameserver == 'supported' ? 'border-emerald-600' : domain.nameserver == 'unsupported' ? 'border-pink-600' : 'border-amber-500'">
                  <span class="flex-1 ml-3 whitespace-nowrap">Nameserver</span>
                  <span :class="domain.nameserver == 'supported' ? 'text-emerald-600' : domain.nameserver == 'unsupported' ? 'text-pink-600' : 'text-amber-500'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.nameserver == "supported" ? "Success" : domain.nameserver == "unsupported" ? "Missing" : "No Record" }}
                  </span>
                </div>
              </li>
              <li>
                <div class="flex justify-between items-center p-3 text-base rounded group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.mx_record == 'supported' ? 'border-emerald-600' : domain.mx_record == 'unsupported' ? 'border-pink-600' : 'border-amber-500'">
                  <span class="flex-1 ml-3 whitespace-nowrap">E-Mail</span>
                  <span :class="domain.mx_record == 'supported' ? 'text-emerald-600' : domain.mx_record == 'unsupported' ? 'text-pink-600' : 'text-amber-500'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.mx_record == "supported" ? "Success" : domain.mx_record == "unsupported" ? "Missing" : "No Record" }}
                  </span>
                </div>
              </li>
              <!-- Implement v6 Only checker -->
              <!-- <li>
                <div class="flex justify-between items-center p-3 text-base rounded group hover:shadow bg-gray-800 hover:bg-gray-800/30 text-white border-l-4" :class="domain.v6_only == 'supported' ? 'border-emerald-600' : domain.v6_only == 'unsupported' ? 'border-pink-600' : 'border-amber-500'">
                  <span class="flex-1 ml-3 whitespace-nowrap">v6 Only</span>
                  <span :class="domain.v6_only == 'supported' ? 'text-emerald-600' : domain.v6_only == 'unsupported' ? 'text-pink-600' : 'text-amber-500'" class="inline-flex items-center justify-center px-2 py-0.5 ml-3">
                    {{ domain.v6_only == "supported" ? "Success" : domain.v6_only == "unsupported" ? "Missing" : "No Record" }}
                  </span>
                </div>
              </li> -->
            </ul>

            <div class="inline-flex items-center text-xs font-normal text-gray-400">Last checked: {{ formattedTsCheck }}</div>
            <!-- End Domain Status Card -->
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

<script lang="ts" setup>
import { onMounted, reactive, toRefs, computed, onUnmounted, toRef } from "vue";
import { useRouter, useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

// Partials
import ChangelogTable from "@/components/ChangelogTable.vue";
import { formatDateTime } from "@/utils/Date";
// import Tracker from "@/partials/Tracker.vue";

// Services
import DomainService from "@/services/DomainService";
import ChangelogService from "@/services/ChangelogService";
import { Changelog } from "@/types/Changelog";
import { Domain } from "@/types/Domain";

const router = useRouter();
const route = useRoute();
const state = reactive({
  domain: {} as Domain.Domain,
  changelogs: [] as Changelog.Log[],
});

const { domain, changelogs } = toRefs(state);

async function getDomainDetails(domain: string) {
  const response = await DomainService.getDomainDetails(domain);
  state.domain = response.data;
}

async function getDomainChangelog(domain: string) {
  const response = await ChangelogService.getChangelogByDomain(domain);
  state.changelogs = response.data;
}

const formattedTsCheck = computed(() => {
  if (state.domain.ts_check) {
    return formatDateTime(state.domain.ts_check);
  }
  return "Not Checked Yet";
});

const numberOfStars = computed(() => {
  let count = 0;
  if (state.domain.base_domain == "supported") count++;
  if (state.domain.www_domain == "supported") count++;
  if (state.domain.nameserver == "supported") count++;
  if (state.domain.mx_record == "supported") count++;
  return count;
});

const tweetShame = (numberOfStars: number) => {
  // Define common variables
  let tweetText: string;
  // const currentURL = "https://ipv6.fail/domain/google.com/"; // For development
  const currentURL = window.location.href;

  // If numberOfStars is 3 or more, generate a positive tweet
  if (numberOfStars >= 3) {
    tweetText = `Hey ${state.domain.domain}, thanks for supporting IPv6! #IPv6`;
  } else {
    // Generate a negative tweet
    tweetText = `Hey ${state.domain.domain}, it's time to support IPv6! #WhyNoIPv6`;
  }
  // Create Twitter URL
  const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(currentURL)}`;

  // Open Twitter in a new tab
  window.open(twitterURL, "_blank");
};

// Fetch the campaign on component mount
onMounted(() => {
  window.scrollTo(0, 0);
  document.title = `${route.params.domain} - Why No IPv6?`;
  getDomainDetails(route.params.domain as string);
  getDomainChangelog(route.params.domain as string);
});

onUnmounted(() => {
  document.title = "Why No IPv6?";
});

// const blocks = [
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 2,
//     color: "bg-red-500",
//     tooltip: "Block 2: Moderate Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 2,
//     color: "bg-red-500",
//     tooltip: "Block 2: Moderate Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 2,
//     color: "bg-red-500",
//     tooltip: "Block 2: Moderate Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 2,
//     color: "bg-red-500",
//     tooltip: "Block 2: Moderate Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
//   {
//     key: 1,
//     color: "bg-red-500",
//     tooltip: "Block 1: High Risk",
//   },
//   {
//     key: 3,
//     color: "bg-green-500",
//     tooltip: "Block 3: Low Risk",
//   },
// ];
</script>
