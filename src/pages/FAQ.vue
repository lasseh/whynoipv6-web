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

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div class="pt-32 pb-12 md:pt-40 md:pb-20">
          <div x-data="{ page: '1' }" class="flex flex-col md:flex-row">
            <!-- Main content -->
            <main class="md:flex-auto md:pl-10 order-1" data-aos="fade-up">
              <!-- FAQ’s – Frequently Asked Questions -->
              <div v-show="page === '1'">
                <div class="mb-8">
                  <h2 class="h2 mb-4">FAQ’s – Frequently Asked Questions</h2>
                </div>
                <ul class="-my-4">
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">What is WhyNoIPv6.com?</h4>
                    <p class="text-md text-gray-400">WhyNoIPv6.com is a specialized platform committed to monitoring and promoting the adoption of IPv6 among domains featured in Alexa's top-ranked websites and user-submitted campaigns. We offer insightful metrics to help you assess the current landscape of IPv6 implementation.</p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Why is IPv6 Important?</h4>
                    <p class="text-md text-gray-400 mb-2">IPv6 is not merely an upgrade; it's a fundamental pillar for the Internet's sustainable future. As we edge closer to exhausting the IPv4 address space, the immense address capacity of IPv6 becomes indispensable. Beyond the scalability, IPv6 brings along robust security protocols and superior performance, making it the linchpin for modern, efficient, and secure internet communications.</p>
                    <p class="text-md text-gray-400">Failing to adopt IPv6 is tantamount to inhibiting the Internet's evolution. For top websites, this isn't just negligence—it's an abdication of their role as industry leaders. That's why our mission at WhyNoIPv6.com is not just to monitor, but to actively push for the closing of these alarming gaps in IPv6 adoption.</p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">How does WhyNoIPv6.com work?</h4>
                    <p class="text-md text-gray-400">At WhyNoIPv6.com, we meticulously scan each domain from Alexa's top-ranked list every 3 days to evaluate critical IPv6 adoption metrics. Specifically, we check for the existence of IPv6 DNS records and MX records. The data gleaned from these scans is then aggregated, analyzed, and made publicly available, providing a comprehensive and up-to-date snapshot of IPv6 implementation across influential websites.</p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Alexa?</h4>
                    <p class="text-md text-gray-400 mb-2">Alexa rankings are a measure of a website's popularity compared to all other sites on the internet, with the ranking calculated using a combination of average daily visitors and pageviews over a 3-month period.</p>
                    <p class="text-md text-gray-400">While Alexa's data may not be 100% accurate, it is widely used as a relative measure of a website's popularity and as an estimate of website traffic.</p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">How accurate is our data?</h4>
                    <p class="text-md text-gray-400">While we make every effort to ensure the precision of our metrics, it's important to interpret them as indicative rather than absolute. Several variables can introduce fluctuations in real-time accuracy. For instance, DNS propagation delays and the dynamic nature of Content Delivery Networks (CDNs) can alter the data based on the anycast DNS location. Therefore, our metrics offer a valuable yet approximate view of the current state of IPv6 adoption.</p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Why does a domain show as not supporting IPv6 when it does?</h4>
                    <p class="text-md text-gray-400 mb-2">This could be due to various reasons like DNS propagation delays or temporary server issues. If you notice inconsistencies, please contact us.</p>
                    <p class="text-md text-gray-400">For instance, DNS propagation delays and the dynamic nature of Content Delivery Networks (CDNs) can alter the data based on the anycast DNS location</p>
                  </li>
                </ul>
              </div>

              <!-- What is Open PRO -->
              <div v-show="page === '2'">
                <div class="mb-8">
                  <h2 class="h2 mb-4">Domain Crawler</h2>
                </div>
                <ul class="-my-4">
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Crawler Rules</h4>
                    <p class="text-lg text-gray-400">The crawler uses 1.1.1.1 as nameserver and will check for ipv6 records on domain.com, wwww.domain.com, ns and mx records.</p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Crawler Frequency</h4>
                    <p class="text-lg text-gray-400">The crawler will check the domain every 3 days.</p>
                  </li>
                </ul>
              </div>

              <!-- Open PRO plan’s features -->
              <div v-show="page === '3'">
                <div class="mb-8">
                  <h2 class="h2 mb-4">Campaigns</h2>
                </div>
                <ul class="-my-4">
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">How do i create my own campaign?</h4>
                    <p class="text-lg text-gray-400">Create a new issue on the github repo</p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">How can i get my domain removed from the list?</h4>
                    <p class="text-lg text-gray-400">Yes, you can start using IPv6!</p>
                  </li>
                </ul>
              </div>

              <!-- Resources -->
              <div v-show="page === '4'">
                <div class="mb-8">
                  <h2 class="h2 mb-4">Resources</h2>
                </div>
                <ul class="-my-4">
                  <!-- <li class="py-4">
                    <h4 class="text-xl font-medium mb-2 a-gradient"><a href="#">test-ipv6.com</a></h4>
                    <p class="text-lg text-gray-400">Test-IPv6.com is a platform that allows users to check their internet connection's readiness for IPv6. By visiting the site, users can swiftly determine if their connection is IPv6-capable, understand potential issues, and receive guidance on how to resolve them.</p>
                  </li> -->
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Understanding IPv6</h4>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient" target="_blank">Introduction to IPv6</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">Why IPv6?</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">IPv6 Basics: Quick Guide</a></p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">How to Implement IPv6 on Your Servers</h4>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">IPv6 Deployment Guide</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">Linux IPv6 HOWTO</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">Enabling IPv6 in Apache, Nginx, and Let’s Encrypt</a></p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">DNS Configuration</h4>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">IPv6 DNS Configuration Guide</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">Setting up DNS64</a></p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">IPv6 Networking Best Practices</h4>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">IPv6 Subnetting - Best Practices</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">IPv6 Security Considerations</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">IPv6 Checklist for IT Pros</a></p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Community and Forums</h4>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">Reddit's r/ipv6</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">Stack Overflow IPv6 Questions</a></p>
                  </li>
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Online Courses and Webinars</h4>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">IPv6 Fundamentals: A Straightforward Approach to Understanding IPv6 (Coursera)</a></p>
                    <p class="text-lg text-gray-400"><a href="#" class="a-gradient">IPv6 Certification Program</a></p>
                  </li>
                </ul>
              </div>

              <!-- API -->
              <div v-show="page === '5'">
                <div class="mb-8">
                  <h2 class="h2 mb-4">API</h2>
                </div>
                <ul class="-my-4">
                  <li class="py-4">
                    <h4 class="text-xl font-medium mb-2">Is the API open?</h4>
                    <p class="text-lg text-gray-400">Yes</p>
                  </li>
                </ul>
              </div>
            </main>

            <!-- Nav sidebar -->
            <aside class="md:w-64 mb-16 md:mb-0 md:mr-10 md:shrink-0" data-aos="fade-up" data-aos-delay="200">
              <!-- <h4 class="text-lg font-medium px-3 pb-3 border-b border-gray-800">Choose a category</h4> -->
              <nav>
                <ul>
                  <li class="py-2 border-b border-gray-800">
                    <a :class="{ 'text-pink-600': page === '1' }" class="flex items-center px-3 group text-gray-400 hover:text-fuchsia-600 transition duration-150 ease-in-out" href="#0" @click.prevent="page = '1'">
                      <span>Frequently Asked Questions</span>
                      <svg class="w-3 h-3 fill-current shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-fuchsia-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                      </svg>
                    </a>
                  </li>
                  <li class="py-2 border-b border-gray-800">
                    <a :class="{ 'text-fuchsia-600': page === '2' }" class="flex items-center px-3 group text-gray-400 hover:text-fuchsia-600 transition duration-150 ease-in-out" href="#0" @click.prevent="page = '2'">
                      <span>Domain Crawler</span>
                      <svg class="w-3 h-3 fill-current shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-fuchsia-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                      </svg>
                    </a>
                  </li>
                  <li class="py-2 border-b border-gray-800">
                    <a :class="{ 'text-fuchsia-600': page === '3' }" class="flex items-center px-3 group text-gray-400 hover:text-fuchsia-600 transition duration-150 ease-in-out" href="#0" @click.prevent="page = '3'">
                      <span>Campaigns</span>
                      <svg class="w-3 h-3 fill-current shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-fuchsia-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                      </svg>
                    </a>
                  </li>
                  <li class="py-2 border-b border-gray-800">
                    <a :class="{ 'text-fuchsia-600': page === '4' }" class="flex items-center px-3 group text-gray-400 hover:text-fuchsia-600 transition duration-150 ease-in-out" href="#0" @click.prevent="page = '4'">
                      <span>Resources</span>
                      <svg class="w-3 h-3 fill-current shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-fuchsia-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                      </svg>
                    </a>
                  </li>
                  <li class="py-2 border-b border-gray-800">
                    <a :class="{ 'text-fuchsia-600': page === '5' }" class="flex items-center px-3 group text-gray-400 hover:text-fuchsia-600 transition duration-150 ease-in-out" href="#0" @click.prevent="page = '5'">
                      <span>API</span>
                      <svg class="w-3 h-3 fill-current shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-fuchsia-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// Page Layout
import { Header, PageIllustration, Footer } from "@/partials";

export default defineComponent({
  name: "FAQ",
  components: {
    Header,
    PageIllustration,
    Footer,
  },
  setup() {
    const route = useRoute();
    const page = ref("1"); // Initialize to '1'

    const validPages = ["1", "2", "3", "4", "5"];

    // Set initial value from the query parameter if it's valid
    onMounted(() => {
      const pageFromQuery = route.query.page;
      if (pageFromQuery && validPages.includes(String(pageFromQuery))) {
        page.value = String(pageFromQuery);
      }
    });

    // Watch for changes to $route object
    watch(
      () => route.query.page,
      newPage => {
        if (newPage && validPages.includes(String(newPage))) {
          page.value = String(newPage);
        } else {
          page.value = "1";
        }
      }
    );

    return {
      page,
    };
  },
});
</script>
