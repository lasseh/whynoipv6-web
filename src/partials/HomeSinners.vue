<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="py-4 md:py-4">
        <!-- Items -->
        <div class="grid gap-20" data-aos-id-features-home>
          <!-- Item -->
          <div class="md:grid md:grid-cols-12 md:gap-6 items-center">
            <!-- Image -->
            <div class="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up" data-aos-anchor="[data-aos-id-features-home]">
              <div class="relative">
                <img class="hidden md:block md:max-w-none" src="/images/WhyNoLogo.png" width="540" height="520" alt="Shame" />
              </div>
            </div>
            <!-- Content -->
            <div class="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right" data-aos-anchor="[data-aos-id-features-home]">
              <div class="md:pr-4 lg:pr-12 xl:pr-16">
                <h3 class="h3 mb-3">Top IPv6 Sinners</h3>
                <p class="text-l text-gray-400 mb-0">The following domains are the top offenders of the IPv6 protocol. These domains are the most visited websites in the world, yet they have not embraced the future, IPv6.</p>
                <p class="text-l text-gray-400 mb-4">Shame on them!</p>

                <div class="grid grid-cols-2 gap-4">
                  <ul v-for="list in splitDomainShamers" class="max-w-md space-y-1 list-inside text-gray-400">
                    <li v-for="domain in list" class="flex items-center" :key="domain.rank">
                      <CrossIcon class="text-pink-600 mr-2" />
                      <RouterLink :to="`/domain/${domain.domain}`">{{ domain.domain }}</RouterLink>
                    </li>
                  </ul>
                </div>

                <!-- Testimonial -->
                <div class="flex items-start mt-8">
                  <img :src="randomTestimonial.imageUrl" alt="Testimonial Image" class="rounded-full shrink-0 mr-4" width="40" height="40" />
                  <div>
                    <blockquote class="text-gray-400 italic m-0 mb-3">"{{ randomTestimonial.statement }}"</blockquote>
                    <div class="text-gray-700 font-medium">
                      <cite class="text-gray-200 not-italic">{{ randomTestimonial.name }}</cite>
                      -
                      <a :href="randomTestimonial.url" target="_blank" class="text-fuchsia-600 hover:text-fuchsia-800 transition duration-150 ease-in-out">{{ randomTestimonial.urlTitle }}</a>
                    </div>
                  </div>
                </div>
                <!-- End Testimonial -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs } from "vue";

// Page Layout
import { CrossIcon } from "@/partials";

// Services
import DomainService from "@/services/DomainService";
import { Domain } from "@/types/Domain";

// Images

const state = reactive({
  domainSinners: [] as Domain.Domain[],
  splitDomainShamers: [] as Domain.Domain[][], // Split domains
  randomTestimonial: {} as { statement: string; name: string; url: string; urlTitle: string; imageUrl: string },
});

const { domainSinners, splitDomainShamers, randomTestimonial } = toRefs(state);

const testimonials = [
  {
    statement: "IPv6 is no longer an option, it's mandatory",
    name: "Scott Hogg",
    url: "https://packetpushers.net/series/ipv6-buzz/",
    urlTitle: "IPv6 Buzz",
    imageUrl: "/images/scott.jpg",
  },
  {
    statement: "IPv4 is the dial-up of our era. Embrace IPv6 or stay stuck in the slow lane.",
    name: "Ivan Pepelnjak",
    url: "https://www.ipspace.net/",
    urlTitle: "ipspace.net",
    imageUrl: "/images/ivan.jpeg",
  },
  // Add more testimonials here
];

function getRandomTestimonial() {
  const randomIndex = Math.floor(Math.random() * testimonials.length);
  state.randomTestimonial = testimonials[randomIndex];
}

async function getDomainShamers() {
  const response = await DomainService.getTopShame();
  state.domainSinners = response.data;
  const midpoint = Math.ceil(state.domainSinners.length / 2);
  state.splitDomainShamers = [state.domainSinners.slice(0, midpoint), state.domainSinners.slice(midpoint)];
}
onMounted(() => {
  getDomainShamers();
  getRandomTestimonial();
});
</script>
